<?php
class Controller_Base {

    function __construct() {
        $this->templates = $this->MustacheLoader();
        // this is where we connect to the database
        // should look like this
        // $this->database = $this->connectToDatabase();
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



}
