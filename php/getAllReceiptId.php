<?php
header("Access-Control-Allow-Origin: *");
require_once "conn.php";
$outputData=array();
try{
    session_start();
    if(isset($_SESSION["e_id"])){
        $sql="SELECT * FROM receipt WHERE payment<> '1' OR delivery<> '1';";
        $result=$conn->query($sql);
        $outputData["data"] = array();
        while($row=$result->fetch_assoc()){
            array_push($outputData["data"], $row);
        }
    }
    else{
        $outputData["state"] = 404;
        $outputData["message"] = "no session";
    }
}catch(Exception $e){
    $outputData["state"]=500;
    $outputData["message"] = $e->getMessage();
}


$outputJSON = json_encode($outputData);
echo $outputJSON;
?>