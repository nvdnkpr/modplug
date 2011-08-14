/*
 * ModPlug %BUILD_VERSION%
 * http://larsjung.de/modplug
 * 
 * provided under the terms of the MIT License
 */

( function( $ ) {

	ModPlug = function () {

		var MODPLUG = this;

		this.statics = {};
		this.methods = {};
		this.defaultStatic = undefined;
		this.defaultMethod = undefined;

		this.register = function ( namespace ) {
			
			if ( $[namespace] !== undefined ) {
				$.error( "A plugin already exists on 'jQuery." + namespace + "'" );
				return this;
			};

			$[namespace] = function () {

				if ( MODPLUG.defaultStatic instanceof Function ) {
					var method = MODPLUG.defaultStatic( arguments );
					if ( method ) {
						if ( MODPLUG.statics[method] instanceof Function ) {
							return MODPLUG.statics[method].apply( this, arguments );
						};
						$.error( "Static method '" +  method + "' does not exist on 'jQuery." + MODPLUG.namespace + "'" );
					};
				};
				return this;
			};
			$.extend( $[namespace], this.statics );

			$[namespace].internal = this;

			$.fn[namespace] = function( method ) {

				if ( MODPLUG.methods[method] instanceof Function ) {
					return MODPLUG.methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ) );
				};
				if ( MODPLUG.defaultMethod instanceof Function ) {
					method = MODPLUG.defaultMethod( arguments );
					if ( MODPLUG.methods[method] instanceof Function ) {
						return MODPLUG.methods[method].apply( this, arguments );
					};
				};
				$.error( "Method '" +  method + "' does not exist on 'jQuery." + MODPLUG.namespace + "'" );
				return this;
			};
		};
	};


	ModPlugModule = function () {

		this.statics = {};
		this.methods = {};

		this.register = function ( namespace ) {

			if ( !$[namespace] || !$[namespace].internal instanceof ModPlug ) {
				$.error( "No ModPlug plugin exists on 'jQuery." + namespace + "'" );
				return;
			}

			var modPlug = $[namespace].internal;
			$.extend( modPlug.statics, this.statics );
			$.extend( modPlug.methods, this.methods );
			$.extend( $[namespace], this.statics );
		};
	};

} )( jQuery );
