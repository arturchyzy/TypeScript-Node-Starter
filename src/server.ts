import * as http from 'http';
import * as compression from 'compression';
import * as lusca from 'lusca';
import * as debugFunction from 'debug';
import App, { errorHandler } from './infrastructure/App';

const debug = debugFunction('dsp-console:mock-server');
const port = normalizePort(process.env.PORT || 3000);
App.set('port', port);

App.use(compression());
App.use(lusca.xframe('SAMEORIGIN'));
App.use(lusca.xssProtection(true));
App.use(errorHandler);

const server = http.createServer(App);
server.listen(port);
server.on('listening', onListening);
server.on('error', onError);


function normalizePort(val: number | string): number | string | boolean {
  const portNumber: number = (typeof val === 'string') ? parseInt(val, 10) : val;
  if (isNaN(portNumber)) {
    return val;
  } else if (portNumber >= 0) {
    return portNumber;
  } else {
    return false;
  }
}

function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
  switch (error.code) {
    case 'EACCES':
      // tslint:disable-next-line:no-console
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      // tslint:disable-next-line:no-console
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening(): void {
  const addr = server.address();
  const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}
