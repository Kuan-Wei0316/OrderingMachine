<?php
require_once "conn.php";

try{
    if(isset($_POST['data'])){
        echo password_hash($_POST['data'], PASSWORD_DEFAULT);
    }
}catch(Exception $e){
    $outputData['state']=500;
    $outputData['message']=$e->getMessage();
}