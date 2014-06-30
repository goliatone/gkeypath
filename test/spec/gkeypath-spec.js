/*global define:true, describe:true , it:true , expect:true,
beforeEach:true, sinon:true, spyOn:true , expect:true */
/* jshint strict: false */
define(['keypath'], function(keypath) {

    describe('just checking', function() {

        it('Keypath should be loaded', function() {
            expect(keypath).toBeTruthy();
        });
    });
});