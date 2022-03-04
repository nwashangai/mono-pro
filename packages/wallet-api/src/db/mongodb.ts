import { ConstructorType, IDB } from './types.d';

export default class Datasource implements IDB {
  private dbUrl;
  private logger;
  private mongoose;

  constructor({ config, logger, mongoose }: ConstructorType) {
    this.dbUrl = config.db.url;
    this.logger = logger;
    this.mongoose = mongoose;
  }
  async connect() {
    try {
      await this.mongoose.connect(this.dbUrl!, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      this.logger.info('Connection to mongodb database established');
    } catch (error: any) {
      this.logger.error(
        '===============>>Can not connect to DB<<===================='
      );
      this.logger.error(error.message);
      this.logger.error(this.dbUrl);
    }
  }
}
