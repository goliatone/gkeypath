/*global define:true, describe:true , it:true , expect:true,
beforeEach:true, sinon:true, spyOn:true , expect:true */
/* jshint strict: false */
define(['keypath'], function(Keypath) {

    describe('Keypath', function(){
        it('should have a "wrap" method', function(){
            expect(Keypath).toHaveMethods(['wrap']);
        });

        it('"wrap" should provide a Wrapper instance', function(){
            var target = {};
            var wrapper = Keypath.wrap(target);
            expect(wrapper).toBeInstanceOf(Keypath.Wrapper);
        });

        it('"wrap" if provided with a keypath should inject wrapper instance using target', function(){
            var target = {};
            Keypath.wrap(target, 'path.to.instance');
            expect(target.path.to.instance).toBeInstanceOf(Keypath.Wrapper);
        });

        it('"wrap" if provided with an inject function it should get called', function(){
            var target = {};
            var callback = sinon.spy();

            var wrapper = Keypath.wrap(target, callback);
            callback.withArgs(target, wrapper);

            expect(callback).toHaveBeenCalledOnce();
            expect(callback.withArgs(target, wrapper)).toHaveBeenCalledOnce();
        });
    });

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