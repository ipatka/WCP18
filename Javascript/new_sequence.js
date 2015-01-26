$(document).ready(function(){

	$(document).on("click",".valve_button", function() {
		console.log(this.id);

		$(this).toggleClass("valve_selected");

	});

	$(document).on("click","#add_more_rows", function() {
		console.log("add_more_rows");

	});


	$(document).on("click","#submit", function() {
		var object_to_post = create_sequence_object();
		$.post('/Controller/sequence_manager.php',{
			sequence_post: object_to_post
		}
		,function(data) {
				console.log("posted. here's the data returned: "+data);
			});
		//post the object to /Controller/sequence_manager.php
	});



function create_sequence_object() {

	var rows = 20;
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


});//done ready