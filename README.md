# KeyPath

[![Build Status](https://secure.travis-ci.org/goliatone/gkeypath.png)](http://travis-ci.org/goliatone/gkeypath)

Helper library to get/set keypaths on any object.

## Documentation

`KeyPath` is defined as a [requirejs][1] module. 

It can  be imported as a `npm` package to be used in Node.js applications:

```
$ npm i gkeypath
```

## Examples

```js
let foo = { bar: { baz: 'fiz',  buzs: ['fizbuz']} };

console.log(KeyPath.get(foo, 'bar.baz')); //fiz
console.log(foo.path.get('bar.bar')); //undefined
console.log(foo.path.get('bar.baz.buzs[0]')); //fizbuz
console.log(foo.path.get('bar.bar', 'fuz')); //fuz
```

#### Wrapping

You can wrap your object to get a `get` and `set` functions to access values.

The wrap function has different signatures.

```js
let foo = { bar: { baz: 'fiz',  buzs: ['fizbuz']} };

KeyPath.wrap(foo, '$path');

console.log(foo.$path.get('bar.baz')); //fiz
console.log(foo.$path.get('bar.bar')); //undefined
console.log(foo.$path.get('bar.baz.buzs[0]')); //fizbuz
console.log(foo.$path.get('bar.bar', 'fuz')); //fuz
```

```js
let foo = { bar: { baz: 'fiz' } };

KeyPath.wrap(foo, (target, wrapper) => {
    ...
});
```

##### Proxy

The wrapped object will be wrapped in an ES6 Proxy object, in which case you can access properties using dot notation instead of having to use the `get`/`set` functions.

```js
let config = { bar: { baz: 'fiz' } };

config = KeyPath.wrap(config);

console.log(config.bar.baz) //fiz
```

## Getting Started

Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/emiliano/gkeypath/master/dist/gkeypath.min.js
[max]: https://raw.github.com/emiliano/gkeypath/master/dist/gkeypath.js

## Development

`npm install && bower install`

If you need to `sudo` the `npm` command, you can try to:

```terminal
sudo chown $(whoami) ~/.npm
sudo chown $(whoami) /usr/local/share/npm/bin
sudo chown -R $(whoami) /usr/local/lib/node_modules
```


If you bump versions, remember to update:
- package.json
- bower.json
- component.json
- etc.


## Bower

>Bower is a package manager for the web. It offers a generic, unopinionated solution to the problem of front-end package management, while exposing the package dependency model via an API that can be consumed by a more opinionated build stack. There are no system wide dependencies, no dependencies are shared between different apps, and the dependency tree is flat.

To register gkeypath in the [bower](http://bower.io/) [registry](http://sindresorhus.com/bower-components/):
`bower register gkeypath git://github.com/goliatone/gkeypath.git`

Then, make sure to tag your module:

`git tag -a v0.1.0 -m "Initial release."`

And push it:

`git push --tags`


## Travis

In order to enable Travis for this specific project, you need to do so on your Travi's [profile](https://travis-ci.org/profile). Look for the entry `goliatone/gkeypath`, activate, and sync.

## Release History
_(Nothing yet)_


[1]: http://requirejs.org
