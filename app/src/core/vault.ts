// Protects backup files. The database key itself is looked after silently by Windows, in the main process.
import { createCipheriv, createDecipheriv, randomBytes, scryptSync } from 'node:crypto';

const SCRYPT = { N: 2 ** 17, r: 8, p: 1, maxmem: 512 * 1024 * 1024 };
export type Wrapped = { salt: string; iv: string; tag: string; data: string };
/** The shape of a backup from before the login was removed. Still readable, with its old passphrase. */
export type VaultFile = { version: 1; pass: Wrapped; recovery: Wrapped };

const kdf = (secret: string, salt: Buffer) => scryptSync(secret.normalize('NFKC'), salt, 32, SCRYPT);
const normalizeCode = (code: string) => code.toUpperCase().replace(/[^A-Z0-9]/g, '').replace(/(.{4})(?=.)/g, '$1-');

export function wrap(key: Buffer, secret: string): Wrapped {
  const salt = randomBytes(16), iv = randomBytes(12);
  const cipher = createCipheriv('aes-256-gcm', kdf(secret, salt), iv);
  const data = Buffer.concat([cipher.update(key), cipher.final()]);
  return { salt: salt.toString('hex'), iv: iv.toString('hex'), tag: cipher.getAuthTag().toString('hex'), data: data.toString('hex') };
}
export function unwrap(wrapped: Wrapped, secret: string): Buffer | null {
  try {
    const decipher = createDecipheriv('aes-256-gcm', kdf(secret, Buffer.from(wrapped.salt, 'hex')), Buffer.from(wrapped.iv, 'hex'));
    decipher.setAuthTag(Buffer.from(wrapped.tag, 'hex'));
    return Buffer.concat([decipher.update(Buffer.from(wrapped.data, 'hex')), decipher.final()]);
  } catch { return null; }
}
export function olderBackupKey(vault: VaultFile, secret: string) {
  if (vault.version !== 1) return null;
  return unwrap(vault.pass, secret) ?? unwrap(vault.recovery, normalizeCode(secret));
}
