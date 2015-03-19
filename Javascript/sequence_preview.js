$(document).ready(function(){

$(document).on('click', '#preview_home', function() {
	$('.preview_content').show();
	var selected = $('.selected').attr('id');
	$.post('../Controller/sequence_manager.php', {
		preview_home: selected
	}).done(function(data) {
		var interpreted = jQuery.parseJSON(data);
		console.log('returned '+interpreted);
		preview_sequence(interpreted);
	});
});

function preview_sequence(sequence) {
	console.log('length '+sequence.length);
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