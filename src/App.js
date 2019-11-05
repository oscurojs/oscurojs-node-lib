/**
 * App Abstraction Layer.
 * Oscuro JS NodeJS library 2019
 */
const net = require('net');
const readline = require('readline');

/**
 * Default socket port where OscuroJS should be listening.
 */
const DEFAULT_APP_PORT = 7899;

// Symbols for private fields.
const _state = Symbol('state');
const _reader = Symbol('reader');
const _socket = Symbol('socket');
const _delimiter = Symbol('delimiter');

/**
 * The default delimiter used by the app to exchange messages.
 */
const DEFAULT_ARG_DELIMITER = ' ';

/**
 * The app wrapper represents a connection abstraction between the backend (App
 * that is consuming this library) and the frontend (OscuroJS process).
 * @class
 */
class App {
    /**
     * Creates the default instance of the application, running at the default
     * port.
     */
    static createDefault(delimiter = DEFAULT_ARG_DELIMITER) {
        return new App(DEFAULT_APP_PORT, delimiter);
    }

    /**
     * @param {number} port The socket port where OscuroJS is running.
     */
    constructor(port) {
        const socket = net.connect({ port });
        this[_socket] = socket;
        const reader = readline.createInterface(socket);
        this[_state] = 'connecting';
        socket.once('connect', () => this[_state] = 'connected');
        socket.once('end', () => this[_state] = 'disconnected');
        this[_reader] = reader;
        this[_delimiter] = DEFAULT_ARG_DELIMITER;
    }
    
    /**
     * Current app state, wether is 
     * @type {'connecting'|'connected'|'disconnected'}
     */
    get state() {
        return this[_state];
    }

    /**
     * Calls the fn callback when the app receives a message.
     * @param {(message: string[]) => void} fn 
     */
    onMessage(fn) {
        this[_reader].on('line', line => fn(line.split(this[_delimiter])));
    }

    /**
     * Calls the function once the client is connected.
     * @param {() => void} fn 
     */
    onceReady(fn) {
        this[_socket].once('connect', fn);
    }

    /**
     * Disconnects from the host.
     */
    disconnect() {
        this[_socket].end();
    }
}

module.exports = { App, DEFAULT_APP_PORT, DEFAULT_ARG_DELIMITER };
