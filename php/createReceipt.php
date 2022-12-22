<?php
require_once "conn.php";
$outputData= array();
try{
    session_start();
    $sql= "INSERT INTO receipt (comment,takeout,employee) VALUES('".$_POST['comment']."','".$_POST['takeout']."','".$_SESSION['e_id']."');";
    $conn->query($sql);
    $outputData['receiptId']= $conn->insert_id;
    $outputData['state']=200;
    $outputData['message']="OK";
}catch(Exception $e){
    $outputData['state']=500;
    $outputData['message']=$e->getMessage();
}
echo json_encode($outputData);