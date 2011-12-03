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
            ns2 = 'namespace2222';

        $[ns1] = {};
        $.fn[ns2] = {};

        $$.strictEqual(modplug(ns0), undefined, 'add new plugin');
        $$.strictEqual(modplug(), 1, 'no namespace is specified');
        $$.strictEqual(modplug(ns0), 1, 'namespace is already in use');
        $$.strictEqual(modplug(ns1), 1, 'static namespace not available');
        $$.strictEqual(modplug(ns2), 1, 'namespace not available');
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

        $$.ok($[ns] === undefined, 'static namespace available');
        $$.ok($empty[ns] === undefined, 'namespace available');

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
