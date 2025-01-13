import CryptoJS from "crypto-js";

/**
 * Tạo một unique ID bằng cách sử dụng UUID v4
 * @returns {string} Unique ID
 */
export function generateUuidV4(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Tạo một unique ID bằng cách sử dụng `crypto.getRandomValues`
 * @returns {string} Unique ID
 */
export function generateCryptoId(): string {
  const array = new Uint32Array(4);
  window.crypto.getRandomValues(array);
  return array.join("-");
}

/**
 * Tạo một unique ID bằng cách sử dụng `Date.now` và `Math.random`
 * @returns {string} Unique ID
 */
export function generateTimestampId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Tạo một unique ID bằng cách sử dụng `performance.now`
 * @returns {string} Unique ID
 */
export function generatePerformanceId(): string {
  return `${performance.now().toString(36)}-${Math.random()
    .toString(36)
    .substr(2, 9)}`;
}

export function encryptWithSecretKey(data: string, secretKey: string): string {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
}
