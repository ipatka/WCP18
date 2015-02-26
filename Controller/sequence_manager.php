
<?php


// recieve posts of the sequence object from new_seqence.js
// insert it into the database


// recieve posts of a sequence id from home.js
// retrieve sequence from database
// echo queue order and length of time to execute
// execute sequence

include 'Base.php';

class Controller_Sequence_Manager extends Controller_Base {

    function __construct() {
        parent::__construct();
    }

    public function route() {
        
        if ($_POST['execute_from_home']) {
            $sequence_name = $_POST['execute_from_home'].'.json';
            $file = "../Sequences/".$sequence_name;
            $sequence_array = json_decode(file_get_contents($file));
            echo json_encode($sequence_array);
        }
        if ($_POST['sequence_post']) {
            $sequence_array = $_POST["sequence_post"];
        }

        if ($_POST['preview_home']) {
            $sequence_array_handle = $_POST['preview_home'].'.json';
            $file = "../Sequences/".$sequence_name;
            $sequence_array = json_decode(file_get_contents($file));
            echo json_encode($sequence_array);
        }

	    $interpret = array(4 , 17 , 27 , 22 , 18 , 23 , 24 , 25);
        
        $frame = 1;
        foreach ($sequence_array as $key => $value) {
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

    public function interpret() {

        exec('sudo ./../external_libraries/php-blinker/myBlinker 17 27 3');


    }
}

$sequences = new Controller_Sequence_Manager();
$sequences->route();

?>


