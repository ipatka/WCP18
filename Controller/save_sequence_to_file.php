<?php

include 'Base.php';


class Controller_Save_Sequence extends Controller_Base {

    function __construct() {
        parent::__construct();
}


    public function route() {
        $file_name = $_POST['file_name'];
        $file_name = str_replace(' ', '_', $file_name);
        $myFile = "../Sequences/".$file_name.".json";
        $fh = fopen($myFile, 'w') or die("can't open file");
        $stringData = $_POST["data"];
        fwrite($fh, $stringData);
        fclose($fh);

    }



}

$save = new Controller_Save_Sequence();
$save->route();
