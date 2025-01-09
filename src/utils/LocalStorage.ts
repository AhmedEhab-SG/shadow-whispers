abstract class LocalStorage {
  protected setItem<T>(key: string, value: T) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }

  protected getItem(key: string) {
    try {
      return JSON.parse(localStorage.getItem(key) ?? "");
    } catch {
      return null;
    }
  }
}

export default LocalStorage;
