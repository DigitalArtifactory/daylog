import { createHash } from 'crypto';

const BASE32_ALPHABET = 'abcdefghijklmnopqrstuvwxyz234567';

export function encodeBase32LowerCaseNoPadding(input: Uint8Array): string {
  let bits = 0;
  let value = 0;
  let output = '';

  for (let i = 0; i < input.length; i++) {
    value = (value << 8) | input[i];
    bits += 8;

    while (bits >= 5) {
      output += BASE32_ALPHABET[(value >>> (bits - 5)) & 31];
      bits -= 5;
    }
  }

  if (bits > 0) {
    output += BASE32_ALPHABET[(value << (5 - bits)) & 31];
  }

  return output;
}

export function encodeHexLowerCase(input: Uint8Array): string {
  return Array.from(input)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

export function encodeSHA256(input: Uint8Array): Uint8Array {
  return new Uint8Array(createHash('sha256').update(input).digest());
}

export function hashPassword(password: string): string {
  const hashedPassword = createHash('sha256')
    .update(password, 'utf8')
    .digest('hex');
  return hashedPassword;
}
