// StringUtils.ts
// StringUtils.ts

/**
 * Truncates a string to a specific length and appends '...' if it exceeds the limit.
 * @param str - The string to truncate
 * @param length - The maximum length of the string
 * @returns The truncated string with '...' if it exceeds the length
 */
export const truncateString = (str: string, length: number): string => {
  if (str.length > length) {
    return str.slice(0, length) + "...";
  }
  return str;
};

/**
 * Converts a string to title case (First letter of each word is capitalized).
 * @param str - The string to convert to title case
 * @returns The title-cased string
 */
export const toTitleCase = (str: string): string => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

/**
 * Converts a string to snake_case (all lowercase with underscores).
 * @param str - The string to convert to snake_case
 * @returns The snake_case string
 */
export const toSnakeCase = (str: string): string => {
  return str
    .replace(/\s+/g, "_") // Replace spaces with underscores
    .replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`) // Convert uppercase letters to lowercase with _
    .toLowerCase();
};

/**
 * Converts a string to kebab-case (lowercase with hyphens).
 * @param str - The string to convert to kebab-case
 * @returns The kebab-case string
 */
export const toKebabCase = (str: string): string => {
  return str
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`) // Convert uppercase letters to lowercase with -
    .toLowerCase();
};

/**
 * Capitalizes the first letter of the string.
 * @param str - The string to capitalize
 * @returns The string with the first letter capitalized
 */
export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Removes all spaces from the string.
 * @param str - The string to remove spaces from
 * @returns The string with no spaces
 */
export const removeSpaces = (str: string): string => {
  return str.replace(/\s+/g, "");
};

/**
 * Checks if the string contains only alphabets and spaces.
 * @param str - The string to check
 * @returns True if the string only contains alphabets and spaces, otherwise false
 */
export const isAlphabetical = (str: string): boolean => {
  return /^[A-Za-z\s]+$/.test(str);
};

/**
 * Replaces all occurrences of a substring with another substring.
 * @param str - The string to perform the replacement on
 * @param search - The substring to search for
 * @param replace - The substring to replace with
 * @returns The modified string
 */
export const replaceSubstring = (
  str: string,
  search: string,
  replace: string
): string => {
  return str.split(search).join(replace);
};

/**
 * Checks if a string starts with a specific substring.
 * @param str - The string to check
 * @param search - The substring to check for
 * @returns True if the string starts with the specified substring, otherwise false
 */
export const startsWithSubstring = (str: string, search: string): boolean => {
  return str.startsWith(search);
};

/**
 * Checks if a string ends with a specific substring.
 * @param str - The string to check
 * @param search - The substring to check for
 * @returns True if the string ends with the specified substring, otherwise false
 */
export const endsWithSubstring = (str: string, search: string): boolean => {
  return str.endsWith(search);
};

// const text = "this is a long string with spaces";

// // console.log(truncateString(text, 10)); // "this is a..."
// // console.log(toTitleCase(text)); // "This Is A Long String With Spaces"
// // console.log(toSnakeCase(text)); // "this_is_a_long_string_with_spaces"
// // console.log(capitalizeFirstLetter(text)); // "This is a long string with spaces"
// // console.log(removeSpaces(text));
