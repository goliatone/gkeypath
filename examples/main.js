/*global define:true requirejs:true*/
/* jshint strict: false */
requirejs.config({
    paths: {
        'keypath': 'keypath'
    }
});

define(['keypath'], function(Keypath) {
    console.log('Loading', Keypath);

    var user = {
        name: 'Peperone',
        age: 23,
        address: {
            street: 'Dekalb',
            zip: 1111
        },
        pet: {
            name: 'Maui'
        },
        car: {
            brand: {
                model: 'None'
            }
        }
    };

    Keypath.wrap(user, 'keypath');
    console.log(user.keypath.get('car.brand.model'));

    var userKeypath = Keypath.wrap(user);
    console.log(userKeypath.get('car.brand.model'));

    console.log(Keypath.get(user, 'car.brand.model'));


    window.Keypath = Keypath;
});