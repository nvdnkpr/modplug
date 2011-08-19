/*
 * ModPlug 0.2
 * http://larsjung.de/modplug
 * 
 * provided under the terms of the MIT License
 */

( function( $ ) {

	ModPlug = function ( options ) {

		var defaults = {
				namespace: undefined,
				statics: {},
				methods: {},
				defaultStatic: undefined,
				defaultMethod: undefined
			},
			settings = $.extend( {}, defaults, options );

		if ( settings.namespace === undefined || $[settings.namespace] !== undefined || $.fn[settings.namespace] !== undefined ) {
			$.error( "A plugin already exists on 'jQuery." + settings.namespace + "'" );
			return;
		};


		var statics = {},
			methods = {},
			staticPlug = function () {

				var method = undefined;
				if ( settings.defaultStatic instanceof Function ) {
					method = settings.defaultStatic( arguments );
					if ( statics[method] instanceof Function ) {
						return statics[method].apply( this, arguments );
					};
				};
				$.error( "Static method '" + method + "' does not exist on 'jQuery." + settings.namespace + "'" );
				return this;
			},
			methodPlug = function ( method ) {

				if ( methods[method] instanceof Function ) {
					return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ) );
				};
				if ( settings.defaultMethod instanceof Function ) {
					method = settings.defaultMethod( arguments );
					if ( methods[method] instanceof Function ) {
						return methods[method].apply( this, arguments );
					};
				};
				$.error( "Method '" + method + "' does not exist on 'jQuery." + settings.namespace + "'" );
				return this;
			};


		this.addStatics = function ( newStatics ) {
			
			$.extend( statics, newStatics );
			$.extend( staticPlug, newStatics );
			staticPlug.internal = this;
			return this;
		};

		this.addMethods = function ( newMethods ) {

			$.extend( methods, newMethods );
			return this;
		};


		this.addStatics( settings.statics ).addMethods( settings.methods );
		$[settings.namespace] = staticPlug;
		$.fn[settings.namespace] = methodPlug;
	};


	ModPlugModule = function () {

		var defaults = {
				namespace: undefined,
				statics: {},
				methods: {}
			},
			settings = $.extend( {}, defaults, options );

		if ( !$[settings.namespace] || !$[settings.namespace].internal instanceof ModPlug ) {
			$.error( "No ModPlug plugin exists on 'jQuery." + settings.namespace + "'" );
			return;
		};

		$[settings.namespace].internal.addStatics( settings.statics ).addMethods( settings.methods );
	};

} )( jQuery );
