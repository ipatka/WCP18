$(document).ready(function(){

$(document).on('click', '.button_icon', function() {

	var target = $(event.target).parents('.button_icon');

	var id = target.attr('id');
	console.log('clicked '+id);

	if (id == 'start_execution') {
		swal('Success', 'Queue execution started', 'success');
	}

	if (target.hasClass('maintenance_sequence')) {
		$.post('../Controller/fountain_config.php', {
			instruction: 'nozzle_test',
			sequence: id
		}).done(function(data) {
			console.log('returned '+data);
			if (data == "error") {
				console.log('warning');
				swal('Warning', 'Please stop queue execution before performing test sequences', 'warning');
			} else {
				console.log('ok');
			}
		});
	} else {
		$.post('../Controller/fountain_config.php', {
			instruction: id
		}).done(function(data) {
			console.log('returned '+data);
			if (data == 'running_already') {
				swal('Warning', 'Queue already executing', 'warning');
			} else if (data == 'stop') {
				swal('Success', 'Queue execution stopped', 'success');
			} else if (data == 'not_running') {
				swal('Warning', 'Queue was not executing', 'warning');
			}
		});
	}






});

});