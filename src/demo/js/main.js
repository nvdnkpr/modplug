( function( $ ) {
	
	$( function () {

		$( "div" ).mousedown( function ( event ) {

			event.stopPropagation();
			event.preventDefault();
			$( this ).color();
		} );
	} );


} )( jQuery );