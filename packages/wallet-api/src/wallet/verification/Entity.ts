import {
  Verification,
  ConstructorType,
  RegisterInput,
  RegisterReturn
} from './types';

export default class Verify implements Verification {
  private validator;
  private generateCode;
  private httpStatus;

  constructor({ validator, generateCode, httpStatus }: ConstructorType) {
    this.validator = validator;
    this.generateCode = generateCode;
    this.httpStatus = httpStatus;
    this.register = this.register.bind(this);
  }

  register({
    _id,
    email,
    code,
    isVerified = false,
    createdAt = new Date(),
    updatedAt = new Date()
  }: RegisterInput): RegisterReturn {
    if (!this.validator.isValidEmail(email)) {
      throw new Error(
        `{${this.httpStatus.BAD_REQUEST}} User must have a valid email`
      );
    }

    const generatedCode = code || this.generateCode();

    return Object.freeze({
      getId: () => {
        return _id || null;
      },
      getEmail: () => {
        return email.toLowerCase();
      },
      isVerified: () => Boolean(isVerified),
      getCode: () => {
        return generatedCode;
      },
      getCreatedAt: () => {
        return createdAt;
      },
      getUpdatedAt: () => {
        return updatedAt;
      }
    });
  }
}
