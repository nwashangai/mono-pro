import jwt from 'jsonwebtoken';
import * as Types from '../types';

export default class JWTService {
  private jwtSecret: string | undefined;

  constructor({ config }: { config: Types.ConfigType }) {
    this.jwtSecret = config.authSecret;
    this.decode = this.decode.bind(this);
    this.sign = this.sign.bind(this);
    this.verify = this.verify.bind(this);
  }

  decode(token: string) {
    const decoded = jwt.decode(token);
    return decoded as { [key: string]: any };
  }

  sign(data: { [key: string]: any }) {
    return jwt.sign(
      {
        data
      },
      this.jwtSecret,
      { expiresIn: '5h' }
    );
  }

  verify(token: string) {
    return jwt.verify(token, this.jwtSecret);
  }
}
