/*
MIT License

Copyright (c) 2019 Pablo Blanco Celdrán

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
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
    return new Promise<App>(resolve => {
      let socket: net.Socket;
      socket = net.connect({ port: this.port }, () =>
        resolve(new App(socket, delimiter))
      );
    });
  }
}
