import validator from 'validator';

// options is an optional object that can be supplied with the following
// key(s): ignore which can either be a String or RegExp of characters to be ignored
// e.g. " " will ignore spaces.
// Docs: https://github.com/validatorjs/validator.js

export const validateEmailString = email => {
  return validator.isEmail(email) == true ? true : false;
};

export const validateAlphanumericString = v => {
  return validator.isAlphanumeric(v, undefined, {ignore: ' '}) == true
    ? true
    : false;
};

export const validateAlphaString = v => {
  return validator.isAlpha(v, undefined, {ignore: ' '}) == true ? true : false;
};

export const validateNumericString = v => {
  return validator.isNumeric(v) == true ? true : false;
};

export const validatePassword = Value => {
  const getPassword = Value || 'Abc@12345';
  const re =
    /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,20}$/;
  return re.test(getPassword);
};
export const validate_GST = Value => {
  const re = /^\d{9}[A-Za-z]{2}\d{4}$/;

  return re.test(Value);
};

export const VALIDATE_FILTER_TYPE = {
  ONLY_ALPHABETICAL: 'ONLY_ALPHABETICAL',
  ALLOW_ONLY_ALPHABETICAL_AND_SPACE_VALUES:
    'ALLOW_ONLY_ALPHABETICAL_AND_SPACE_VALUES',
  ALLOW_ONLY_NUMERIC_VALUES: 'ALLOW_ONLY_NUMERIC_VALUES',
  ALLOW_ALPHANUMERIC_AND_SPACE_VALUES: 'ALLOW_ALPHANUMERIC_AND_SPACE_VALUES',
  ALLOW_ALPHANUMERIC_AND_SPACE_VALUES_WITH_MULTILINE:
    'ALLOW_ALPHANUMERIC_AND_SPACE_VALUES_WITH_MULTILINE',
  ALLOW_ONLY_ONE_DECIMAL: 'ALLOW_ONLY_ONE_DECIMAL',
  ALLOW_ONLY_NUMERIC: 'ALLOW_ONLY_NUMERIC',
  ALLOW_ONLY_TIME: 'ALLOW_ONLY_TIME',
};

export function textInputFilterFunction(filterType, value) {
  switch (filterType) {
    case VALIDATE_FILTER_TYPE.ONLY_ALPHABETICAL: {
      return value.replace(/[^a-z]/gi, '');
    }
    case VALIDATE_FILTER_TYPE.ALLOW_ONLY_ALPHABETICAL_AND_SPACE_VALUES: {
      return value.replace(/[^a-z ]/gi, '');
    }
    case VALIDATE_FILTER_TYPE.ALLOW_ONLY_NUMERIC_VALUES: {
      return value.replace(/[^0-9]/g, '');
    }
    case VALIDATE_FILTER_TYPE.ALLOW_ALPHANUMERIC_AND_SPACE_VALUES: {
      return value.replace(/[^a-z 0-9]/gi, '');
    }
    case VALIDATE_FILTER_TYPE.ALLOW_ALPHANUMERIC_AND_SPACE_VALUES_WITH_MULTILINE: {
      return value.replace(/[^a-z 0-9\n]/gi, '');
    }
    case VALIDATE_FILTER_TYPE.ALLOW_ONLY_ONE_DECIMAL: {
      const regex = /^\d+(\.\d{0,2})?$/;

      if (regex.test(value) || value === '') {
        return true;
      } else {
        return false;
      }
    }
    case VALIDATE_FILTER_TYPE.ALLOW_ONLY_TIME: {
      const regex = /^\d+(\:\d{0,2})?$/;

      if (regex.test(value) || value === '') {
        return true;
      } else {
        return false;
      }
    }
    case VALIDATE_FILTER_TYPE.ALLOW_ONLY_NUMERIC: {
      const regex = /^\d+$/;

      if (regex.test(value) || value === '') {
        return true;
      } else {
        return false;
      }
    }

    default: {
      return value;
    }
  }
}

export const VALIDATE_KEY = {
  firstName: 'keyFirstName',
  lastName: 'keyLastName',
  additionalCost: 'keyAdditionalCost',
};
