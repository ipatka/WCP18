$(document).ready(function(){

	$(".valve_button").click(function () {
		console.log(this.id);

		$(this).toggleClass("valve_selected");

	});

	$("#add_more_rows").click(function() {
		console.log("add_more_rows");

	});


});//done ready