/*
 * This script tests out the basic circuit.
 */
const net = require('net');
const test = require('tape');
const { App, DEFAULT_APP_PORT } = require('../../src/App');

const server = net.createServer(client => {
    client.write('Hello world!\n');
});
server.listen(DEFAULT_APP_PORT);

test('It should connect to the dummy app', assert => {
    const app = App.createDefault();
    assert.equal(app.state, 'connecting');
    app.onceReady(() => {
        assert.equal(app.state, 'connected');
        assert.end();
        app.disconnect();
    });
});

test('Read a simple message', assert => {
    const app = App.createDefault();
    app.onMessage(([ hello, world ]) => {
        assert.equal(hello, 'Hello');
        assert.equal(world, 'world!');
        assert.end();
        app.disconnect();
    });
});

// Cleanup
test.onFinish(() => server.close());
