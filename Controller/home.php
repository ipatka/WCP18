<?php

include 'Base.php';


class Controller_Home extends Controller_Base {

    function __construct() {
        parent::__construct();
}


    public function route() {
    
        $data["name"] = "Isaac"; 
        $number_of_fields = 3;


        for ($i=0; $i < 10; $i++) { 
    		
        	// Array for mustache to render
    	    $data["sequence_option"][$i]["sequence_name"] = "sequence ".($i+1);
            $data["sequence_option"][$i]["sequence_id"] = "id".($i+1);

	    
        }



        return $data;
    }



}
