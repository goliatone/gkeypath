'use strict';

const test = require('tape');

const KeyPath = require('../src/keypath');

test('KeyPath should get key path', t => {
    let out = { bar: { baz: 'fiz' } };
    let result = KeyPath.get(out, 'bar.baz');
    t.equal(result, out.bar.baz);
    t.end();
});