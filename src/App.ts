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
 * App Abstraction Layer.
 * Oscuro JS NodeJS library 2019
 */
import readline from 'readline';
import net from 'net';
import { Window } from './class/Window';

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
    const [ok, id] = await this.sendMessage('MKWIN', width, height);
    if (ok !== 'OK') {
      throw new Error(`Bad response: '${ok}'`);
    }
    return new Window(id);
  }

  /**
   * Sends a command to the remote host and awaits the response.
   * Messaging should be not parallelized.
   * @param cmd The command to send.
   * @param args The command arguments.
   */
  public async sendMessage(cmd: string, args: any[]) {
    return new Promise<string[]>(resolve => {
      this.reader.once('line', line => {
        resolve(line.split(' '));
      });
      this.socket.write(cmd + args.map(arg => {
        if (typeof arg === 'string') {
          return Buffer.from(arg).toString('base64');
        } else {
          return String(arg),
        }
      }).join(' ') + '\n');
    });
  }

  /**
   * Disconnects from the host.
   */
  public disconnect() {
    this.socket.end();
  }
}
