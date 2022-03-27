import container from './container';
import { App } from './types';

const app: App = container.resolve('app');

app.start().catch(error => {
  app.logger.error(error.stack);
  // process.exit();
});
