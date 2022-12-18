<?php
header("Access-Control-Allow-Origin: *");
require_once "conn.php";
$inputData=$_POST;
$outputData = array();
try{
    $receiptId=$_POST["receiptId"];
    session_start();
    if(isset($_SESSION["e_id"])){
        if(isset($_POST["delivery"])){
            $delivery=$_POST["delivery"];
            $sql = "UPDATE receipt
                    SET delivery='" . $delivery . "'
                    WHERE receipt_id='" . $receiptId . "';";
            $result = $conn->query($sql);
            if ($result === TRUE) {
                $outputData["state"] = 200;
                $outputData["message"] = "update delivery success";
            } else {
                throw new Exception("MySQL is broken.");
            }
        }
        else if(isset($_POST["payment"])){
            $payment=$_POST["payment"];
            $sql = "UPDATE receipt
                    SET payment='" . $payment . "'
                    WHERE receipt_id='" . $receiptId . "';";
            $result = $conn->query($sql);
            if ($result === TRUE) {
                $outputData["state"] = 200;
                $outputData["message"] = "update payment success";
            } else {
                throw new Exception("MySQL is broken.");
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