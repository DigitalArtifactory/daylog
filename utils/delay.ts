// Helper to add random delay (between 300ms and 1200ms)
export async function randomDelay() {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  const ms = 300 + (array[0] % 900);
  return new Promise((resolve) => setTimeout(resolve, ms));
}
