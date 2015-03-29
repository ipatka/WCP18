
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

        if ($_POST['add_to_queue']) {
            $queue_sequence_name = $_POST['add_to_queue'];
            $myFile = "../Queue/".$queue_sequence_name.".json";
            $fh = fopen($myFile, 'w') or die("can't open file");
            $loop = $_POST["loop"];
            fwrite($fh, $loop);
            fclose($fh);
            echo json_encode('Added '.$loop.' to queue');
        }

        if ($_POST['cancel_loop']) {
            $dir = '../Queue/';
            $files = array_slice(scandir($dir), 2);
            $extensions = array("json");

            $j = 0;
            foreach ($files as &$filename) {
                $ext = pathinfo($dir.$filename, PATHINFO_EXTENSION);
                if (in_array($ext, $extensions)) {
                    $fh = fopen($myFile, 'w') or die("can't open file");
                    fwrite($fh,'false');
                    fclose($fh);
                    echo json_encode('loops canceled');

                } 
            
            };
        }


        if ($_POST['sequence_post']) {
            $sequence_array = $_POST["sequence_post"];
        }

        if ($_POST['preview_home']) {
            $file_name = str_replace(' ', '_', $_POST['preview_home']);
            $sequence_array_handle = $file_name.'.json';
            $file = "../Sequences/".$sequence_array_handle;
            $sequence_preview = file_get_contents($file);
            $sequence_preview_processed = preg_replace('/(\\")|(\[)|(\])/', "", $sequence_preview);
            echo json_encode($sequence_preview_processed);
        }




        
        

    }

    private function interpret() {

        exec('sudo ./../external_libraries/php-blinker/myBlinker 17 27 3');


    }

    
}

$sequences = new Controller_Sequence_Manager();
$sequences->route();

?>


