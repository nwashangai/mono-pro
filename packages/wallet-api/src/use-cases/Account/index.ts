import { BuilType } from './types';
import Account from './UseCases';

export * as UserTypes from './types';

export default ({
  validation,
  models,
  httpStatus,
  cryptograph,
  blockchain,
  constants
}: BuilType) => {
  return new Account({
    models,
    httpStatus,
    validation,
    blockchain,
    cryptograph,
    constants
  });
};
