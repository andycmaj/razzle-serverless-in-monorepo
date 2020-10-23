import * as awsServerlessExpress from 'aws-serverless-express';
import { buildLambdaServer, buildLocalServer } from './server';

let lambdaOrServer;
if (process.env.LAMBDA) {
  console.log('Lambda 🚀 started');

  const app = buildLambdaServer();
  const server = awsServerlessExpress.createServer(app);

  lambdaOrServer = (event: any, context: any) =>
    awsServerlessExpress.proxy(server, event, context);
} else {
  if (module.hot) {
    module.hot.accept('./server', () => {
      console.log('🔁  HMR Reloading `./server`...');
    });
    console.info('✅  Server-side HMR Enabled!');
  }

  const port = 3000;
  lambdaOrServer = buildLocalServer(port);
}

export const handler = lambdaOrServer;
