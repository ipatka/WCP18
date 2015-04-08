$(document).ready(function(){
var num_rows = 0;
$(document).on('click', '#preview_home', function() {

	
	var selected = $('.selected').attr('id');
	

	if (selected) {
	$('.preview_content').show();

	$('html, body').animate({ scrollTop: $('#preview_home_section').offset().top + 10}, 500);

	$.post('../Controller/sequence_manager.php', {
		get_length_of_sequence: selected
	}).done(function(data) {
		console.log('returned '+data);
		num_rows = data;
	});
	$.post('../Controller/sequence_manager.php', {
		get_sequence_to_preview: selected
	}).done(function(data) {
		var interpreted = jQuery.parseJSON(data);
		console.log('returned '+interpreted);
		preview_sequence(interpreted, num_rows);
	});
}	
});

function preview_sequence(sequence, num_rows) {
	num_rows--;
	console.log('sequence'+sequence);

	console.log('num rows '+num_rows);

   var i = 0;
   var delay_time = sequence[i][8];
   console.log('sequence i'+sequence[i]);
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
            console.log('delay_time '+delay_time);
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