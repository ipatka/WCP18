$(document).ready(function(){
		
		
		//var ip = InetAddress.getLocalHost();
		console.log(window.location.hostname);
		//console.log(window.location.host);
		var ip = window.location.hostname;
		//$('#live_feed').attr('href','http://'+ip+':8080/fountain_stream.html');

		$('.queue_sequence').first().addClass('selected');
		$('.queue_sequence').first().children('.inline_icon').show();

		$('.queue_sequence').mouseenter(function() {
			$(this).children('.inline_button').show();
		});

		$('.queue_sequence').mouseleave(function() {
			$(this).children('.inline_button').hide();
		});

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
				selected_sequence = null;


			}

			
			


		});

		$(document).on('click','#add_to_queue',function() {
			// var sequence_name = $('.selected');
			console.log(selected_sequence);
			if (selected_sequence) {
				$('#'+selected_sequence).removeClass('selected');
				//swal('Success!', 'Now sit back and watch your creation in action', 'Success');			
				// $.post('../Controller/sequence_manager.php', {execute_from_home: selected_sequence}).done(function(data) {
				// 	//console.log('returned '+data);
				// });

				$.post('../Controller/sequence_manager.php', {
					add_to_queue: selected_sequence,
					loop: 'false'
				}).done(function(data) {
					console.log('returned '+data);
					window.location.href = '/';
				});				
			} else {
				swal('Oops...', 'Please select a sequence to add to the queue', 'error');
			}


		});

		$(document).on('click','#loop',function() {
			// var sequence_name = $('.selected');
			console.log(selected_sequence);
			if (selected_sequence) {
				$('#'+selected_sequence).removeClass('selected');
				//swal('Success!', 'Now sit back and watch your creation in action', 'Success');			
				// $.post('../Controller/sequence_manager.php', {execute_from_home: selected_sequence}).done(function(data) {
				// 	//console.log('returned '+data);
				// });

				$.post('../Controller/sequence_manager.php', {
					add_to_queue: selected_sequence,
					loop: 'true'
				}).done(function(data) {
					console.log('returned '+data);
					window.location.href = '/';
				});				
			} else {
				swal('Oops...', 'Please select a sequence to add to loop', 'error');
			}


		});

		$(document).on('click','#skip',function() {
				var sequence_to_cancel = $(event.target).parents('.queue_sequence').attr('id');
				//swal('Success!', 'Now sit back and watch your creation in action', 'Success');			
				// $.post('../Controller/sequence_manager.php', {execute_from_home: selected_sequence}).done(function(data) {
				// 	//console.log('returned '+data);
				// });

				$.post('../Controller/sequence_manager.php', {
					skip: 'true',
					sequence: sequence_to_cancel 
				}).done(function(data) {
					console.log('returned '+data);
					window.location.href = '/';
				});				


		});

		$(document).on('click','#clear_queue',function() {
				$.post('../Controller/sequence_manager.php', {
					clear_queue: 'Nozzle1'
				}).done(function(data) {
					console.log('returned '+data);
					window.location.href = '/';
				});			
		});


		//$("#live_feed").click(function(){
		//	swal("Webcam Disconnected","Please reconnect the webcam","warning")
		//})

		$("#BU_logo").click(function(){
			//swal({   title: "You clicked a kitty!",   text: "Here's Vivan.",   imageUrl: "../Images/Vivian.jpg" });
		})

		$("#team_info").click(function(){
			//swal({   title: "Who are we?",   text: "WCP18!",   imageUrl: "../Images/wcp18_team.png" });
		})


});//done ready
