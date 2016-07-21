var Keypath = require('..');
var config = {bar:{baz:'fiz'}};

config = Keypath.wrap(config);

console.log(config.bar.baz) //fiz
console.log(config.has('bar.baz'));
console.log(config.get('bar.baz'));
console.log(config.get('bar.boooo', 'jejeje'));
