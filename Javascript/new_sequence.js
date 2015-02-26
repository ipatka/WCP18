$(document).ready(function(){

	$(document).on("click",".valve_button", function() {
		console.log(this.id);

		$(this).toggleClass("valve_selected");

	});



	$(document).on("click","#add_more_rows", function() {
		console.log("add_more_rows");
		var row_template = getNextRow();
		$('tr:last').after(row_template);
	});


	$(document).on("click","#submit", function() {
		if ($("#sequence_name").val()) {
			var sequence_name = $("#sequence_name").val();
			var num_rows = $( "tr:last" ).data('count');
			var object_to_post = create_sequence_object(num_rows);
		swal('Submitted!', 'Now sit back and watch your creation in action!', 'success');
		$.post('/Controller/sequence_manager.php',{
		 	sequence_post: object_to_post
		 },
		 function(data) {
		 		console.log("posted. here's the data returned: "+data);
		 	});

			$.ajax
			({
				type: "POST",
				dataType : 'json',
				url: '/Controller/save_sequence_to_file.php',
				data: { data: JSON.stringify(object_to_post), file_name: sequence_name },
				success: function () {
					swal('Good', 'Good things', 'success');
					window.location.href = "/"; },
				error: function() {swal("Crap", "Something Bad Happened", "error");}
			});
		} else {
			swal('Hey!', 'Please name your sequence', 'error');
		}

		//post the object to /Controller/sequence_manager.php
	});


	$(document).on('click', '#preview', function() {
		$('.preview_content').show();
		var num_rows = $( "tr:last" ).data('count');
		var object_to_preview = create_sequence_object(num_rows);
		console.log(object_to_preview);
		preview_sequence(object_to_preview);
	});





function create_sequence_object(num_rows) {

	var rows = num_rows;
	var new_sequence = createArray(rows,9);
	// sequence_object.new_sequence[8][6] = 6;
	//console.log("array "+sequence_object.new_sequence);

	$(".row").each(function(i) {

		$(this).find(".valve_button").each(function(j) {
			//initialize the array
			if ($(this).hasClass("valve_selected")) {
				var row = $(this).closest('.row').attr('id');
				console.log(row);
				console.log(this.id);
				new_sequence[i][j] = 1;

				//insert 'on' into the array

			}
			else{
				//insert 'off' into the array
				new_sequence[i][j] = 0;
			}
			// frame length
			var length = $(this).parents('.row').find('.frame_length').val();
			new_sequence[i][8] = length;


		});
	});

	console.log(new_sequence);

	return new_sequence;



}

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}


function getNextRow() {
	//var template = $('<tr class="row"> <td class="row_label body"></td><td> <div class="valve_button"></div></td><td> <div class="valve_button"></div></td><td> <div class="valve_button"></div></td><td> <div class="valve_button"></div></td><td> <div class="valve_button"></div></td><td> <div class="valve_button"></div></td><td> <div class="valve_button"></div></td><td> <div class="valve_button"></div></td><td class="row_label"> <select class="frame_length"> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> <option value="5">5</option> <option value="6">6</option> <option value="7">7</option> <option value="8">8</option> <option value="9">9</option> <option value="10">10</option> <option value="0">X</option> </select> </td></tr>');
	var template = $('tr:last').clone();
	$(template.find('.valve_button')).each(function() {
		if ($(this).hasClass('valve_selected')) {
			$(this).removeClass('valve_selected');
		}
	})
	var rows = $( "tr:last" ).data('count');
	var next_row_number = rows + 1;

	template.data('count',next_row_number);
	template.find('.body').text('frame '+next_row_number);
	return template;
}


function preview_sequence(sequence) {
	var num_rows = $( "tr:last" ).data('count');
	console.log('num rows '+num_rows);

   var i = 0;
   var delay_time = sequence[i][8];
   animate_frame(sequence[i]);
   i++;
   next();
    function next() {
    	console.log('execute next');
        setTimeout(function() {
        	
            if (i == num_rows) {
            	clear_frame();
            	$('.preview_content').hide(300);
                return;
            }
            delay_time = sequence[i][8];
            animate_frame(sequence[i]);
            i++;
            next();
        }, delay_time * 1000);

    }

}

function animate_frame(frame) {
	console.log('frame '+frame);
	for (var j = 0; j < 8; j++) {
		console.log('nozzle '+frame[j]);
		if (frame[j] == 1) {
			$('#valve_'+(j+1)).find('.preview_overlay').show("slide", { direction: "down" }, 150);
		} else if (frame[j] == 0) {
			$('#valve_'+(j+1)).find('.preview_overlay:visible').hide("slide", { direction: "down" }, 150);
		}
		
	}
}

function clear_frame(frame) {
	for (var j = 0; j < 8; j++) {
		
		$('#valve_'+(j+1)).find('.preview_overlay:visible').hide("slide", { direction: "down" }, 150);
	}

}





});//done ready
