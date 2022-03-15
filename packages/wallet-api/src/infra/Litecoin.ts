import * as bitcoin from 'bitcoinjs-lib';
import buildECPairFactory, { ECPairAPI } from 'ecpair';
import * as ecc from 'tiny-secp256k1';
import * as Types from '../types';

class Litecoin implements Types.Blockchain {
  private ECPair: ECPairAPI;
  private config: Types.ConfigType;
  private constants: Types.ConstantsType;
  private LITECOIN = {
    messagePrefix: '\x19Litecoin Signed Message:\n',
    bech32: 'ltc',
    bip32: {
      public: 0x019da462,
      private: 0x019d9cfe
    },
    pubKeyHash: 0x30,
    scriptHash: 0x32,
    wif: 0xb0
  };

  constructor({
    config,
    constants
  }: {
    config: Types.ConfigType;
    constants: Types.ConstantsType;
  }) {
    this.config = config;
    this.constants = constants;
    this.ECPair = buildECPairFactory(ecc);
  }

  async generateWallet(): Promise<Types.GenerateWalletReturn> {
    const keyPair = this.ECPair.makeRandom({ network: this.LITECOIN });
    const privateKey = keyPair.toWIF();
    const { address } = bitcoin.payments.p2pkh({
      pubkey: keyPair.publicKey,
      network: this.LITECOIN
    });

    return {
      privateKey,
      address: address!,
      publicKey: keyPair.publicKey,
      timestamp: new Date(),
      type: this.constants.CURRENCY.LTC
    };
  }
}

export default Litecoin;
