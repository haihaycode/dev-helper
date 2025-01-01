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

  return result.split("").reverse().join("");
};

const iconEncrypt = (text: string, key: string): string => {
  const keyLength = key.length;
  return text
    .split("")
    .map((char, index) => {
      const charCode = char.charCodeAt(0);
      const keyCode = key.charCodeAt(index % keyLength);
      return String.fromCharCode(charCode + keyCode);
    })
    .join("");
};

const bcryptHash = (text: string, key: string): string => {
  const salt = key.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const hash = text.split("").reduce((acc, char) => {
    return (
      acc + ((char.charCodeAt(0) + salt) % 256).toString(16).padStart(2, "0")
    );
  }, "");
  return hash;
};
