import { BuilType } from './types';
import buildUserEntityFactory from '../../wallet/user';
import User from './UseCases';

export * as UserTypes from './types';

export default ({
  validation,
  passwordHash,
  models,
  httpStatus,
  constants
}: BuilType) => {
  const makeNewUser = buildUserEntityFactory({
    validator: validation,
    makeHash: passwordHash.hash,
    isPasswordMatched: passwordHash.isHashMatched,
    httpStatus,
    constants
  });

  return new User({ models, httpStatus, makeNewUser }).build();
};
