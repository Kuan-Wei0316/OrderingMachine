<?php
require_once "conn.php";
$inputData = $_POST;
$outputData=array();
$productLabel=$_POST["productLabel"];
session_start();
$sql="SELECT * FROM product WHERE product_label='". $productLabel ."';";
$result=$conn->query($sql);
while($row=$result->fetch_assoc()){
    // $obj = [
    //     'product_name' => $row["product_name"],
    //     'product_id'=> $row["product_id"],
    //     
    // ];
    array_push($outputData, $row);
}
$outputJSON = json_encode($outputData);
echo $outputJSON;
?>