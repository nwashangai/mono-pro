import {
  WalletType,
  ConstructorType,
  AccountType,
  AccountReturn,
  Validation,
  HttpStatus
} from './types';

export default class Account implements WalletType {
  private validator: Validation;
  private httpStatus: HttpStatus;

  constructor({ validation, httpStatus }: ConstructorType) {
    this.validator = validation;
    this.httpStatus = httpStatus;
    this.account = this.account.bind(this);
  }

  account({
    _id = null,
    owner,
    currency,
    type,
    address,
    isBlocked = false,
    publicKey,
    privateKey,
    createdAt = new Date(),
    updatedAt = new Date()
  }: AccountType): AccountReturn {
    if (!this.validator.validateAddress(address, type)) {
      throw new Error(`{${this.httpStatus.BAD_REQUEST}} invlid address`);
    }

    return {
      getId: () => _id,
      getOwner: () => owner || 'Application',
      getCurrency: () => currency,
      getType: () => type,
      getAddress: () => address,
      getPublicKey: () => publicKey,
      isBlocked: () => isBlocked,
      getPrivateKey: () => privateKey,
      getCreatedAt: () => createdAt,
      getUpdatedAt: () => updatedAt
    };
  }
}
