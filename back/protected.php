<?php


require_once "connexion.php";
require "./vendor/autoload.php";
use \Firebase\JWT\JWT;
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$secret_key = "5v8y/B?E(H+KbPeShVmYq3t6w9";
$jwt = null;

$data = json_decode(file_get_contents("php://input"),true);
// print_r($data);

// $authHeader = $_SERVER['HTTP_AUTHORIZATION'];

// $arr = explode("", $authHeader);




$jwt = $data['Authorization'];
// print ($jwt) ;

if($jwt){
 
    try {
 
        $decoded = JWT::decode($jwt, $secret_key, array('HS256'));

        echo json_encode(array(
            "message" => "Access granted: ".$jwt,
            "error" => $e->getMessage()
        ));
 
    }catch (Exception $e){
 
    http_response_code(401);
 
    echo json_encode(array(
        "message" => "Access denied.",
        "error" => $e->getMessage()
    ));
}
 
}
?>