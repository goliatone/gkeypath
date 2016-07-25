var Keypath = require('..');
var config = {
    db:{
        connection:{
            host: 'locahost',
            port: 9090,
            user: 'goliatone',
            auth: 'admin'
        }
    },
    amqp:{
        client:{
            url: 'amqp://localhost:5432/aladflad/'
        }
    }
};

config = Keypath.wrap(config);

console.log('Something here... %s', config.amqp); //amqp://localhost:5432/aladflad/
// console.log(config.amqp.client); //amqp://localhost:5432/aladflad/
// console.log(config.amqp.client.url); //amqp://localhost:5432/aladflad/
//
//
// console.log(config.has('amqp.client.url')); //true
// console.log(config.get('amqp.client.url')); //amqp://localhost:5432/aladflad/
// console.log(config.get('amqp.exchange', 'default-exchange')); //default-exchange
//
//
// console.log('wrapping', config.db.get('connection').host);
// console.log('nested wrapping', config.get('db').get('connection.host'));
// console.log('nested wrapping', config.get('db').get('connection').get('host'));





// console.log('= wrapping', config.db.get('connection').host);
// console.log(config.get('bar').get('baz'));
