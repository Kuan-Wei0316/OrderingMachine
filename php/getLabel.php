<?php
require_once "conn.php";
$outputData=array();
session_start();
$sql="SELECT DISTINCT product_label FROM product";
$result=$conn->query($sql);
while($row=$result->fetch_assoc()){
    $obj = [
        "label" => $row["product_label"]
    ];
    array_push($outputData, $obj);
}
$outputJSON = json_encode($outputData);
echo $outputJSON;
?>