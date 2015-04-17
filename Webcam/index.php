<?php


require '../Controller/webcam.php';


$new_sequence = new Controller_Sequence();

$tpl = $new_sequence->templates->loadTemplate('webcam.mustache');
$data = $new_sequence->route();

echo $tpl->render($data);