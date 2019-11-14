import net from 'net';
import readline from 'readline';
import { DEFAULT_APP_PORT, DEFAULT_ARG_DELIMITER, AppFactory } from '../src/AppFactory';
import { expect } from 'chai'
import { App } from '../src/App';

// Mock server
const server = net.createServer(socket => {
  const rl = readline.createInterface(socket);
  rl.on('line', line => {
    const [cmd, ...args] = line.split(DEFAULT_ARG_DELIMITER);
    switch (cmd) {
      case 'MKWIN':
        socket.write('OK AAAAID001\n');
        break;
      default:
        socket.write('ERRNOCOMMAND\n');
    }
  });
});
server.listen(DEFAULT_APP_PORT);

describe('Basic app creation', () => {
  const factory = AppFactory.getDefault();
  it('Should connect to the server and return an app', async () => {
    const app = await factory.createApp();
    expect(app).to.be.instanceOf(App);
  });
  it('Should create a window with a valid ID', async () => {
    const app = await factory.createApp();
    const win = await app.createWindow(800, 600);
    // TODO: Write test
  });
});
