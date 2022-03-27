import {
  UserType,
  CreateUserInput,
  ConstructorType,
  CreateUserReturn,
  IUser
} from './types';

export default class User implements UserType {
  private validator;
  private makeHash;
  private httpStatus;
  private isPasswordMatched;
  private roles: string[];

  constructor({
    validator,
    makeHash,
    isPasswordMatched,
    httpStatus,
    constants
  }: ConstructorType) {
    this.validator = validator;
    this.makeHash = makeHash;
    this.httpStatus = httpStatus;
    this.isPasswordMatched = isPasswordMatched;
    this.createUser = this.createUser.bind(this);
    this.roles = constants.DEFAULT.ROLES;
  }

  createUser({
    _id,
    email,
    name,
    phone,
    country,
    role = this.roles[0],
    lastLogin = new Date(),
    password = '',
    createdAt = new Date(),
    updatedAt = new Date()
  }: CreateUserInput | IUser): CreateUserReturn {
    if (!this.validator.isValidEmail(email)) {
      throw new Error(
        `{${this.httpStatus.BAD_REQUEST}} User must have a valid email`
      );
    }

    if (!this.validator.isValidName(name)) {
      throw new Error(
        `{${this.httpStatus.BAD_REQUEST}} User must have a valid name`
      );
    }

    if (!this.validator.isValidPhone(phone)) {
      throw new Error(
        `{${this.httpStatus.BAD_REQUEST}} User must have a valid phone number`
      );
    }

    if (country && !this.validator.isValidCountry(country)) {
      throw new Error(
        `{${this.httpStatus.BAD_REQUEST}} User must have a valid country`
      );
    }

    if (password && !this.validator.isValidPassword(password)) {
      throw new Error(
        `{${this.httpStatus.BAD_REQUEST}} User must have a strong password`
      );
    }

    if (role && !this.roles.includes(role || '')) {
      throw new Error(
        `{${this.httpStatus.BAD_REQUEST}} User must have a valid role`
      );
    }

    return {
      getId: () => {
        return _id || null;
      },
      getEmail: () => {
        return email.toLowerCase();
      },
      getName: () => {
        return name.trim();
      },
      getPhone: () => {
        return phone;
      },
      getRole: () => {
        return role;
      },
      getNationality: () => {
        return country;
      },
      getLastLogin: () => {
        return lastLogin;
      },
      hashPassword: () => {
        if (!this.validator.isValidPassword(password)) {
          throw new Error(
            `{${this.httpStatus.BAD_REQUEST}} User must provide a password`
          );
        }
        return this.makeHash(password);
      },
      isPasswordMatched: (passwordToCompare: string, hash: string) => {
        return this.isPasswordMatched(passwordToCompare, hash);
      },
      getPassword: () => {
        return password || '';
      },
      getCreatedAt: () => {
        return createdAt;
      },
      getUpdatedAt: () => {
        return updatedAt;
      }
    };
  }
}
