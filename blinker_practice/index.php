<?php
/** [TITLE] class file
 * Created on 2013-03-18 at 22:04
 * @copyright Toog SARL (Nantes, France) 2013
 * @author Ronan - @arno_u_loginlux
 * @link http://http://www.toog.fr
 * @license :  see the LICENSE file this source code was distribued with
 * @version //autogentag//
 */

require '../Controller/buttons.php';


$new_sequence = new Controller_Buttons();

$tpl = $new_sequence->templates->loadTemplate('buttons.mustache');
$data = $new_sequence->route();

echo $tpl->render($data);
