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


		$("#live_feed").click(function(){
			swal("Webcam Disconnected","Please reconnect the webcam","warning")
		})

		$("#BU_logo").click(function(){
			swal({   title: "You clicked a kitty!",   text: "Here's Vivan.",   imageUrl: "../Images/Vivian.jpg" });
		})

		$("#team_info").click(function(){
			swal({   title: "Who are we?",   text: "WCP18!",   imageUrl: "../Images/wcp18_team.png" });
		})


});//done ready