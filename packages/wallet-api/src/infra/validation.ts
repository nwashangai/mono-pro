/* eslint-disable indent */
/* eslint-disable prettier/prettier */
import Web3 from 'web3';
import * as WAValidator from 'multicoin-address-validator';
import { object, string } from 'yup';
import * as Types from '../types';

const validation = ({ httpStatus, constants }: { httpStatus: Types.HttpStatus, constants: Types.ConstantsType }) => {
  const nameRegex = /\b([a-zA-ZÀ-ÿ][-,a-z.A-Z ']+[ ]*)+/;
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const phoneRegex = /^\+[1-9]{1}[0-9]{3,14}$/;

  const isValidEmail = (value: string) =>
    !value ? false : emailRegex.test(value);
  const isValidName = (value: string) =>
    !value ? false : nameRegex.test(value);
  const isValidPhone = (value: string) =>
    !value ? false : phoneRegex.test(value);
  const isValidPassword = (value: string | any[]) =>
    !value ? false : value.length > 5;
  const isValidCountry = (value: string | any[]) =>
    !value ? false : value.length > 3;
  const validateAddress = (address: string, type: string): boolean => {
    switch (type) {
      case constants.CURRENCY.BTC:
        return true;
        break;

      case constants.CURRENCY.ETH:
        try {
          return Boolean(Web3.utils.toChecksumAddress(address));
        } catch (error: any) {
          return false;
        }
        break;

      case constants.CURRENCY.LTC:
        try {
          return WAValidator.validate(address, constants.CURRENCY.LTC.toLocaleUpperCase());
        } catch (error: any) {
          return false;
        }
        break;

      default:
        return false;
        break;
    }
   };

  const strictCallback = async (
    schemaValidation: any,
    req: Types.RequestObj,
    resp: Types.Response,
    next: () => void
  ) => {
    try {
      const schema = await schemaValidation.validate(req.body, {
        strict: true,
        abortEarly: true,
        stripUnknown: true
      });

      req.body = schema;
      return next();
    } catch (error: any) {
      return resp
        .status(httpStatus.BAD_REQUEST)
        .json({ message: error.message });
    }
  };

  const registrationSchema = object({
    email: string()
      .trim()
      .matches(emailRegex, 'email must be avalid email')
      .required(),
    code: string().trim().min(6).max(6).required(),
    name: string()
      .trim()
      .matches(nameRegex, 'name must be valid name')
      .required(),
    country: string()
      .trim()
      .min(2, 'country must be more than 2 characters')
      .required(),
    phone: string()
      .trim()
      .matches(phoneRegex, 'phone must be more than 8 characters')
      .required()
  });

  const startRegistrationSchema = object({
    email: string()
      .trim()
      .matches(emailRegex, 'email must be avalid email')
      .required()
  });

  const loginSchema = object({
    email: string()
      .trim()
      .matches(emailRegex, 'email must be avalid email')
      .required(),
    password: string()
      .trim()
      .min(5, 'password must be at least 5 characters')
      .required()
  });

  const validateStartRegistration = async (
    request: Types.RequestObj,
    response: Types.Response,
    next: () => void
  ) => {
    return strictCallback(startRegistrationSchema, request, response, next);
  };

  const validateRegistration = async (
    request: Types.RequestObj,
    response: Types.Response,
    next: () => void
  ) => {
    return strictCallback(registrationSchema, request, response, next);
  };

  const validateLogin = async (
    request: Types.RequestObj,
    response: Types.Response,
    next: () => void
  ) => {
    return strictCallback(loginSchema, request, response, next);
  };

  return Object.freeze({
    isValidEmail,
    isValidName,
    isValidPhone,
    isValidPassword,
    isValidCountry,
    validateStartRegistration,
    validateRegistration,
    validateAddress,
    validateLogin
  });
};

export type ValidationType = typeof validation;
export default validation;
