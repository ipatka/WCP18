$(document).ready(function(){

	$(".valve_button").click(function () {
		console.log(this.id);

		$(this).toggleClass("valve_selected");

	});


});//done ready