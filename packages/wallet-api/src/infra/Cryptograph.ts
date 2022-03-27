import NodeRSA from 'node-rsa';
import * as Types from '../types';

class Cryptograph implements Types.Cryptograph {
  private cryptograph: NodeRSA;
  private config: Types.ConfigType;
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
    this.cryptograph = new NodeRSA({ b: 512 });
  }

  encrypt(value: any): any {
    return this.cryptograph.encrypt(value, 'base64');
  }

  decrypt(value: any): any {
    return this.cryptograph.decrypt(value, 'utf8');
  }
}

export default Cryptograph;
