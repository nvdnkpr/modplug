/*
 * ModPlug 0.3
 * http://larsjung.de/modplug
 * 
 * provided under the terms of the MIT License
 */

( function( $ ) {

	var Plugin = function ( namespace, options ) {

		if ( !namespace ) {
			$.error( "No namespace specified." );
			return;
		} else if ( $[namespace] || $.fn[namespace] ) {
			$.error( "A plugin already exists on 'jQuery." + namespace + "'" );
			return;
		};


		var defaults = {
				statics: {},
				methods: {},
				defaultStatic: undefined,
				defaultMethod: undefined
			},
			settings = $.extend( {}, defaults, options ),
			staticPlug = function () {

				var args, defaultMethod;

				args = Array.prototype.slice.call( arguments );
				defaultMethod = settings.defaultStatic instanceof Function ? settings.defaultStatic.apply( this, args ) : settings.defaultStatic;
				if ( staticPlug[defaultMethod] instanceof Function ) {
					return staticPlug[defaultMethod].apply( this, args );
				}
				$.error( "Static method defaulted to '" + defaultMethod + "' does not exist on 'jQuery." + namespace + "'" );
			},
			methods = {},
			methodPlug = function ( method ) {

				var args, defaultMethod;

				if ( methods[method] instanceof Function ) {
					args = Array.prototype.slice.call( arguments, 1 );
					return methods[method].apply( this, args );
				}
				
				args = Array.prototype.slice.call( arguments );
				defaultMethod = settings.defaultMethod instanceof Function ? settings.defaultMethod.apply( this, args ) : settings.defaultMethod;
				if ( methods[defaultMethod] instanceof Function ) {
					return methods[defaultMethod].apply( this, args );
				}
				$.error( "Method '" + method + "' defaulted to '" + defaultMethod + "' does not exist on 'jQuery." + namespace + "'" );
			};


		this.addStatics = function ( newStatics ) {
			
			$.extend( staticPlug, newStatics );
			staticPlug._modplug = this;
			return this;
		};

		this.addMethods = function ( newMethods ) {

			$.extend( methods, newMethods );
			return this;
		};


		this.addStatics( settings.statics ).addMethods( settings.methods );
		$[namespace] = staticPlug;
		$.fn[namespace] = methodPlug;
	};


	$.ModPlug = $.ModPlug || {
		plugin: function ( namespace, options ) {

			new Plugin( namespace, options );
		},
		module: function ( namespace, options ) {

			if ( !$[namespace] || !$[namespace]._modplug instanceof Plugin ) {
				$.error( "No ModPlug plugin exists on 'jQuery." + namespace + "'" );
				return;
			};

			var defaults = { statics: {}, methods: {} },
				settings = $.extend( {}, defaults, options );

			$[namespace]._modplug.addStatics( settings.statics ).addMethods( settings.methods );
		}
	};

} )( jQuery );
