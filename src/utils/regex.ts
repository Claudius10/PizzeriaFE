// a/A to z/Z whitespace allowed
export const esCharsRegex = /^[a-z\sÁÉÍÓÚáéíóúÑñ]+$/gmi;

// a/A to z/Z whitespace allowed ES
export const esCharsAndNumbersRegex = /^[a-z0-9\sÁÉÍÓÚáéíóúÑñ]+$/gmi;

// 1-9 no whitespaces
export const numbersRegex = /^[0-9]+$/gmi;
// a/A to z/Z + 0-9 + basic symbols + whitespace allowed
export const charsAndNumbersRegex = /^[a-z0-9.,:;\s]+$/gmi;
// title
export const esCharsAndNumbersAndBasicSymbolsRgx = /^[a-z0-9!¡¿?.,\sÁÉÍÓÚáéíóúÑñ]+$/gmi;
//  RFC2822 email regex
export const emailRgx = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gmi;

// Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;