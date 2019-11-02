/*
 * Runs all the tests.
 */
const test = require('tape');
const tapSpec = require('tap-spec');

test.createStream()
    .pipe(tapSpec())
    .pipe(process.stdout);
