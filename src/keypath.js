/*
 * gkeypath
 * https://github.com/goliatone/gkeypath
 * Created with gbase.
 * Copyright (c) 2014 goliatone
 * Licensed under the MIT license.
 */
/* jshint strict: false, plusplus: true */
/*global define: false, require: false, module: false, exports: false */
(function(root, name, deps, factory) {
    "use strict";
    // Node
    if (typeof deps === 'function') {
        factory = deps;
        deps = [];
    }

    if (typeof exports === 'object') {
        module.exports = factory.apply(root, deps.map(require));
    } else if (typeof define === 'function' && 'amd' in define) {
        //require js, here we assume the file is named as the lower
        //case module name.
        define(name.toLowerCase(), deps, factory);
    } else {
        // Browser
        var d, i = 0,
            global = root,
            old = global[name],
            mod;
        while ((d = deps[i]) !== undefined) deps[i++] = root[d];
        global[name] = mod = factory.apply(global, deps);
        //Export no 'conflict module', aliases the module.
        mod.noConflict = function() {
            global[name] = old;
            return mod;
        };
    }
}(this, 'keypath', function() {


    var Keypath = {};

    var DEFAULTS = {
        assertionMessage: 'Assertion failed'
    };

    Keypath.VERSION = '0.9.1';

    Keypath.set = function(target, path, value) {
        if (!target) return undefined;

        var keys = path.split('.');
        path = keys.pop();
        keys.forEach(function(prop) {
            if (!target[prop]) target[prop] = {};
            target = target[prop];
        });
        /**
         * We do not support `...` but we could 
         * extend to enable array concatenation
         */
        if (path.match(/\w+\[(\d+)\]/)) {
            let [_, name, index] = path.match(/(\w+)\[(\d+)\]/);
            if (!Array.isArray(target[name])) target[name] = [];
            target = target[name];
            path = index;
        }

        Keypath._set(target, path, value); //target[path] = value;

        return target;
    };

    Keypath.get = function(target, path, defaultValue) {
        if (!target || !path) return false;

        path = path.split('.');
        var l = path.length,
            i = 0,
            p = '';
        for (; i < l; ++i) {
            p = path[i];
            if (p.match(/\w+\[(\d+)\]/)) {
                let [_, name, index] = p.match(/(\w+)\[(\d+)\]/);
                target = target[name];
                if (!target) return defaultValue;
                p = index;
            }
            if (target[p] !== undefined) target = target[p];
            else return Keypath._get(defaultValue);
        }
        return Keypath._get(target);
    };

    Keypath.has = function(target, path) {
        return this.get(target, path, '#$#NFV#$#') !== '#$#NFV#$#';
    };

    Keypath.assert = function(target, path, message) {
        message = message || Keypath.DEFAULTS.assertionMessage;
        var value = this.get(target, path, message);

        if (value !== message) return value;

        this.onError(message, path);

        return undefined;
    };

    /**
     * 
     * @param {Object} target Source object
     * @param {Array} [paths=[]] Path list  
     * @param {*} defaultValue Default value
     * @returns {*}
     */
    Keypath.oneOf = function(target, paths = [], defaultValue = undefined) {
        for (let path of paths) {
            if (this.has(target, path)) {
                return this.get(target, path);
            }
        }
        return defaultValue;
    };

    //TODO: we might want to reverse the order, and have a different
    //signature. target, propName, inject
    Keypath.wrap = function(target, inject, dataPropName) {
        var wrapper = new Wrapper(target, dataPropName);

        if (Proxy) {
            wrapper = new Proxy(wrapper, {
                get: function(receiver, prop) {
                    if (typeof receiver[prop] === 'function') {
                        return function(...args) {
                            return Reflect.apply(receiver[prop], receiver, args);
                        };
                    }
                    var out = receiver._target[prop];
                    if (out === undefined && receiver.hasOwnProperty(prop)) out = receiver[prop];
                    if (out === undefined && prop === dataPropName) out = receiver._target;
                    return out;
                },
                set: function(receiver, prop, value) {
                    receiver._target[prop] = value;
                }
            });
        }

        if (!inject) return wrapper;

        if (typeof inject === 'function') inject(target, wrapper);
        if (typeof inject === 'string') Keypath.set(target, inject, wrapper);

        return wrapper;
    };


    Keypath.onError = console.error.bind(console);

    ///////////////////////////////////////////////////
    // PRIVATE METHODS
    ///////////////////////////////////////////////////
    Keypath._get = function(value) {
        return typeof value === 'function' ? value() : value;
    };

    Keypath._set = function(src, method, val) {
        if (typeof src[method] === 'function') return src[method].call(src, val);
        return src[method] = val;
    };

    ///////////////////////////////////////////////////
    // WRAPPER Internal Class
    ///////////////////////////////////////////////////
    /**
     * Wrapper Constructor
     * @param {Object} target Object to be wrapped
     */

    function Wrapper(target, prop) {
        prop = prop || 'target';
        this[prop] = this._target = target;
    }


    Wrapper.prototype.set = function(path, value) {
        return Keypath.set(this._target, path, value);
    };

    Wrapper.prototype.get = function(path, defaultValue) {
        return Keypath.get(this._target, path, defaultValue);
    };

    Wrapper.prototype.has = function(path) {
        return Keypath.has(this._target, path);
    };

    Keypath.Wrapper = Wrapper;

    return Keypath;
}));