/*global define:true, describe:true , it:true , expect:true,
beforeEach:true, sinon:true, spyOn:true , expect:true */
/* jshint strict: false */
define(['keypath'], function(Keypath) {

    describe('Keypath.Wrapper', function() {

        var Wrapper = Keypath.Wrapper;
        var proxy;
        beforeEach(function() {

        });

        it('should wrap a target', function(){
            var spy = sinon.spy();
            var wrapper = new Wrapper(spy);
            expect(wrapper.target).toMatchObject(spy);
        });

        it('should have methods', function(){
            expect(Wrapper.prototype).toHaveMethods(['has', 'get', 'set']);
        });

        it('should forward "set" method to Keypath with target', function(){
            var target = {};
            var expected = 'Value1';
            var wrapper = new Wrapper(target);
            proxy = sinon.spy(Keypath, 'set');
            proxy.withArgs(target, 'property', expected);
            wrapper.set('property', expected);
            expect(target.property).toEqual(expected);
            expect(proxy.withArgs(target, 'property', expected)).toHaveBeenCalledOnce();
            proxy.reset();
        });

        it('should forward "get" method to Keypath with target', function(){
            var expected = 'Value1';
            var target = {property:expected};
            var wrapper = new Wrapper(target);
            proxy = sinon.spy(Keypath, 'get');
            proxy.withArgs(target, 'property');
            expect(wrapper.get('property')).toEqual(expected);
            expect(proxy.withArgs(target, 'property')).toHaveBeenCalledOnce();
            proxy.reset();
        });

        it('should forward "has" method to Keypath with target', function(){
            var expected = 'Value1';
            var target = {property:expected};

            var wrapper = new Wrapper(target);

            proxy = sinon.spy(Keypath, 'has');
            proxy.withArgs(target, 'property');

            expect(wrapper.has('property')).toEqual(true);
            expect(proxy.withArgs(target, 'property')).toHaveBeenCalledOnce();

            proxy.reset();
        });
    });
});