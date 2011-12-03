/* %BUILD_NAME% %BUILD_VERSION% - http://larsjung.de/modplug - MIT License */

/*jslint confusion: true, white: true */
/*jshint confusion: true, white: false */
/*global jQuery */

var modplug = (function ($) {
    'use strict';

    /*
     * return code
     *   undefined: ok
     *   1: no namespace specified or namespace not available
     */
    return function (namespace, options) {

        // check if namespace is specified and available
        if (!namespace || $[namespace] || $.fn[namespace]) {
            return 1;
        }

        var extend = $.extend,
            slice = Array.prototype.slice,
            settings = extend({}, options),

            // checks if argument fn is a function
            isFn = function (fn) {

                return fn instanceof Function;
            },

            findMethod = function (obj, args, defaultMethod, methods) {

                var method = isFn(defaultMethod) ? defaultMethod.apply(obj, args) : defaultMethod;

                if (isFn(methods[method])) {
                    return methods[method].apply(obj, args);
                }
                $.error('Method "' + method + '" does not exist on jQuery.' + namespace);
            },

            // this function gets exposed as '$.<namespace>()'
            statics = function () {

                return findMethod(this, slice.call(arguments), settings.defaultStatic, statics);
            },

            // this function gets exposed as '$(selector).<namespace>()'
            methods = function (method) {

                if (isFn(methods[method])) {
                    return methods[method].apply(this, slice.call(arguments, 1));
                }

                return findMethod(this, slice.call(arguments), settings.defaultMethod, methods);
            },

            // add/overwrite plugin methods
            // this method gets also exposed as '$.<namespace>.modplug' to make the plugin extendable
            plug = function (options) {

                if (options) {
                    extend(statics, options.statics);
                    extend(methods, options.methods);
                }

                // make sure that '$.<namespace>.modplug' points to this function after adding new methods
                statics.modplug = plug;
            };

        // init the plugin
        plug(options);
        $[namespace] = statics;
        $.fn[namespace] = methods;
    };

}(jQuery));
