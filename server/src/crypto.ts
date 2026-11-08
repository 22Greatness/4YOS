// Ed25519 cryptographic tokens and signature routines for 4YOS server.
// Runs seamlessly on Cloudflare Workers and Node.js using Web Crypto API.

export interface EntitlementPayload {
  accountId: string;
  deviceId: string;
  courses: string[];
  issuedAt: number;      // Epoch seconds
  expiresAt: number;     // Epoch seconds (60 days out)
  serverTime: number;    // Epoch seconds
}

export interface SignedToken {
  payload: EntitlementPayload;
  signature: string; // Base64url
}

export async function generateEd25519KeyPair(): Promise<CryptoKeyPair> {
  return (crypto.subtle as any).generateKey('Ed25519', true, ['sign', 'verify']);
}

export async function exportPublicKeyRaw(key: CryptoKey): Promise<string> {
  const exported = await crypto.subtle.exportKey('raw', key);
  return Buffer.from(exported).toString('base64url');
}

export async function exportPrivateKeyPkcs8(key: CryptoKey): Promise<string> {
  const exported = await crypto.subtle.exportKey('pkcs8', key);
  return Buffer.from(exported).toString('base64url');
}

export async function importPublicKeyRaw(rawBase64Url: string): Promise<CryptoKey> {
  const buf = Buffer.from(rawBase64Url, 'base64url');
  return (crypto.subtle as any).importKey('raw', buf, 'Ed25519', true, ['verify']);
}

export async function importPrivateKeyPkcs8(pkcs8Base64Url: string): Promise<CryptoKey> {
  const buf = Buffer.from(pkcs8Base64Url, 'base64url');
  return (crypto.subtle as any).importKey('pkcs8', buf, 'Ed25519', true, ['sign']);
}

export async function signEntitlement(payload: EntitlementPayload, privateKey: CryptoKey): Promise<string> {
  const json = JSON.stringify(payload);
  const data = new TextEncoder().encode(json);
  const sigBuf = await crypto.subtle.sign('Ed25519', privateKey, data);
  const sigBase64 = Buffer.from(sigBuf).toString('base64url');
  const payloadBase64 = Buffer.from(json).toString('base64url');
  return `${payloadBase64}.${sigBase64}`;
}

export async function verifyEntitlement(tokenString: string, publicKey: CryptoKey, currentEpochSec: number = Math.floor(Date.now() / 1000)): Promise<{ valid: boolean; payload?: EntitlementPayload; reason?: string }> {
  const parts = tokenString.split('.');
  if (parts.length !== 2) {
    return { valid: false, reason: 'INVALID_TOKEN_FORMAT' };
  }

  const [payloadBase64, sigBase64] = parts;
  let payload: EntitlementPayload;
  try {
    const json = Buffer.from(payloadBase64, 'base64url').toString('utf8');
    payload = JSON.parse(json);
  } catch {
    return { valid: false, reason: 'INVALID_PAYLOAD_JSON' };
  }

  const data = new TextEncoder().encode(Buffer.from(payloadBase64, 'base64url').toString('utf8'));
  const sig = Buffer.from(sigBase64, 'base64url');

  const ok = await crypto.subtle.verify('Ed25519', publicKey, sig, data);
  if (!ok) {
    return { valid: false, reason: 'INVALID_SIGNATURE' };
  }

  // Check 60-day expiry
  if (currentEpochSec > payload.expiresAt) {
    return { valid: false, payload, reason: 'TOKEN_EXPIRED' };
  }

  // Detect clock rollback: serverTime should not be greater than device's future unless tolerance
  return { valid: true, payload };
}

export async function hashCode(phone: string, code: string): Promise<string> {
  const data = new TextEncoder().encode(`${phone}:${code}`);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Buffer.from(hash).toString('hex');
}
