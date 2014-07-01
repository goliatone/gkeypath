/*global define:true, describe:true , it:true , expect:true,
beforeEach:true, sinon:true, spyOn:true , expect:true */
/* jshint strict: false */
define(['keypath'], function(keypath) {

    describe('just checking', function() {

        it('keypath should be loaded', function() {
            expect(keypath).toBeTruthy();
        });

        beforeEach(function() {

        });

        it('should have a set method', function() {
            expect(keypath).toHaveMethods('set');
        });

        it('should have a get method', function() {
            expect(keypath).toHaveMethods('get');
        });

        it('should have a has method', function() {
            expect(keypath).toHaveMethods('has');
        });

        it('set should handle keypaths', function() {
            var data = {},
                path = 'path.to.property',
                value = 'newValue';

            keypath.set(data, path, value);
            expect(data.path.to.property).toEqual(value);
        });

        it('set should handle undefined targets', function() {
            var path = 'path.to.property',
                value = 'newValue';

            var data = keypath.set(null, path, value);
            expect(data).toBeFalsy();
        });

        it('get should retrieve values using keypaths', function() {
            var data = {
                path: {
                    to: {
                        property: 'newValue'
                    }
                }
            }, path = 'path.to.property',
                value = 'newValue';

            expect(keypath.get(data, path)).toEqual(value);
        });

        it('get should return provided default value if path does not exist', function() {
            var data = {},
                path = 'path.to.property',
                defValue = 'newValue';

            expect(keypath.get(data, path, defValue)).toEqual(defValue);
        });

        it('has should return boolean value indicating if target has path', function() {
            var data = {
                path: {
                    to: {
                        property: 'newValue'
                    }
                }
            }, path = 'path.to.property',
                wrongPath = 'made.up.path.here',
                value = 'newValue';

            expect(keypath.has(data, path)).toBeTruthy();
            expect(keypath.has(data, wrongPath)).toBeFalsy();
        });
    });
});