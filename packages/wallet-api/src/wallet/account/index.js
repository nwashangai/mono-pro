import Account from './Entity';

export default ({ validation, httpStatus }) => {
  const buildAccount = new Account({
    validation,
    httpStatus
  });
  return buildAccount.account;
};
