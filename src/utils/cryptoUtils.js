import CryptoJS from "crypto-js";

// Kunci rahasia
const secretKey = "mySecretKey12345";

// Fungsi enkripsi
export const encryptId = (id) => {
  const encrypted = CryptoJS.AES.encrypt(id.toString(), secretKey).toString();
  return toBase64UrlSafe(encrypted);
};

// Fungsi dekripsi
export const decryptId = (encryptedId) => {
  const base64 = fromBase64UrlSafe(encryptedId);
  const bytes = CryptoJS.AES.decrypt(base64, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

// Fungsi helper untuk mengubah Base64 menjadi URL Safe
const toBase64UrlSafe = (str) => {
  return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

// Fungsi helper untuk mengubah dari URL Safe Base64 ke format standar
const fromBase64UrlSafe = (str) => {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  // Tambahkan padding '=' jika diperlukan
  while (str.length % 4) {
    str += '=';
  }
  return str;
};
