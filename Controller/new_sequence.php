<?php

include 'Base.php';


class Controller_Sequence extends Controller_Base {

    function __construct() {
        parent::__construct();
}


    public function route() {




    	 for ($i=0; $i < 8; $i++) { 
    		
        	// Array for mustache to render
    	    $data["nozzle_header"][$i]["nozzle_name"] = "Nozzle ".($i+1);
    	    $data["valve_columns"][$i]["valve_id"] = "valve".($i+1);
			}

			for ($j=0; $j < 5; $j++) { 
    		
        	// Array for mustache to render
			$data["nozzle_rows"][$j]["row_name"] = "frame ".($j+1);
			$data["nozzle_rows"][$j]["row_id"] = "row".($j+1);
            $data["nozzle_rows"][$j]["row_number"] = ($j+1);

			}

            for ($k=0; $k < 11; $k++) { 
            
            // Array for mustache to render
            $data["frame_length_options"][$k]["option"] = $k+1;

            }

            for ($k=11; $k < 20; $k++) { 
            
            // Array for mustache to render
            $data["frame_length_options"][$k]["option"] = 0.1 * ($k-10);

            }




        return $data;
    }



}
