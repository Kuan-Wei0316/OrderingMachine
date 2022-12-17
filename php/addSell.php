<?php
require_once "conn.php";
$outputData= array();

try{
    if(isset($_POST['productId'])&&isset($_POST['num'])&&isset($_POST['receiptId'])){
        $sql="INSERT INTO per_sell (product_id,num,receipt_id) VALUES ('".$_POST['productId']."','".$_POST['num']."','".$_POST['receiptId']."');";
        $conn->query($sql);
        $outputData['sellId']=$conn->insert_id;
        $outputData['state']=200;
        $outputData['message']="OK";
    }
}catch(Exception $e){
    $outputData['state']=500;
    $outputData['message']=$e->getMessage();
}
echo json_encode($outputData);