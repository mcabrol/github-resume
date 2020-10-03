function search_api() {
	var x = $("#search").val();
	request_profile(x);
}


$( document ).ready(function() {

	console.log( "ready!" );
	textFit($(".logo"),  {widthOnly: true});
	request_profile("mcabrol");

});
