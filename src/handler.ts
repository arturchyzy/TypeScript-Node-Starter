import * as awsServerlessExpress from 'aws-serverless-express';
import * as lambda from 'aws-lambda';
import ExpressApp from './infrastructure/App';

const server = awsServerlessExpress.createServer(ExpressApp, undefined);
// tslint:disable-next-line:no-any
export const expressProxy = (event: any, context: lambda.Context, callback: lambda.Callback) => {
    if (event.source === 'serverless-plugin-warmup') {
        return callback(null, {result: 'Lambda is warm!'});
    }
  return awsServerlessExpress.proxy(server, event, context);
};
