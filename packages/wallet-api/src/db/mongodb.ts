import { ConstructorType, IDB, LoggerType, MongooseType } from './types';

export default class Datasource implements IDB {
  private dbUrl: string | undefined;
  private logger: LoggerType;
  private orm: MongooseType;

  constructor({ config, logger, orm }: ConstructorType) {
    this.dbUrl = config.db.url;
    this.logger = logger;
    this.orm = orm;
    this.connect = this.connect.bind(this);
  }

  async connect() {
    try {
      await this.orm.connect(this.dbUrl!, {
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
