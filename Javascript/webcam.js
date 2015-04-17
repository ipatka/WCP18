$(document).ready(function() {

	var ip = window.location.hostname;
	
	$('.webcam_frame').attr('src','http://'+ip+':8080/fountain_stream.html'); 

});