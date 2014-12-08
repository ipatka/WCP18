<?php


require '../Controller/new_sequence.php';


$new_sequence = new Controller_Sequence();

$tpl = $new_sequence->templates->loadTemplate('new_sequence.mustache');
$data = $new_sequence->route();

echo $tpl->render($data);