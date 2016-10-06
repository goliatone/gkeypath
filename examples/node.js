var Keypath = require('..');
var config = {
    bar:{
        baz:'fiz',
        test: function(){
            return 'test';
        }
    }
};

config = Keypath.wrap(config, undefined, 'data');

console.log(config.bar.baz) //fiz
console.log(config.has('bar.baz'));
console.log(config.get('bar.baz'));
console.log(config.get('bar.boooo', 'jejeje'));
console.log(config.bar.test());
console.log(config.data);
