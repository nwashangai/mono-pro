import { CreateUser, ConstructorType, CreateUserReturn } from './types';
import User from './Entity';

export type UserType = CreateUser;
export type CreateUserType = CreateUserReturn;

export default ({
  validator,
  makeHash,
  isPasswordMatched,
  httpStatus
}: ConstructorType): CreateUser => {
  const buildUser = new User({
    validator,
    makeHash,
    isPasswordMatched,
    httpStatus
  });
  return buildUser.createUser;
};
