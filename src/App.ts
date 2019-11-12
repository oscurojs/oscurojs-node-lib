/**
 * App Abstraction Layer.
 * Oscuro JS NodeJS library 2019
 */
import readline from 'readline';
import net from 'net';

/**
 * The app wrapper represents a connection abstraction between the backend (App
 * that is consuming this library) and the frontend (OscuroJS process).
 */
export class App {
  private reader: readline.Interface;

  constructor(
    private readonly socket: net.Socket,
    public readonly delimiter: string
  ) {
    this.reader = readline.createInterface(this.socket);
  }

  /**
   * Calls the fn callback when the app receives a message.
   */
  public onMessage(fn) {
    this.reader.on('line', line => fn(line.split(this.delimiter)));
  }

  /**
   * Creates a new window instance, resolves once the host has provided a valid
   * window UID.
   * @param width Window width
   * @param height Window height
   */
  public async createWindow(width: number, height: number) {
    return new Promise(r => {
      this.reader.once('line', line => {
        // The line is the window ID
        // TODO: Resolve promise with the window instance.
        throw new Error('Not implemented yet');
      });
      this.socket.write(`MKWIN ${width} ${height}`);
    })
  }

  /**
   * Disconnects from the host.
   */
  public disconnect() {
    this.socket.end();
  }
}
