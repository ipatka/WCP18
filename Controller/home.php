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



      //  $files = array_slice(scandir($dir), 2);
        $files = glob('../Queue/*.json');
        usort($files, function($file_1, $file_2)
        {
            $file_1 = filectime($file_1);
            $file_2 = filectime($file_2);
            if($file_1 == $file_2)
            {
                return 0;
            }
            return $file_1 > $file_2 ? 1 : -1;
        });
        $extensions = array("json");

        $j = 0;
        foreach ($files as &$filename) {

            $ext = pathinfo($dir.$filename, PATHINFO_EXTENSION);
            if (in_array($ext, $extensions)) {
                $loop = file_get_contents($dir.$filename);
                # code...
            $filename = basename($dir.$filename, '.json');
            $fileid = $filename;
            $filename = str_replace('_', ' ', $filename);
            $data["queue"][$j]["sequence_name"] = $filename;
            $data["queue"][$j]["sequence_id"] = $fileid;

            if ($loop == 'true') {
                $data["queue"][$j]["loop"] = 'Looping';
            }

            $j++;
            } 
        
        };



        return $data;
    }



}
