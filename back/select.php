<?php
require "./vendor/autoload.php";
use \Firebase\JWT\JWT;
require_once "connexion.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");




$json =file_get_contents('php://input');
$obj = json_decode($json,true);

extract($obj);






// select
$query="SELECT * FROM users WHERE email='$email' ";
$resultt=mysqli_query($conn,$query);
$count= mysqli_num_rows($resultt);
// echo $count.' <br>';

while($ligne = mysqli_fetch_assoc($resultt)){ 
    $password2=$ligne['password'];
    $username=$ligne['username'];
}
if ($count === 1) {

if(password_verify($password, $password2)){

    $secret_key = "5v8y/B?E(H+KbPeShVmYq3t6w9";
    $issuedat_claim = time();// issued at
    $notbefore_claim = $issuedat_claim+10; //not before
    $expire_claim=$issuedat_claim +3600;
   

$data = array(
          
    "username" => $username,
    "email" => $email
);
    $token = array(
       
        "iat" => $issuedat_claim,
        "nbf" => $notbefore_claim,
        "exp" => $expire_claim,
        "user" => $data

      );

    http_response_code(200);

    $jwt = JWT::encode($token, $secret_key);


 echo json_encode(
            array(
                "message" => "Successful login.",
                "jwt" => $jwt,
                "user" => $data
            ));      
}
  else{
 
        
        http_response_code(401);
        echo json_encode(array("message" => "Login failed."));
    
    


}}

?>