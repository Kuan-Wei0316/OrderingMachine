<?php
require_once "conn.php";
$outputData= array();
try {
    if (isset($_POST['receiptId'])) {
        $sql = "SELECT * FROM receipt WHERE receipt_id='".$_POST['receiptId']."';";
        $result = $conn->query($sql);
        if($row = $result->fetch_assoc()) {
            $outputData['data']=$row;
            $outputData['state'] = 200;
            $outputData['message'] = "OK";
        }else{
            $outputData['state'] = 404;
            $outputData['message'] = "no receipt found";
        }
        
    } else {
        $outputData['state'] = 422;
        $outputData['message'] = 'missing key and value';
    }
} catch (Exception $e) {
    $outputData['state'] = 500;
    $outputData['message'] = $e->getMessage();
}
echo json_encode($outputData);