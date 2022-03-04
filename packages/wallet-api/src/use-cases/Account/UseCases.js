import buildAccountEntityFactory from '../../wallet/account';

export default class Account {
  constructor({ validation, cryptograph, blockchain, models, httpStatus }) {
    this.cryptograph = cryptograph;
    this.blockchain = blockchain;
    this.DB = models;
    this.account = buildAccountEntityFactory({ validation, httpStatus });
  }

  async createWallet({ userId = null, currency }) {
    let wallet = null;

    if (userId) {
      wallet = await this.DB.wallets.findOne({ owner: userId, currency });
    }

    if (wallet) {
      return this.account({
        _id: wallet._id,
        owner: wallet.owner,
        type: wallet.type,
        currency: wallet.currency,
        address: wallet.address,
        publicKey: wallet.publicKey,
        privateKey: wallet.privateKey,
        isBlocked: wallet.isBlocked,
        createdAt: wallet.createdAt,
        updatedAt: wallet.updatedAt
      });
    }

    const blockchainWallet = await this.blockchain.createWallet(currency);

    wallet = this.account({
      _id: null,
      currency,
      owner: userId || 'application',
      type: blockchainWallet.type,
      address: blockchainWallet.address,
      publicKey: blockchainWallet.publicKey,
      privateKey: blockchainWallet.privateKey
    });

    await this.DB.wallets.create({
      owner: wallet.owner,
      type: wallet.type,
      address: wallet.address.Account,
      publicKey: wallet.publicKey,
      privateKey: this.cryptograph.encrypt(wallet.privateKey),
      createdAt: wallet.createdAt,
      updatedAt: wallet.updatedAt
    });

    return wallet;
  }

  blockAccount({}) {}
}
