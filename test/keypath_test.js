'use strict';

const test = require('tape');

const KeyPath = require('../src/keypath');

test('KeyPath should get key path', t => {
    let out = { bar: { baz: 'fiz' } };
    let result = KeyPath.get(out, 'bar.baz');
    t.equal(result, out.bar.baz);
    t.end();
});

test('KeyPath should return default value if key path is undefined', t => {
    let out = { bar: { baz: 'fiz' } };
    let result = KeyPath.get(out, 'bar.XX', '_DEFAULT_VALUE_');
    t.equal(result, '_DEFAULT_VALUE_');
    t.end();
});

test('KeyPath should get key path for array items', t => {
    let out = { bar: { baz: 'fiz', fiz: ['buzz'] } };
    let result = KeyPath.get(out, 'bar.fiz[0]');
    t.equal(result, 'buzz');
    t.end();
});

test('KeyPath should get full array ', t => {
    let out = { bar: { baz: 'fiz', fiz: ['buzz'] } };
    let result = KeyPath.get(out, 'bar.fiz');
    t.equal(result, out.bar.fiz);
    t.end();
});

test('KeyPath should set objects ', t => {
    let expected = { bar: { baz: 'fiz', fiz: ['buzz'] } };
    let out = {};
    KeyPath.set(out, 'bar.baz', 'fiz');
    t.equal(out.bar.baz, 'fiz');
    t.end();
});