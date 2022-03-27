/* eslint-disable indent */
import Bitcoin from './Bitcoin';
import Ethereum from './Ethereum';
import Litecoin from './Litecoin';
import * as Types from '../types';

class Blockchain implements Types.Blockchain {
  private bitcoin: Bitcoin;
  private ethereum: Ethereum;
  private litecoin: Litecoin;
  private config: Types.ConfigType;
  private INFURA_ID = process.env.INFURA_ID;
  private constants: Types.ConstantsType;

  constructor({
    config,
    constants
  }: {
    config: Types.ConfigType;
    constants: Types.ConstantsType;
  }) {
    this.config = config;
    this.constants = constants;
    this.bitcoin = new Bitcoin({ config, constants });
    this.litecoin = new Litecoin({ config, constants });
    this.ethereum = new Ethereum({
      config,
      constants,
      PROJECT_ID: this.INFURA_ID!
    });
  }

  async generateWallet(
    type: string
  ): Promise<Types.GenerateWalletReturn | null> {
    switch (type) {
      case this.constants.CURRENCY.BTC:
        return this.bitcoin.generateWallet();
        break;

      case this.constants.CURRENCY.ETH:
        return this.ethereum.generateWallet();
        break;

      case this.constants.CURRENCY.LTC:
        return this.litecoin.generateWallet();
        break;

      default:
        return null;
        break;
    }
  }
}

export default Blockchain;
