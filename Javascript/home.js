$(document).ready(function(){

		var sequence_selected = false;
		var selected_sequence;

		var last_selected;
		$(".sequence").click(function() {

			console.log("clicked");

			last_selected = selected_sequence;

			selected_sequence = this.id;



			if (last_selected != selected_sequence) {
				console.log("new selected");

				$(this).toggleClass("selected");
				$("#"+last_selected).removeClass("selected");
				sequence_selected = true;
				console.log(selected_sequence);
			}
			else{
				$(this).toggleClass("selected");
				sequence_selected = false;
				console.log("same selected");


			}

			
			


		});

		$("#add_to_queue").click(function() {
			swal("Warning!", "Select a valid sequence!", "warning")	
		});


});//done ready