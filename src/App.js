/**
 * App Abstraction Layer.
 * Oscuro JS NodeJS library 2019
 */

/**
 * Default socket port where OscuroJS should be listening.
 */
const DEFAULT_APP_PORT = 7899;

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
    static createDefault() {
        return new App(DEFAULT_APP_PORT);
    }

    /**
     * @param {number} port The socket port where OscuroJS is running.
     */
    constructor(port) {
        Object.defineProperty(this, 'port', {
            get: () => port
        });
    }
}

module.exports = { App, DEFAULT_APP_PORT };
