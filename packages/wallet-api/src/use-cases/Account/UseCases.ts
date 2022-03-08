import { ConstructorType, Models, IWallet } from './types';
import buildAccountEntityFactory, {
  IAccount,
  AccountReturn
} from '../../wallet/account';

export default class Account {
  private cryptograph;
  private blockchain;
  private DB: Models;
  private account: IAccount;

  constructor({
    validation,
    cryptograph,
    blockchain,
    models,
    httpStatus
  }: ConstructorType) {
    this.cryptograph = cryptograph;
    this.blockchain = blockchain;
    this.DB = models;
    this.account = buildAccountEntityFactory({ validation, httpStatus });
    this.createWallet = this.createWallet.bind(this);
  }

  async createWallet({
    userId = null,
    currency
  }: {
    userId: string | null;
    currency: string;
  }): Promise<AccountReturn> {
    let wallet: IWallet | AccountReturn | null = null;

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
      owner: wallet.getOwner(),
      type: wallet.getType(),
      address: wallet.getAddress(),
      publicKey: wallet.getPublicKey(),
      privateKey: this.cryptograph.encrypt(wallet.getPrivateKey()),
      createdAt: wallet.getCreatedAt(),
      updatedAt: wallet.getUpdatedAt()
    });

    return wallet;
  }

  async blockAccount(address: string): Promise<AccountReturn | null> {
    const wallet = await this.DB.wallets.findOne({ address });

    if (wallet) {
      await this.DB.wallets.updateMany({ address }, { isBlocked: true });

      return this.account({ ...wallet, isBlocked: true });
    }

    return null;
  }
}
