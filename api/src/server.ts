import { app } from './app';
import { env } from './env';

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT || 3333
  })
  .then(() => env.NODE_ENV !== 'prod' && console.log('🧔 Server up and running!'))
  .catch((error) => env.NODE_ENV !== 'prod' && console.log('😢 Could not start the server. ' + error.message));