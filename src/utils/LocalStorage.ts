import CryptoJS from "crypto-js";

abstract class LocalStorage {
  private secretKey = import.meta.env.VITE_SAVE_KEY;

  private encrypt(data: string): string {
    return CryptoJS.AES.encrypt(data, this.secretKey).toString();
  }

  private decrypt(data: string): string {
    const bytes = CryptoJS.AES.decrypt(data, this.secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  protected setItem<T>(key: string, value: T) {
    try {
      const encryptedValue = this.encrypt(JSON.stringify(value));
      localStorage.setItem(key, encryptedValue);
    } catch {}
  }

  protected getItem(key: string) {
    try {
      const encryptedValue = localStorage.getItem(key);
      if (!encryptedValue) return null;
      const decryptedValue = this.decrypt(encryptedValue);
      return JSON.parse(decryptedValue);
    } catch {
      return null;
    }
  }
}

export default LocalStorage;
