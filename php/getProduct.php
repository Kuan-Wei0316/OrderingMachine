<?php
require_once "conn.php";
$inputData = $_POST;
$outputData=array();
$productId=$_POST["productId"];
session_start();
$sql="SELECT * FROM product WHERE product_id='". $productId ."';";
$result=$conn->query($sql);
while($row=$result->fetch_assoc()){
    $obj = [
        "product_id"=> $row["product_id"],
        "product_name" => $row["product_name"],
        "product_label"=> $row["product_label"],
        "product_img"=> $row["product_img"],
        "product_intro"=> $row["product_intro"],
        "product_price"=> $row["product_price"],
    ];
    array_push($outputData, $obj);
}
$outputJSON = json_encode($outputData);
echo $outputJSON;
?>