import { sha256 } from '@oslojs/crypto/sha2';
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from '@oslojs/encoding';
import { createHash } from 'crypto';

export function encodeBase32(bytes: Uint8Array) {
  return encodeBase32LowerCaseNoPadding(bytes);
}

export function encodeHex(token: string): string {
  return encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
}

export function hashPassword(password: string): string {
  const hashedPassword = createHash('sha256')
    .update(password, 'utf8')
    .digest('hex');
  return hashedPassword;
}
