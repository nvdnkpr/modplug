/*!
 * %BUILD_NAME% %BUILD_VERSION% - Demo Plugin Module
 * http://larsjung.de/modplug
 *
 * provided under the terms of the MIT License
 */

(function ($) {
	'use strict';

	var module = {
			methods: {
				border: function (col) {

					return this.each(function () {

						$(this).css('border-color', col || $.color.random());
					});
				}
			}
		};

	$.color.modplug(module);

}(jQuery));
