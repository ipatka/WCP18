<?php
class Controller_Base {

    function __construct() {
        $this->templates = $this->MustacheLoader();
        // this is where we connect to the database
        // should look like this
        $this->database = $this->connectToDatabase();
    }

    private function MustacheLoader () {
        include "$_SERVER[DOCUMENT_ROOT]/external_libraries/mustache.php-master/src/Mustache/Autoloader.php";
        Mustache_Autoloader::register();
        $templates = new Mustache_Engine(array(
            'loader' => new Mustache_Loader_FilesystemLoader("$_SERVER[DOCUMENT_ROOT]/Templates")
 	    ));
        return $templates;
    }

    //  functions needed:
    //  connectToDatabaes()
    //  
    //  getQueryResults($query)
    //  $query is a sql command string
    //  
    public function connectToDatabase () {
        include $_SERVER['DOCUMENT_ROOT'].'../db.php';
        $database = new mysqli($db_host, $db_user, $db_pass, $db_name);
        
        if ( $database->connect_errno ) {
            return "Error: Can't connect to the database.";
        } else {
            return $database;
        }
    }
    
    public function getQueryResults($query) {
        // $data = [];
        // $i = 0;
        // if ($result = $this->database->query($query)) {
        //     while($row = $result->fetch_assoc()) {
        //         foreach($row as $k => $v) {
        //             $data[$i][$k] = $v;
        //         }
        //         $i++;
        //     }
        // }
        // include $_SERVER['DOCUMENT_ROOT'].'../db.php';
        // $database = new mysqli($db_host, $db_user, $db_pass, $db_name);
        if ( $this->connect_errno ) {
            $data['connection'] = "Error: Can't connect to the database.";
        } else {
            //return $database;
            $data['connection'] = $this->connect_error;
        }

       // if ($result = $this->query($query)) {
       //     $data['numRows'] = $result->num_rows;
       //     # code...
       // } else {
            $data['numRows'] = 'nope';
       // }

        //$data = 'we made it';
        // if ($result = $this->query($query)) {
        //     $data = 'something';
        // } else {
        //     $data = 'nothing';
        // }
        //$data = $this->database->query($query);
        // $data = $database->host_info;
        return $data;
    }



}
