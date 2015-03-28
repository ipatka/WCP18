<?php

while(1) {

    $dir = '../Queue/';
    $files = array_slice(scandir($dir), 2);
    $extensions = array("json");

    $j = 0;
    foreach ($files as &$filename) {

        $ext = pathinfo($dir.$filename, PATHINFO_EXTENSION);
        if (in_array($ext, $extensions)) {


            # code...
        $filename = basename($dir.$filename, '.json');
        $queue[$j] = $filename;
        $j++;
        } 
    
    };
    if ($queue[0]) {
    	echo json_encode('queue exists');
	    $sequence_name = $queue[0].'.json';
	    $file_in_sequence = "../Sequences/".$sequence_name;
	    $file_in_queue = "../Queue/".$sequence_name;
	    $sequence_array = json_decode(file_get_contents($file_in_sequence));
	    execute_sequence($sequence_array);
	    $loop = file_get_contents($file_in_queue);
	    unlink($file_in_queue);
    } else {
    	echo json_encode('nothing exists');
    }

    
    // if loop, don't remove from queue
    // else, remove from queue

}




function execute_sequence($sequence_to_execute) {
        $interpret = array(4 , 17 , 27 , 22 , 18 , 23 , 24 , 25);
        
        $frame = 1;
        foreach ($sequence_to_execute as $key => $value) {
            $entry = 1;
            $pin_open_counter = 0;
            $pin_close_counter = 0;
           echo json_encode("frame");
           echo json_encode($frame);
            foreach ($value as $sub_array => $value_b) {
                if ($entry < 9) {
                    if ($value_b == 1) {
                        $pins_open[$pin_open_counter] = $interpret[$entry-1];
                        $pin_open_counter++;
                    } else {
                        $pins_close[$pin_close_counter] = $interpret[$entry-1];
            $pin_close_counter++;
                    }
                   echo json_encode("nozzle"), json_encode($entry);
                   echo json_encode("state"), json_encode($value_b);

                }
                else {
                   echo json_encode("frame_length"), json_encode((int)$value_b);
                    $frame_length = $value_b;
        
                }


                $entry++;
            }

            // $pins_open[0] = 17;
            // $pins_open[1] = 27;

          exec('sudo ./../external_libraries/php-blinker/myBlinker "' . serialize($pins_open) . '" "' . serialize($pins_close) . '" "' . addslashes($frame_length) . '"');
            unset($pins_open);
            unset($pins_close);
            echo "\n";
            $frame++;
        }
        // No pins to open
        $pins_open;
        // Close all pins
        $pins_close = $interpret;
        // frame length not important
        $frame_length = 1;
        // turn off pins
        exec('sudo ./../external_libraries/php-blinker/myBlinker "' . serialize($pins_open) . '" "' . serialize($pins_close) . '" "' . addslashes($frame_length) . '"');
    }



?>