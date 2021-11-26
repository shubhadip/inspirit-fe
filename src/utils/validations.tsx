/* eslint-disable comma-dangle */
import { isNullUndefined } from './common';
import { ValidationMessages } from './../shared/enums';
import { IValidation, IValidationRules, IValidationRule } from './../shared/interfaces';

declare let RegExp: {
  new (pattern: any, flags?: string): RegExp;
  (pattern: any, flags?: string): RegExp;
};

// rules
/**
 * Required validation
 * @param value
 */
const required = (value: any): boolean => {
  if (isNullUndefined(value)) {
    return false;
  }
  if (typeof value === 'object' && !Object.keys(value).length) {
    if (Object.prototype.toString.call(value) === '[object Date]' && value) {
      return true;
    }
    return false;
  }
  if (typeof value === 'string' && value.trim() === '') {
    return false;
  }
  if (value.constructor === Array && value.length <= 0) {
    return false;
  }
  return true;
};

/**
 * Email validation
 * @param email Email string
 */
const emailFn = (email: string): boolean => {
  if (typeof email === 'string' && email === '') {
    return true;
  }
  const emailRegex = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@([a-z\d]{1,}[,a-z+\d_-]*)(([.][a-z]{2,}){1,})$/i
  );
  return emailRegex.test(email);
};

/**
 * Mobile Number validation
 * @param mobile Mobile Number
 */
const mobileFn = (mobile: any): boolean => {
  if (typeof mobile === 'string' && mobile === '') {
    return true;
  }
  const mobileRegex = new RegExp(/^[6-9][\d]{9}$/);
  return mobileRegex.test(mobile);
};

/**
 * Numeric validation
 * @param integer
 */
const integerFn = (integer: any): boolean => {
  const IntegerRegex = new RegExp(/^\d+$/g);
  return IntegerRegex.test(integer);
};

/**
 *
 * @param regexString
 */
const stringToRegex = (regexString: string): RegExp => {
  // eslint-disable-next-line no-eval
  return /^\/.*\/[gimuy]*$/.test(regexString) ? eval(regexString) : new RegExp(regexString);
};

/**
 *
 * @param regexString
 * @param value
 */
const regexFn = (regexString: string, value: any): boolean => {
  return stringToRegex(regexString).test(value);
};

/**
 *
 * @param regexString
 * @param value
 */
const inverseRegex = (regexString: string, value: any): boolean => {
  return !stringToRegex(regexString).test(value);
};

/**
 * Max value validation
 * @param maxValue
 * @param value
 */
const maxValueFn = (maxValue: any, value: any): boolean => {
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(maxValue) || isNaN(value)) {
    return true;
  }
  if (parseFloat(value) > parseFloat(maxValue)) {
    return false;
  }
  return true;
};

/**
 * Min length validation
 * @param minLength
 * @param value
 */
const minLengthFn = (minLength: number, value: any): boolean => {
  if (value) {
    return value.toString().trim().length >= minLength;
  }
  return false;
};

/**
 * Max length validation
 * @param maxLength
 * @param value
 */
const maxLengthFn = (maxLength: number, value: any): boolean => {
  if (value) {
    return value.toString().length <= maxLength;
  }
  return true;
};

/**
 * Min value validation
 * @param minValue
 * @param value
 */
const minValueFn = (minValue: any, value: any): boolean => {
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(minValue) || isNaN(value)) {
    return true;
  }
  if (parseFloat(value) < parseFloat(minValue)) {
    return false;
  }
  return true;
};

/**
 * Range validation
 * @param range
 * @param value
 */
const rangeFn = (range: any, value: any): boolean => {
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(value) || range === undefined) {
    return true;
  }
  return maxValueFn(range.maximum, value) && minValueFn(range.minimum, value);
};

/**
 * Validates PAN Number
 * @param value
 */
const panNumber = (value: any): boolean => {
  const regex = /[A-Z]{5}[0-9]{4}[A-Z]{1}/i;
  return value === undefined || value === '' || regex.test(value);
};

/**
 *
 * @param value
 */
const aadharNumber = (value: any): boolean => {
  const regex = /^\d{12}$/;
  return value === undefined || value === '' || regex.test(value);
};

/**
 * GST validation
 * @param value
 */
const gstIN = (value: any): boolean => {
  const regex = /^[\d]{2}[A-Z]{5}[\d]{4}[A-Z]{1}[A-Z\d]{1}[Zz]{1}[A-Z\d]{1}$/i;
  return value === undefined || value === '' || regex.test(value);
};

/**
 *
 * @param value
 */
const alphaNumeric = (value: any): boolean => {
  if (!value) {
    return true;
  }
  const regex = /^[a-z0-9]+$/i;
  if (!regex.test(value)) {
    return false;
  }
  return true;
};

/**
 *
 * @param value
 */
const alphaNumericWithSpace = (value: any): boolean => {
  if (!value) {
    return true;
  }
  const regex = /^[a-z0-9\s]+$/i;
  if (!regex.test(value)) {
    return false;
  }
  return true;
};

/**
 *
 * @param multiple
 * @param value
 */
const multipleOf = (multiple: number, value: number): boolean => {
  return value % multiple === 0;
};

const validationRules: IValidationRules = {
  integer: integerFn,
  email: emailFn,
  mobile: mobileFn,
  required,
  regex: regexFn,
  inverseRegex,
  maxValue: maxValueFn,
  minValue: minValueFn,
  range: rangeFn,
  minLength: minLengthFn,
  maxLength: maxLengthFn,
  pan: panNumber,
  aadhar: aadharNumber,
  gstin: gstIN,
  alphaNumeric,
  alphaNumericWithSpace,
  multipleOf,
};

/**
 *
 * @param validationName
 * @param validationObj
 * @param value
 */
const callValidator = (validationName: string, validationObj: any, value: any): boolean => {
  let isValid = true;
  switch (validationName) {
    case 'regex':
      isValid = validationRules[validationName](validationObj.expression, value);
      break;
    case 'inverseRegex':
      isValid = validationRules[validationName](validationObj.expression, value);
      break;
    case 'maxValue':
      isValid = validationRules[validationName](validationObj.maxValue, value);
      break;
    case 'minValue':
      isValid = validationRules[validationName](validationObj.minValue, value);
      break;
    case 'range':
      isValid = validationRules[validationName](validationObj.range, value);
      break;
    case 'customHandler':
      isValid = validationObj.customHandler(value);
      break;
    case 'minLength':
      isValid = validationRules[validationName](validationObj.minLength, value);
      break;
    case 'maxLength':
      isValid = validationRules[validationName](validationObj.maxLength, value);
      break;
    case 'multipleOf':
      isValid = validationRules[validationName](validationObj.multiple, value);
      break;
    default:
      if ((validationRules as any)[validationName]) {
        isValid = (validationRules as any)[validationName](value);
      }
      break;
  }
  return isValid;
};

// helper validation functions
/**
 *
 * @param value
 * @param validationArray
 */
export const validationHandler = (value: any, validationArray: IValidationRule[]): IValidation => {
  const validationObject: IValidation = { isValid: true, message: '' };

  for (const validation of validationArray) {
    validationObject.isValid = callValidator(validation.name, validation, value);
    validationObject.message = '';
    if (!validationObject.isValid) {
      // checking if custom message is passed if not then use standard msgs
      if (validation.message) {
        validationObject.message = validation.message;
      } else {
        validationObject.message = (ValidationMessages as any)[validation.name];
      }
      // break if any one validation is failed
      break;
    }
  }
  return validationObject;
};
