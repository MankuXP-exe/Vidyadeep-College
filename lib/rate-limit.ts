type Entry = {
  count: number;
  expiresAt: number;
};

const store = new Map<string, Entry>();

export function rateLimit(key: string, limit = 8, windowMs = 60000) {
  const now = Date.now();
  const existing = store.get(key);

  if (!existing || existing.expiresAt <= now) {
    store.set(key, { count: 1, expiresAt: now + windowMs });
    return { success: true, remaining: limit - 1 };
  }

  if (existing.count >= limit) {
    return { success: false, remaining: 0 };
  }

  existing.count += 1;
  store.set(key, existing);
  return { success: true, remaining: limit - existing.count };
}
