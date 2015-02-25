<?php

include 'Base.php';


class Controller_testDB extends Controller_Base {

    function __construct() {
        parent::__construct();
}


    public function route() {
		if ($_POST['get_names']) {

			$query = "SELECT frame_length FROM sequence_table";
	        $sequence_names = $this->getQueryResults($query);
			//$sequence_names = mysql_query($query);
	        echo json_encode('connection status '.$sequence_names['connection']);
			echo json_encode('number of rows '.$sequence_names['numRows']);
			# code...
		}
    }



}

$test_db = new Controller_testDB();
$test_db->route();