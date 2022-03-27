import * as Types from '../types';

export default class EmailService {
  private config: Types.ConfigType;

  constructor({ config }: { config: Types.ConfigType }) {
    this.config = config;
    this.sendMail = this.sendMail.bind(this);
    this.build = this.build.bind(this);
  }

  build() {
    return {
      sendMail: this.sendMail
    };
  }

  async sendMail(email: string | string[], title: string, body: string) {
    // eslint-disable-next-line no-console
    console.log(email, title, body);
  }
}
