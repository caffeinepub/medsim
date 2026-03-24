/**
 * secureStorage.ts
 * XOR + base64 obfuscation for sensitive localStorage fields.
 * Prevents casual inspection via DevTools / localStorage viewers.
 * Not cryptographically secure against determined attackers,
 * but eliminates plaintext exposure of Aadhaar / address data.
 */

const KEY = "MedSim_K9x#2025_Secure";

function xorEncode(str: string, key: string): string {
  return str
    .split("")
    .map((ch, i) =>
      String.fromCharCode(ch.charCodeAt(0) ^ key.charCodeAt(i % key.length)),
    )
    .join("");
}

export function secureSet(storageKey: string, value: string): void {
  try {
    const encoded = btoa(unescape(encodeURIComponent(xorEncode(value, KEY))));
    localStorage.setItem(storageKey, encoded);
  } catch (e) {
    console.warn("secureSet failed for", storageKey, e);
    // Do not store plaintext on failure
  }
}

export function secureGet(storageKey: string): string {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return "";
    try {
      return decodeURIComponent(escape(xorEncode(atob(raw), KEY)));
    } catch {
      // Legacy plaintext fallback for values stored before this fix
      return raw;
    }
  } catch {
    return "";
  }
}

export function secureRemove(storageKey: string): void {
  localStorage.removeItem(storageKey);
}
