<?php
require_once "conn.php";
$outputData = array();
try {
    if(isset($_POST['name'])&&isset($_POST['pwd'])){
        $sql="SELECT * FROM employee WHERE e_name='".$_POST['name']."';";
        $result =$conn->query($sql);
        $outputData['message'] = "login failed";
        $outputData['state'] = 404;
        while ($row = $result->fetch_assoc()){
            if(password_verify($_POST['pwd'], $row['e_pwd_hash'])){
                $outputData['message'] = "OK";
                $outputData['state'] = 200;
                $outputData['e_name']=$row['e_name'];
                $outputData['e_id']=$row['e_id'];
                session_start();
                $_SESSION['e_id']=$row['e_id'];
                $_SESSION['e_name']=$row['e_name'];
                break;
            }
        }
    }else{
        $outputData['state'] = 422;
        $outputData['message'] = 'missing key and value';
    }
} catch (Exception $e) {
    $outputData['state'] = 500;
    $outputData['message'] = $e->getMessage();
}
echo json_encode($outputData);