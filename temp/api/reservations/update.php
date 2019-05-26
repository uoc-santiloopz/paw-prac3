<?php
	header('Access-Control-Allow-Origin: *');
	header('Content-Type: application/json');
	header('Access-Control-Methods: POST');
	header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Access-Control-Methods, Authorization, X-Requested-With');

	include_once '../../config/Database.php';
	include_once '../../config/security.php';
	include_once '../../models/Reservations.php';

	preflightReqInterceptor();

	// initiate database and connect
	$database = new Database();
	$db = $database->connect();

	// instantiate reservation
	$reservations = new Reservations($db);

	$reqBody = json_decode(file_get_contents("php://input"), true);

	$data = array(
		'name'=>$reqBody['name'],
		'surnames'=>$reqBody['surnames'],
		'phone'=>$reqBody['phone'],
		'date'=>$reqBody['date'],
		'guests'=>$reqBody['guests'],
		'ID'=>$_GET['id']
	);
	// Create reservation
	if ($reservations->update($data)) {
		echo json_encode(array('OK'));
	} else {
		echo json_encode(array('KO'));
	}
?>
