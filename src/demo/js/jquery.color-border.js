/*
 * ModPlug %BUILD_VERSION% - Demo Plugin Module
 * http://larsjung.de/modplug
 *
 * provided under the terms of the MIT License
 */


/*
 * Demo Plugin Module 'jQuery.color-border' starts here
 */
/*globals jQuery */
(function ($) {
    "use strict";

    var module = {
            methods: {
                border: function (col) {

                    return this.each(function () {

                        $(this).css("border-color", col || $.color.random());
                    });
                }
            }
        };

    $.ModPlug.module("color", module);

}(jQuery));
