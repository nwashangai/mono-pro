import * as bitcoin from 'bitcoinjs-lib';
import buildECPairFactory, { ECPairAPI } from 'ecpair';
import * as ecc from 'tiny-secp256k1';
import * as Types from '../types';

class Bitcoin implements Types.Blockchain {
  private ECPair: ECPairAPI;
  private config: Types.ConfigType;
  private constants: Types.ConstantsType;
  private TESTNET: bitcoin.networks.Network | undefined;

  constructor({
    config,
    constants
  }: {
    config: Types.ConfigType;
    constants: Types.ConstantsType;
  }) {
    this.config = config;
    this.constants = constants;
    this.TESTNET =
      config.chain === constants.CHAIN.TESTNET
        ? bitcoin.networks.testnet
        : undefined;
    this.ECPair = buildECPairFactory(ecc);
  }

  async generateWallet(): Promise<Types.GenerateWalletReturn> {
    const keyPair = this.ECPair.makeRandom({ network: this.TESTNET });
    const privateKey = keyPair.toWIF();
    const { address } = bitcoin.payments.p2pkh({
      pubkey: keyPair.publicKey,
      network: this.TESTNET
    });

    return {
      privateKey,
      address: address!,
      publicKey: keyPair.publicKey,
      timestamp: new Date(),
      type: this.constants.CURRENCY.BTC
    };
  }
}

export default Bitcoin;
