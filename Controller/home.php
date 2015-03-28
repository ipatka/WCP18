<?php

include 'Base.php';


class Controller_Home extends Controller_Base {

    function __construct() {
        parent::__construct();
}


    public function route() {

        $dir = '../Sequences/';
        $files = array_slice(scandir($dir), 2);
        $extensions = array("json");

        $j = 0;
        foreach ($files as &$filename) {

            $ext = pathinfo($dir.$filename, PATHINFO_EXTENSION);
            if (in_array($ext, $extensions)) {
                # code...
            $filename = basename($dir.$filename, '.json');
            $fileid = $filename;
            $filename = str_replace('_', ' ', $filename);
            $data["sequence_option"][$j]["sequence_name"] = $filename;
            $data["sequence_option"][$j]["sequence_id"] = $fileid;
            $j++;
            } 
        
        };

        $dir = '../Queue/';
        $files = array_slice(scandir($dir), 2);
        $extensions = array("json");

        $j = 0;
        foreach ($files as &$filename) {

            $ext = pathinfo($dir.$filename, PATHINFO_EXTENSION);
            if (in_array($ext, $extensions)) {
                # code...
            $filename = basename($dir.$filename, '.json');
            $fileid = $filename;
            $filename = str_replace('_', ' ', $filename);
            $data["queue"][$j]["sequence_name"] = $filename;
            $data["queue"][$j]["sequence_id"] = $fileid;
            $j++;
            } 
        
        };



        return $data;
    }



}
