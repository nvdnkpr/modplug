/*
 * ModPlug %BUILD_VERSION% - Demo Plugin
 * http://larsjung.de/modplug
 *
 * provided under the terms of the MIT License
 */


// @include "../../modplug-%BUILD_VERSION%.js"


/*
 * Demo Plugin 'jQuery.color' starts here
 */

(function ($) {
    "use strict";

    var plugin = {
            statics: {
                front: function (col) {

                    $("html").css("color", col || plugin.statics.random());
                },
                back: function (col) {

                    $("html").css("background-color", col || plugin.statics.random());
                },
                random: function () {

                    return "hsl(" + Math.floor(Math.random() * 360) + ",95%,75%)";
                }
            },
            methods: {
                front: function (col) {

                    return this.each(function () {

                        $(this).css("color", col || plugin.statics.random());
                    });
                },
                back: function (col) {

                    return this.each(function () {

                        $(this).css("background-color", col || plugin.statics.random());
                    });
                }
            },
            defaultStatic: function () {

                return "random";
            },
            defaultMethod: function () {

                return "back";
            }
        };

    $.ModPlug.plugin("color", plugin);

}(jQuery));
