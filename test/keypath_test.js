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

    let expected = '_DEFAULT_VALUE_';

    let result = KeyPath.get(out, 'bar.XX', expected);

    t.equal(result, expected);

    t.end();
});

test('KeyPath should get key path for array items', t => {
    let out = { bar: { baz: 'fiz', fiz: ['buzz', 'light'] } };
    let result = KeyPath.get(out, 'bar.fiz[0]');
    t.equal(result, 'buzz');
    t.end();
});

test('KeyPath should get key handle [] and . notation for arrays', t => {
    let out = { bar: { baz: 'fiz', fiz: ['buzz', 'light'] } };

    let result1 = KeyPath.get(out, 'bar.fiz[0]');
    let result2 = KeyPath.get(out, 'bar.fiz.0');

    t.equal(result1, result2);

    t.end();
});

test('KeyPath should get full array ', t => {
    let out = { bar: { baz: 'fiz', fiz: ['buzz', 'light'] } };
    let result = KeyPath.get(out, 'bar.fiz');
    t.equal(result, out.bar.fiz);
    t.end();
});

test('KeyPath should set objects ', t => {
    let out = {};
    let expected = { bar: { baz: 'fiz', fiz: ['buzz'] } };

    KeyPath.set(out, 'bar.baz', 'fiz');

    t.equal(out.bar.baz, expected.bar.baz);

    t.end();
});

test('KeyPath should set objects ', t => {

    let expected = {
        user: {
            id: 1,
            name: 'test',
        },
        device: {
            type: 'mobile'
        },
        os: { version: 14, name: 'ios' }
    };

    let out = {};


    KeyPath.set(out, 'user.id', expected.user.id);
    KeyPath.set(out, 'user.name', expected.user.name);
    KeyPath.set(out, 'device.type', expected.device.type);
    KeyPath.set(out, 'os.name', expected.os.name);
    KeyPath.set(out, 'os.version', expected.os.version);

    t.deepEquals(out, expected);

    t.end();
});

test('KeyPath should del values in keypath', t => {
    let out = { bar: { baz: 'fiz', fiz: ['buzz', 'light'] } };
    let expected = { bar: { fiz: ['buzz'] } };

    KeyPath.del(out, 'bar.baz');

    t.equal(out.bar.baz, expected.bar.baz);

    t.end();
});

test('KeyPath should del values in array keypath', t => {
    let out = { bar: { baz: 'fiz', fiz: ['buzz', 'light'] } };
    let expected = { bar: { baz: 'fiz', fiz: ['buzz'] } };

    KeyPath.del(out, 'bar.fiz.1');

    t.equal(out.bar.baz, expected.bar.baz);

    t.end();
});

test('KeyPath should return oneOf ', t => {
    let out = { bar: { baz: 'fiz', fiz: ['buzz', 'light'] } };
    let expected = { bar: { baz: 'fiz', fiz: ['buzz', 'light'] } };

    let result = KeyPath.oneOf(out, ['nope', 'dope', 'bar.fiz[1]']);

    t.equal(result, expected.bar.fiz[1]);

    t.end();
});


test('KeyPath should return defaultValue if either target or path are undefined', t => {
    let out = { bar: { baz: 'fiz', fiz: ['buzz', 'light'] } };

    let expected = 'default';

    let result = KeyPath.get(out, undefined, expected);
    t.equal(result, expected);

    result = KeyPath.get(out, '', expected);
    t.equal(result, expected);

    result = KeyPath.get(out, 'bar.undefined.fiz', expected);
    t.equal(result, expected);

    result = KeyPath.get(undefined, 'path', expected);
    t.equal(result, expected);

    result = KeyPath.get(undefined, undefined, expected);
    t.equal(result, expected);

    result = KeyPath.get(undefined, 'bar.baz', expected);
    t.equal(result, expected);

    result = KeyPath.get({}, 'bar.baz', expected);
    t.equal(result, expected);

    result = KeyPath.get({ bar: null }, 'bar.baz', expected);
    t.equal(result, expected);

    result = KeyPath.get({ bar: { baz: null } }, 'bar.baz.fiz', expected);
    t.equal(result, expected);

    t.end();
});

test('KeyPath should return defaultValue if oneOf does not match', t => {
    let out = { bar: { baz: 'fiz', fiz: ['buzz', 'light'] } };
    let expected = 'default';

    let result = KeyPath.oneOf(out, ['nope', 'dope'], expected);

    t.equal(result, expected);

    t.end();
});

test('KeyPath should optionally not execute functions', t => {

    const defaultFunction = _ => {};

    let out = { bar: { baz: defaultFunction } };
    let expected = defaultFunction;

    let result = KeyPath.get(out, 'bar.baz', undefined, { useGetters: false });

    t.equal(result, expected);

    t.end();
});

test('KeyPath should optionally not execute functions in default value', t => {

    const defaultFunction = _ => {};

    let out = { bar: { baz: 'fiz', fiz: ['buzz', 'light'] } };
    let expected = defaultFunction;

    let result = KeyPath.get(out, 'bar.XX', defaultFunction, { useGetters: false });

    t.equal(result, expected);

    t.end();
});
