/* ModPlug minified */
(function(a){ModPlug=function(){var b=this;this.statics={};this.methods={};this.defaultStatic=undefined;this.defaultMethod=undefined;this.register=function(c){if(a[c]!==undefined){a.error("A plugin already exists on 'jQuery."+c+"'");return this}a[c]=function(){if(b.defaultStatic instanceof Function){var d=b.defaultStatic(arguments);if(d){if(b.statics[d] instanceof Function){return b.statics[d].apply(this,arguments)}a.error("Static method '"+d+"' does not exist on 'jQuery."+b.namespace+"'")}}return this};a.extend(a[c],this.statics);a[c].internal=this;a.fn[c]=function(d){if(b.methods[d] instanceof Function){return b.methods[d].apply(this,Array.prototype.slice.call(arguments,1))}if(b.defaultMethod instanceof Function){d=b.defaultMethod(arguments);if(b.methods[d] instanceof Function){return b.methods[d].apply(this,arguments)}}a.error("Method '"+d+"' does not exist on 'jQuery."+b.namespace+"'");return this}}};ModPlugModule=function(){this.statics={};this.methods={};this.register=function(c){if(!a[c]||!a[c].internal instanceof ModPlug){a.error("No ModPlug plugin exists on 'jQuery."+c+"'");return}var b=a[c].internal;a.extend(b.statics,this.statics);a.extend(b.methods,this.methods);a.extend(a[c],this.statics)}}})(jQuery);

( function( $ ) {

	var plugin = new ModPlug();

	plugin.statics = {

		front: function ( col ) {

			$( "html" ).css( "color", col || plugin.statics.random() );
			return this;
		},

		back: function ( col ) {

			$( "html" ).css( "background-color", col || plugin.statics.random() );
			return this;
		},

		random: function () {
			
			return "hsl(" + Math.floor( Math.random() * 360 ) + ",95%,75%)";
		}
	};

	plugin.methods = {

		front: function ( col ) {

			return this.each( function () {

				$( this ).css( "color", col || plugin.statics.random() );
			} );
		},

		back: function ( col ) {

			return this.each( function () {

				$( this ).css( "background-color", col || plugin.statics.random() );
			} );
		}
	};

	plugin.defaultStatic = function () {

		return "random";
	};

	plugin.defaultMethod = function () {

		return "back";
	};

	plugin.register( "color" );

} )( jQuery );