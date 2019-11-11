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
  private disconnected: boolean = false;

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
   * Disconnects from the host.
   */
  public disconnect() {
    this.socket.end();
  }
}
