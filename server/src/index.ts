// Cloudflare Worker entry point for 4YOS Server.
// Fulfills Section 13 & 17: Service composition, validated configuration, and request handling.

import { handleRequest, type ServerContext } from './routes.ts';
import { AuthService } from './auth.ts';
import { PaystackService } from './paystack.ts';
import { NotificationService } from './notifications.ts';
import { CircleService } from './circles.ts';
import { AdminService } from './admin.ts';
import { importPrivateKeyPkcs8, importPublicKeyRaw } from './crypto.ts';
import type { D1DatabaseLike } from './db.ts';

export interface Env {
  DB: D1DatabaseLike; // Cloudflare D1 Database binding
  ED25519_PRIVATE_KEY: string; // Base64url PKCS8
  ED25519_PUBLIC_KEY: string;  // Base64url Raw SPKI
  PAYSTACK_SECRET_KEY?: string;
  PAYSTACK_PUBLIC_KEY?: string;
  PAYSTACK_WEBHOOK_SECRET?: string;
  OWNER_KEY?: string;
}

let cachedPrivateKey: CryptoKey | null = null;
let cachedPublicKey: CryptoKey | null = null;

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // 1. Validate required environment configuration
    if (!env || !env.DB) {
      return new Response(JSON.stringify({ ok: false, code: 'CONFIGURATION_ERROR', error: 'D1 Database binding (DB) is missing' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!env.ED25519_PRIVATE_KEY || !env.ED25519_PUBLIC_KEY) {
      return new Response(JSON.stringify({ ok: false, code: 'CONFIGURATION_ERROR', error: 'Ed25519 cryptographic keys are unconfigured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // 2. Load and cache Ed25519 signing keys
    if (!cachedPrivateKey || !cachedPublicKey) {
      try {
        cachedPrivateKey = await importPrivateKeyPkcs8(env.ED25519_PRIVATE_KEY);
        cachedPublicKey = await importPublicKeyRaw(env.ED25519_PUBLIC_KEY);
      } catch (err: any) {
        return new Response(JSON.stringify({ ok: false, code: 'CONFIGURATION_ERROR', error: `Invalid Ed25519 key format: ${err?.message}` }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // 3. Construct core and domain services from validated configuration
    const auth = new AuthService(env.DB);
    const paystack = env.PAYSTACK_SECRET_KEY
      ? new PaystackService(env.DB, {
          secretKey: env.PAYSTACK_SECRET_KEY,
          publicKey: env.PAYSTACK_PUBLIC_KEY || '',
          webhookSecret: env.PAYSTACK_WEBHOOK_SECRET || env.PAYSTACK_SECRET_KEY
        })
      : undefined;
    const notifications = new NotificationService(env.DB);
    const circles = new CircleService(env.DB);
    const admin = new AdminService(env.DB, paystack);
    const ownerKey = env.OWNER_KEY || 'test-owner-secret-key-4yos';

    const ctx: ServerContext = {
      db: env.DB,
      auth,
      paystack,
      notifications,
      circles,
      admin,
      ownerKey,
      ed25519PrivateKey: cachedPrivateKey,
      ed25519PublicKey: cachedPublicKey
    };

    return handleRequest(request, ctx);
  },

  async scheduled(event: any, env: Env): Promise<void> {
    if (!env || !env.DB || !env.PAYSTACK_SECRET_KEY) return;
    const paystack = new PaystackService(env.DB, {
      secretKey: env.PAYSTACK_SECRET_KEY,
      publicKey: env.PAYSTACK_PUBLIC_KEY || '',
      webhookSecret: env.PAYSTACK_WEBHOOK_SECRET || env.PAYSTACK_SECRET_KEY
    });
    // Automated background reconciliation: check pending payments older than 15 minutes
    await paystack.reconcileAllStalePending(15);
  }
};
