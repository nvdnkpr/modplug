/*!
 * Tests for %BUILD_NAME% %BUILD_VERSION%
 * http://larsjung.de/modplug
 *
 * provided under the terms of the MIT License
 */

(function ($, $$, modplug) {
	'use strict';

	$$.test('modplug', function () {

		$$.ok(modplug instanceof Function, 'modplug accessible and of type Function');
	});

	$$.test('namespace', function () {

		var ns0 = 'namespace0000',
			ns1 = 'namespace1111',
			ns2 = 'namespace2222',
			dummyStatics = {a: 0},
			dummyMethods = {b: 1};

		$[ns1] = dummyStatics;
		$.fn[ns1] = dummyMethods;

		$$.strictEqual(modplug(ns0), undefined, 'add new plugin');
		$$.ok($[ns0].modplug !== undefined, 'modplug registerd');
		$$.ok($[ns0].modplug.prev !== undefined, 'modplug.prev registerd');
		$$.strictEqual($[ns0].modplug.prev.statics, undefined, 'modplug.prevs.statics is undefined');
		$$.strictEqual($[ns0].modplug.prev.methods, undefined, 'modplug.prevs.methods is undefined');
		$$.strictEqual(modplug(ns1), undefined, 'add plugin to a already taken namespace');
		$$.strictEqual($[ns1].modplug.prev.statics, dummyStatics, 'modplug.prevs.statics is undefined');
		$$.strictEqual($[ns1].modplug.prev.methods, dummyMethods, 'modplug.prevs.methods is undefined');
	});

	$$.test('statics and methods', function () {

		var ns = 'test',
			val0 = 'val0',
			options = {
				statics: {
					staticMethod0: function () {
						return val0;
					}
				},
				methods: {
					method0: function () {
						return this;
					}
				}
			},
			$empty = $();

		$$.strictEqual(modplug(ns, options), undefined, 'add new plugin');

		$$.ok($[ns] instanceof Function, 'static namespace accessible');
		$$.strictEqual($[ns], $.test, 'static accessible via dot syntax');
		$$.ok($empty[ns] instanceof Function, 'namespace accessible');
		$$.strictEqual($empty[ns], $empty.test, 'namespace accessible via dot syntax');

		$$.ok($[ns].staticMethod0 instanceof Function, 'static method accessible');
		$$.strictEqual($[ns].staticMethod0(), val0, 'static method executable');

		$$.ok($empty[ns].method0 instanceof Function, 'method accessible');
		$$.strictEqual($empty[ns]('method0'), $empty, 'method executable');
	});

}(jQuery, QUnit, modplug));
