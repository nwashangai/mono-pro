const drivers = {
  mongodb: require('./mongodb').default
};

export default drivers[process.env.DB_DRIVER as keyof typeof drivers];
