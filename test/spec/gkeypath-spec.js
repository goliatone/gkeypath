/*global define:true, describe:true , it:true , expect:true,
beforeEach:true, sinon:true, spyOn:true , expect:true */
/* jshint strict: false */
define(['keypath'], function(Keypath) {

    describe('Keypath', function() {

        it('should be loaded', function() {
            expect(Keypath).toBeTruthy();
        });

        beforeEach(function() {

        });

        it('should have a set method', function() {
            expect(Keypath).toHaveMethods('set');
        });

        it('should have a get method', function() {
            expect(Keypath).toHaveMethods('get');
        });

        it('should have a has method', function() {
            expect(Keypath).toHaveMethods('has');
        });

        it('set should handle Keypaths', function() {
            var data = {},
                path = 'path.to.property',
                value = 'newValue';

            Keypath.set(data, path, value);
            expect(data.path.to.property).toEqual(value);
        });

        it('set should handle undefined targets', function() {
            var path = 'path.to.property',
                value = 'newValue';

            var data = Keypath.set(null, path, value);
            expect(data).toBeFalsy();
        });

        it('get should retrieve values using Keypaths', function() {
            var data = {
                path: {
                    to: {
                        property: 'newValue'
                    }
                }
            }, path = 'path.to.property',
                value = 'newValue';

            expect(Keypath.get(data, path)).toEqual(value);
        });

        it('get should return provided default value if path does not exist', function() {
            var data = {},
                path = 'path.to.property',
                defValue = 'newValue';

            expect(Keypath.get(data, path, defValue)).toEqual(defValue);
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

            expect(Keypath.has(data, path)).toBeTruthy();
            expect(Keypath.has(data, wrongPath)).toBeFalsy();
        });

        it('private method _get returns value from property or getter', function(){
            var expected = 'value',
                source = {
                    prop:expected,
                    getter:function(){
                        return expected;
                    }
                };
            expect(Keypath._get(source.prop)).toEqual(expected);
            expect(Keypath._get(source.getter)).toEqual(expected);
        });

        it('private method _set sets value to a property or getter', function(){
            var expected = false,
                source = {
                    prop:false,
                    setter:function(value){
                        expected = value;
                    }
                };
            Keypath._set(source, 'prop', true)
            expect(source.prop).toEqual(true);
            Keypath._set(source, 'setter', true)
            expect(expected).toEqual(true);
        });
    });
});