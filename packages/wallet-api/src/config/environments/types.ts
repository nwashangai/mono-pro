type ConfigType = {
  version: string | undefined;
  port: string | number;
  timezone: string | undefined;
  logging: {
    maxsize: number;
    maxFiles: number;
    colorize: boolean;
  };
  authSecret: string | undefined;
  authSession: {
    session: boolean;
  };
};

export default ConfigType;
