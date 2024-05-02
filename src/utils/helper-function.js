import validator from 'validator';

export function isStringNull(string) {
    if (string == null) {
      return true;
    }
  
    const trimText = string.trim();
    if (trimText && trimText != '' && trimText != 'null' && trimText != null) {
      return false;
    }
    return true;
  }


export const validateEmailString = email => {
  return validator.isEmail(email) == true ? true : false;
};