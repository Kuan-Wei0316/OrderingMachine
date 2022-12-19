<?php
header("Access-Control-Allow-Origin: *");
require_once "conn.php";
$inputData=$_POST;
$outputData = array();
try{
    session_start();
    if(isset($_SESSION["e_id"])){
        if(isset($_POST["receiptId"])){
            $sql = "SELECT * FROM per_sell WHERE receipt_id='".$_POST['receiptId']."';";
            $result = $conn->query($sql);
            $outputData["data"] = array();
            while($row = $result->fetch_assoc()){
                array_push($outputData["data"], $row);
            }
        }
        else{
            $outputData['state'] = 422;
            $outputData['message'] = 'missing key and value';
        }
    }
    else{
        $outputData["state"] = 404;
        $outputData["message"] = "no session";
    }
} catch(Exception $e){
    $outputData["state"]=500;
    $outputData["message"] = $e->getMessage();
}
$outputJson = json_encode($outputData);
echo $outputJson;
?>