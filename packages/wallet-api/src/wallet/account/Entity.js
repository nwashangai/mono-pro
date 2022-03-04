export default class Account {
  constructor({ validation, httpStatus }) {
    this.validator = validation;
    this.httpStatus = httpStatus;
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
  }) {
    this.id = _id;
    this.owner = owner;
    this.currency = currency;
    this.type = type;
    this.address = address;
    this.isBlocked = isBlocked;
    this.publicKey = publicKey;
    this.privateKey = privateKey;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;

    if (!this.validator.validateAddress(this.address, this.type)) {
      throw new Error(`{${this.httpStatus.BAD_REQUEST}} invlid address`);
    }

    return {
      id: this.id,
      owner: this.owner,
      currency: this.currency,
      type: this.type,
      address: this.address,
      publicKey: this.publicKey,
      isBlocked: this.isBlocked,
      privateKey: this.privateKey,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
