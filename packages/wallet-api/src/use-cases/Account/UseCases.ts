import {
  ConstructorType,
  Models,
  IWallet,
  BlockChainType,
  HttpStatus,
  CryptographType,
  ConstantsType
} from './types';
import buildAccountEntityFactory, {
  IAccount,
  AccountReturn
} from '../../wallet/account';

export default class Account {
  private cryptograph: CryptographType;
  private blockchain: BlockChainType;
  private DB: Models;
  private account: IAccount;
  private httpStatus: HttpStatus;
  private constants: ConstantsType;

  constructor({
    validation,
    cryptograph,
    blockchain,
    models,
    httpStatus,
    constants
  }: ConstructorType) {
    this.cryptograph = cryptograph;
    this.blockchain = blockchain;
    this.DB = models;
    this.httpStatus = httpStatus;
    this.constants = constants;
    this.account = buildAccountEntityFactory({ validation, httpStatus });
    this.getWallet = this.getWallet.bind(this);
  }

  async getWallet({
    userId = null,
    currency
  }: {
    userId: string | null;
    currency: string;
  }): Promise<AccountReturn> {
    let wallet: IWallet | AccountReturn | null = null;

    if (userId) {
      wallet = await this.DB.wallets.findOne({
        owner: userId,
        currency: currency.toLocaleUpperCase()
      });
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

    const blockchainWallet = await this.blockchain.generateWallet(currency);

    if (!blockchainWallet) {
      throw new Error(
        `{${this.httpStatus.INTERNAL_SERVER_ERROR}} Third party error occured`
      );
    }

    wallet = this.account({
      _id: null,
      currency,
      owner: userId || 'application',
      type: blockchainWallet.type,
      address: blockchainWallet.address,
      publicKey: blockchainWallet.publicKey,
      privateKey: blockchainWallet.privateKey,
      createdAt: blockchainWallet.timestamp
    });

    await this.DB.wallets.create({
      owner: wallet.getOwner(),
      type: wallet.getType(),
      currency: currency.toLocaleUpperCase(),
      address: wallet.getAddress(),
      publicKey: wallet.getPublicKey(),
      privateKey: this.cryptograph.encrypt(wallet.getPrivateKey()),
      createdAt: wallet.getCreatedAt(),
      updatedAt: wallet.getUpdatedAt()
    });

    return wallet;
  }

  async getAllWallets(
    userId: string
  ): Promise<{ [key: string]: AccountReturn }[]> {
    return await Promise.all(
      Object.entries(this.constants.CURRENCY).map(async ([key, currency]) => ({
        [key]: await this.getWallet({
          userId,
          currency: currency.toLowerCase()
        })
      }))
    );
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
