/**
 * App factory.
 * Oscuro JS NodeJS library 2019
 */
import net from 'net';
import { App } from './App';

/**
 * Default socket port where OscuroJS should be listening.
 */
export const DEFAULT_APP_PORT = 7899;

/**
 * The default delimiter used by the app to exchange messages.
 */
export const DEFAULT_ARG_DELIMITER = ' ';

/**
 * An app factory creates applications, asynchronously by connecting them to
 * the primary host.
 */
export class AppFactory {
  constructor(private readonly port: number) {}

  /**
   * Default instance.
   */
  public static getDefault() {
    return new AppFactory(DEFAULT_APP_PORT);
  }

  /**
   * Creates an app.
   * @param delimiter The argument delimiter.
   */
  public async createApp(delimiter: string = DEFAULT_ARG_DELIMITER) {
    return new Promise<App>(r => {
      let socket: net.Socket;
      socket = net.connect({ port: this.port }, () =>
        r(new App(socket, delimiter))
      );
    });
  }
}
