
export type IGenericOption = {
  [key: string]: any;
}
  
export interface IValidation {
  isValid: boolean;
  message: string;
}

export interface IValidationRules {
  integer: (integer: any) => boolean;
  email: (email: string) => boolean;
  mobile: (mobile: any) => boolean;
  required: (value: any) => boolean;
  regex: (regexString: string, value: any) => boolean;
  inverseRegex: (regexString: string, value: any) => boolean;
  maxValue: (maxValue: any, value: any) => boolean;
  minValue: (minValue: any, value: any) => boolean;
  range: (range: any, value: any) => boolean;
  minLength: (minLength: number, value: any) => boolean;
  maxLength: (maxLength: number, value: any) => boolean;
  pan: (value: any) => boolean;
  aadhar: (value: any) => boolean;
  gstin: (value: any) => boolean;
  alphaNumeric: (value: any) => boolean;
  alphaNumericWithSpace: (value: any) => boolean;
  multipleOf: (multiple: number, value: number) => boolean;
}

export interface IValidationMessages {
  required: string;
  email: string;
  mobile: string;
  integer: string;
  regex: string;
  inverseRegex: string;
  maxValue: string;
  minValue: string;
  range: string;
  maxLength: string;
  minLength: string;
  pan: string;
  aadhar: string;
  gstin: string;
  pincode: string;
  alphaNumeric: string;
  alphaNumericWithSpace: string;
  multipleOf: string;
}

export interface IValidationRule {
  name: string;
  message?: string;
  minValue?: number;
  maxValue?: number;
  range?: { maximum: number; minimum: number };
  expression?: string;
  customHandler?: (value: any) => boolean;
}