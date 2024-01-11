<?php
header("Access-Control-Allow-Origin: *");

$data = file_get_contents('php://input');
$data = json_decode($data);

$success = array("response" => "success");
$error = array("response" => "error");

if (is_object($data)) {

    if (file_put_contents("data.json", json_encode($data))) {
        echo json_encode($success);
        return;
    }
} else {
    echo json_encode($error);
}
