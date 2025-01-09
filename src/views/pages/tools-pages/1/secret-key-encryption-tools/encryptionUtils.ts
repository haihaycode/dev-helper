export const encryptText = (
  type: string,
  text: string,
  key: string
): string => {
  switch (type) {
    case "reverse":
      return reverseText(text, key);
    case "icon":
      return iconEncrypt(text, key);
    case "bcrypt":
      return bcryptHash(text, key);
    default:
      return text;
  }
};

const iconMapping: Record<string, string> = {
  a: "✪",
  á: "✿",
  à: "✧",
  ả: "✱",
  ã: "✫",
  ạ: "✪",
  b: "✵",
  c: "✷",
  d: "✸",
  e: "✻",
  é: "✼",
  è: "✽",
  ẻ: "✿",
  ẽ: "✺",
  ẹ: "✿",
  f: "✽",
  g: "✿",
  h: "✱",
  i: "✴",
  í: "✶",
  ì: "✾",
  ỉ: "✸",
  ĩ: "✻",
  ị: "✧",
  j: "✷",
  k: "✧",
  l: "✺",
  m: "✸",
  n: "✱",
  o: "✵",
  ó: "✵",
  ò: "✶",
  ỏ: "✹",
  õ: "✷",
  ọ: "✳",
  p: "✳",
  q: "✴",
  r: "✷",
  s: "✵",
  t: "✾",
  u: "✿",
  ú: "✵",
  ù: "✳",
  ủ: "✶",
  ũ: "✽",
  ụ: "✷",
  v: "✾",
  w: "✷",
  x: "✾",
  y: "✳",
  ý: "✿",
  ỳ: "✽",
  ỷ: "✴",
  ỹ: "✸",
  ỵ: "✿",
  z: "✾",
  " ": "⧫",
};

const reverseText = (text: string, key: string): string => {
  const keyLength = key.length;
  const textLength = text.length;
  let result = "";
  for (let i = 0; i < textLength; i++) {
    const charCode = text.charCodeAt(i);
    const keyCode = key.charCodeAt(i % keyLength);
    const newCharCode = (charCode + keyCode) % 256;
    result += String.fromCharCode(newCharCode);
  }
  result = result
    .split("")
    .map((char) => {
      if (char.match(/[a-zA-Z]/)) {
        const isUpperCase = char === char.toUpperCase();
        const baseCharCode = isUpperCase ? 65 : 97; // 'A' or 'a'
        const newCharCode =
          baseCharCode + (25 - (char.charCodeAt(0) - baseCharCode));
        return String.fromCharCode(newCharCode);
      }
      return char;
    })
    .join("");

  return result.split("").reverse().join("");
};

const iconEncrypt = (text: string, key: string): string => {
  let encryptedText = "";
  let keyIndex = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text[i].toLowerCase();
    const icon = iconMapping[char] || char;
    const keyChar = key[keyIndex % key.length].toLowerCase();
    const encryptedChar = String.fromCharCode(
      icon.charCodeAt(0) ^ keyChar.charCodeAt(0)
    );
    encryptedText += encryptedChar;
    keyIndex++;
  }
  return encryptedText;
};

// bcryptHash
const generateSalt = (): string => {
  const saltLength = 16;
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let salt = "";
  for (let i = 0; i < saltLength; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    salt += chars[randomIndex];
  }
  return salt;
};

const simpleHash = (input: string): string => {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return hash.toString(16);
};
const bcryptHash = (text: string, key: string): string => {
  const salt = generateSalt();
  const saltedText = text + salt + key;
  let hash = simpleHash(saltedText);
  for (let i = 0; i < 1000; i++) {
    hash = simpleHash(hash);
  }
  return hash;
};
