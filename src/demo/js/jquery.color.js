/*
 * %BUILD_NAME% %BUILD_VERSION% - Demo Plugin
 * http://larsjung.de/modplug
 *
 * provided under the terms of the MIT License
 */

(function ($) {
    'use strict';

    // @include '../../%BUILD_NAME%-%BUILD_VERSION%.min.js'

    /* Demo Plugin 'jQuery.color' starts here */
    var plugin = {
            statics: {
                front: function (col) {

                    $('html').css('color', col || plugin.statics.random());
                },
                back: function (col) {

                    $('html').css('background-color', col || plugin.statics.random());
                },
                random: function () {

                    return 'hsl(' + Math.floor(Math.random() * 6) * 60 + ',85%,65%)';
                }
            },
            methods: {
                front: function (col) {

                    return this.each(function () {

                        $(this).css('color', col || plugin.statics.random());
                    });
                },
                back: function (col) {

                    return this.each(function () {

                        $(this).css('background-color', col || plugin.statics.random());
                    });
                }
            },
            defaultStatic: 'random',
            defaultMethod: 'back'
        };

    modplug('color', plugin);

}(jQuery));
