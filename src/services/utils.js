import * as CryptoJS from "crypto-js";

export function encode(notes) {
  return CryptoJS.AES.encrypt(notes, "123456").toString();
}
export function decode(notes) {
  return CryptoJS.AES.decrypt(notes, "123456").toString(CryptoJS.enc.Utf8);
}
