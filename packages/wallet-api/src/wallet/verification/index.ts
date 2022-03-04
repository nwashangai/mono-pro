import { Register, Validation, GenerateCode, HttpStatus } from './types';
import Verify from './Entity';

export default (
  validator: Validation,
  generateCode: GenerateCode,
  httpStatus: HttpStatus
): Register => {
  const buildVerify = new Verify({ validator, generateCode, httpStatus });
  return buildVerify.register;
};
