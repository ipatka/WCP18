$(document).ready(function(){

	$(document).on("click",".valve_button", function() {
		console.log(this.id);

		$(this).toggleClass("valve_selected");

	});

	$(document).on("click","#add_more_rows", function() {
		console.log("add_more_rows");

	});


	$(document).on("click","#submit", function() {
		console.log("submit");
		var object_to_post = create_sequence_object();

		//post the object to /Controller/sequence_manager.php
	});



function create_sequence_object() {
	console.log("creating sequence object");

	var sequence_object = {};

	$(".row").each(function(i) {

		$(".valve_button").each(function() {
			if ($(this).hasClass("valve_selected")) {
				var row = $(this).closest('tr').attr('id');
				console.log(row);
				console.log(this.id);

				//insert into the sequence_object the row id, an array of on/off and the frame length

			};
		});
	});

	return sequence_object;



}


});//done ready