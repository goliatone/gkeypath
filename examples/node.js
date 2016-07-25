var Keypath = require('..');
var config = {
    bar:{
        baz:'fiz'
    }
};

config = Keypath.wrap(config);

console.log(config.bar.baz); //fiz
console.log(config.has('bar.baz'));
console.log(config.get('bar.baz'));
console.log(config.get('bar.boooo', 'jejeje'));


console.log('wrapping', config.bar.get('baz'));
console.log('nested wrapping', config.get('bar').get('baz'));
