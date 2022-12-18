<?php
header("Access-Control-Allow-Origin: *");
require_once "conn.php";
$outputData=array();
session_start();
$sql="SELECT receipt_id FROM receipt";
$result=$conn->query($sql);
while($row=$result->fetch_assoc()){
    $obj = [
        "id" => $row["receipt_id"]
    ];
    array_push($outputData, $obj);
}

$outputJSON = json_encode($outputData);
echo $outputJSON;
?>