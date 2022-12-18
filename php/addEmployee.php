<?php
require_once "conn.php";
$outputData = array();
try {
    if (isset($_POST['receiptId']) && isset($_POST['comment'])) {
        $sql = "UPDATE receipt SET comment='" . $_POST['comment'] . "' WHERE receipt_id='" . $_POST['receiptId'] . "';";
        $conn->query($sql);
        $outputData['state'] = 200;
        $outputData['message'] = "OK";
    } else {
        $outputData['state'] = 422;
        $outputData['message'] = 'missing key and value';
    }
} catch (Exception $e) {
    $outputData['state'] = 500;
    $outputData['message'] = $e->getMessage();
}
echo json_encode($outputData);