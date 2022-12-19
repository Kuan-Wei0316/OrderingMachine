<?php
require_once "conn.php";
$outputData= array();
try{
    $sql='SELECT * FROM product;';
    $result=$conn->query($sql);
    $outputData['data']=array();
    while ($row=$result->fetch_assoc()){
        array_push($outputData['data'],$row);
    }
    $outputData['state']=200;
    $outputData['message']="OK";

}catch(Exception $e){
    $outputData['state']=500;
    $outputData['message']=$e->getMessage();
}

echo json_encode($outputData);