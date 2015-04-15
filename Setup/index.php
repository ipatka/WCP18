<?php


require '../Controller/setup.php';


$setup = new Controller_Setup();

$tpl = $setup->templates->loadTemplate('setup.mustache');
$data = $setup->route();

echo $tpl->render($data);