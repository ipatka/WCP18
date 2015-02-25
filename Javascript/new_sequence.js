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
		var num_rows = $( "tr:last" ).data('count');
		var object_to_post = create_sequence_object(num_rows);
		$.post('/Controller/sequence_manager.php',{
			sequence_post: object_to_post
		},
		function(data) {
				console.log("posted. here's the data returned: "+data);
			});
		//post the object to /Controller/sequence_manager.php
	});


	$(document).on('click', '#preview', function() {
		var num_rows = $( "tr:last" ).data('count');
		var object_to_preview = create_sequence_object(num_rows);
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
	var template = $('<tr class="row"> <td class="row_label body"></td><td> <div class="valve_button"></div></td><td> <div class="valve_button"></div></td><td> <div class="valve_button"></div></td><td> <div class="valve_button"></div></td><td> <div class="valve_button"></div></td><td> <div class="valve_button"></div></td><td> <div class="valve_button"></div></td><td> <div class="valve_button"></div></td><td class="row_label"> <select class="frame_length"> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> <option value="5">5</option> <option value="6">6</option> <option value="7">7</option> <option value="8">8</option> <option value="9">9</option> <option value="10">10</option> <option value="0">X</option> </select> </td></tr>');
	var rows = $( "tr:last" ).data('count');
	var next_row_number = rows + 1;

	template.data('count',next_row_number);
	template.find('.body').text('frame '+next_row_number);
	return template;
}


function preview_sequence(sequence) {
	var num_rows = $( "tr:last" ).data('count');
	console.log('num rows '+num_rows);
	for (var i = 0; i < num_rows; i++) {
		var delay_time = sequence[i][8];
		animate_frame(sequence[i]);
		window.setTimeout(clear_frame, 1000 * delay_time);
		
	}
}

function animate_frame(frame) {
	console.log('frame '+frame);
	for (var j = 0; j < 8; j++) {
		if (frame[j] == 1) {
			$('#valve_'+(j+1)).css('background-color','red');
		}
		
	}
}

function clear_frame() {
	for (var j = 0; j < 8; j++) {
		$('#valve_'+(j+1)).css('background-color','gray');
	}
}

});//done ready