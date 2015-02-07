<?php

include 'Base.php';


class Controller_Buttons extends Controller_Base {

    function __construct() {
        parent::__construct();
}


    public function route() {

	exec('sudo ./../external_libraries/php-blinker/myBlinker 17 27 1');
        return $data;
    }



}
