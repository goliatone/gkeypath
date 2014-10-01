/*global define:true requirejs:true*/
/* jshint strict: false */
requirejs.config({
    paths: {
        'keypath': 'keypath'
    }
});

define(['keypath'], function(Keypath) {
    console.log('Loading', Keypath);

    function makeUser(){
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
                    model: 'AModel'
                }
            }
        };
        return user;
    }

    var user = makeUser();
    Keypath.wrap(user, 'keypath');
    console.log(user.keypath.get('car.brand.model'));

    user = makeUser();
    var userKeypath = Keypath.wrap(user);
    console.log(userKeypath.get('car.brand.model'));
    console.log(Keypath.get(user, 'car.brand.model'));

    var inject = function(target, wrapper){
        target._k = wrapper;
    };

    user = makeUser();
    Keypath.wrap(user, inject);

    console.log(user._k.get('car.brand.model'));


    window.Keypath = Keypath;
});