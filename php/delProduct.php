<?php
require_once "conn.php";
$inputData = $_POST;
$outputData=array();
$productId=$_POST["productId"];
session_start();
$sql="DELETE FROM product WHERE product_id='".$productId."';";
$result=$conn->query($sql);
if($result===TRUE){
    $outputData["state"] = 200;
    $outputData["message"] = "delete success";
}else{
    throw new Exception("MySQL is broken.".$result);
}
$outputJSON = json_encode($outputData);
echo $outputJSON;
?>