<?php

include 'Base.php';

class Controller_Fountain_Config extends Controller_Base {

    function __construct() {
        parent::__construct();
    }

    public function route() {
        
    	if ($_POST['instruction']) {
    		$instruction = $_POST['instruction'];
    	}

    	

    	switch ($instruction) {
    		case 'start_execution':

    				echo 'exec_started';
                    exec('pkill -f queue_execution.php');
    				exec('./queue_execution.php');

    			// echo json_encode('Start');
    			break;

    		case 'stop_execution':
                    echo 'stop';
	    			exec('pkill -f queue_execution.php');
    			break;

    		case 'nozzle_test':
    			exec('pkill -f queue_execution.php');
	    			$sequence = $_POST['sequence'];
	    			$sequence_name = $sequence.'.json';
	    			$file_in_sequence = "../Maintenance/".$sequence_name;
	    			$sequence_array = json_decode(file_get_contents($file_in_sequence));
	    			$this->execute_sequence($sequence_array);
	    			echo json_encode($sequence_array);
    			break;

            case 'start_webcam':
                echo 'start cam';
                exec('sudo ./start_webcam.sh');
                break;

            case 'stop_webcam':
                echo 'stop cam';
                exec('sudo ./stop_webcam.sh');
                break;


    		
    		default:
    			echo json_encode('No Valid Instruction');
    			break;
    	}

    }


	private function execute_sequence($sequence_to_execute) {
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

    
}

$config = new Controller_Fountain_Config();
$config->route();

?>