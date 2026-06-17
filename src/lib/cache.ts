const store = new Map<string, unknown>();

export function getCached<T>(key: string): T | undefined {
  return store.get(key) as T | undefined;
}

export function setCache<T>(key: string, data: T): void {
  store.set(key, data);
}

export function invalidateCache(pattern?: string): void {
  if (!pattern) {
    store.clear();
    return;
  }
  for (const key of store.keys()) {
    if (key.startsWith(pattern)) {
      store.delete(key);
    }
  }
}
