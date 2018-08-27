var Keypath = require('..');

function noop(){
  console.log('HERE WE ARE AGAIN');
  return 'kaka';
}

var config = {
    '2928b3f4-8b8f-415f-bd80-263e299df658': noop,
    bar:{
        baz:'fiz',
        test: function(){
            return 'test';
        }
    }
};

config = Keypath.wrap(config, undefined, 'data');

/*console.log(config.bar.baz) //fiz
console.log(config.has('bar.baz'));
console.log(config.get('bar.baz'));
console.log(config.get('bar.boooo', 'jejeje'));
console.log(config.bar.test());
console.log(config.data);
*/

console.log(Keypath.get(config, '2928b3f4-8b8f-415f-bd80-263e299df658'));
console.log(config.get('2928b3f4-8b8f-415f-bd80-263e299df658'));
