<?php
require_once "conn.php";
$outputData= array();

try{
    session_start();
    if(isset($_SESSION['e_id'])){
        $outputData['session']= $_SESSION;
        $outputData['state']=200;
        $outputData['message'] ='OK';
    }else{
        $outputData['state'] = 404;
        $outputData['message'] = 'no session';
    }
}catch(Exception $e){
    $outputData['state']=500;
    $outputData['message']=$e->getMessage();
}
echo json_encode($outputData);