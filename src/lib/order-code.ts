function pad(n: number, len = 2): string {
  return n.toString().padStart(len, "0");
}

function randomChunk(len = 4): string {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < len; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

export function generateOrderCode(prefix: "PED" | "PAR" = "PED"): string {
  const now = new Date();
  const datePart = `${pad(now.getDate())}${pad(now.getMonth() + 1)}${pad(now.getFullYear() % 100)}`;
  return `${prefix}-${datePart}-${randomChunk(4)}`;
}
