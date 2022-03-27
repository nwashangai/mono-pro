import { ConstructorType } from './types';
import Account from './Entity';

export type { IAccount, AccountReturn } from './types';

export default ({ validation, httpStatus }: ConstructorType) => {
  const buildAccount = new Account({
    validation,
    httpStatus
  });
  return buildAccount.account;
};
