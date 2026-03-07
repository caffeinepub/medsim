/**
 * Generates a stable, deterministic MED-YYYY-NNNNN student system ID
 * based on the principal string. Persists to localStorage for stability.
 */
export function generateSystemId(principal: string): string {
  const storageKey = `medsim_system_id_${principal}`;
  const existing = localStorage.getItem(storageKey);
  if (existing) return existing;

  // Derive a 5-digit number from the principal string via char code sum
  let sum = 0;
  for (let i = 0; i < principal.length; i++) {
    sum = (sum * 31 + principal.charCodeAt(i)) >>> 0; // keep 32-bit unsigned
  }
  const num = (sum % 99999) + 1; // 1..99999
  const paddedNum = String(num).padStart(5, "0");
  const year = new Date().getFullYear();
  const id = `MED-${year}-${paddedNum}`;

  localStorage.setItem(storageKey, id);
  return id;
}
