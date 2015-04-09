<?php

include 'Base.php';


class Controller_Setup extends Controller_Base {

    function __construct() {
        parent::__construct();
}


    public function route() {

        // Not currently doing anything with this data
        // Could be used to make the maintenance page content more dynamic by only rendering stuff if the queue is executing or not
        $running = exec('pgrep -fl queue_execution.php');
        if ($running == '') {
            $data['not_running'] = 'true';
        } else {
            $data['running'] = 'true';
        }




        return $data;
    }



}
