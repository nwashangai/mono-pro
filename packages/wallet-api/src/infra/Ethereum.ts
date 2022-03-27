import Web3 from 'web3';
import * as Types from '../types';

class Ethereum implements Types.Blockchain {
  private config: Types.ConfigType;
  private PROJECT_ID: string;
  private constants: Types.ConstantsType;
  private web3: Web3;

  constructor({
    config,
    constants,
    PROJECT_ID
  }: {
    config: Types.ConfigType;
    constants: Types.ConstantsType;
    PROJECT_ID: string;
  }) {
    this.config = config;
    this.constants = constants;
    this.PROJECT_ID = PROJECT_ID;
    this.web3 = new Web3(
      new Web3.providers.HttpProvider(
        `https://rinkeby.infura.io/v3/${this.PROJECT_ID}`
      )
    );
  }

  async generateWallet(): Promise<Types.GenerateWalletReturn> {
    const account = this.web3.eth.accounts.create();

    return {
      privateKey: account.privateKey,
      address: account.address,
      publicKey: Buffer.from(account.address, 'utf8'),
      timestamp: new Date(),
      type: this.constants.CURRENCY.ETH
    };
  }
}

export default Ethereum;
