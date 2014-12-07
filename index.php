<?php


require 'Controller/home.php';


$home = new Controller_Home();

$tpl = $home->templates->loadTemplate('home.mustache');
$data = $home->route();

echo $tpl->render($data);