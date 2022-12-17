<?php
header("Access-Control-Allow-Origin: *");
require_once "conn.php";
$inputData=$_POST;
$outputData = array();
try{
    $productId=$_POST["productId"];
    $productName=$_POST["productName"];
    $productImg=$_POST["productImg"];
    $productText=$_POST["productText"];
    $productLabel=$_POST["productLabel"];
    $productCost=$_POST["productCost"];
    session_start();
    if($productId==""){
        $sql = "INSERT INTO product (product_name, product_img, product_intro, product_label, product_price) VALUES('" . $productName . "','" . $productImg . "','" . $productText . "','" . $productLabel . "','" . $productCost . "');";
        $result = $conn->query($sql);
        if ($result === TRUE) {
            $outputData["state"] = 200;
            $outputData["message"] = "create success";
        } else {
            throw new Exception("MySQL is broken.");
        }
    }else{
        $sql="SELECT product_id FROM product WHERE product_id='".$productId."';";
        $result=$conn->query($sql);
        if($row = $result->fetch_assoc()){
            $sql =   "UPDATE product
                SET product_name='" . $productName . "',
                product_img='" . $productImg . "',
                product_intro='" . $productText . "',
                product_label='" . $productLabel . "',
                product_price='" . $productCost . "' ,
                WHERE product_id='" . $productId . "';";
            $result = $conn->query($sql);
            if ($result === TRUE) {
                $outputData["state"] = 200;
                $outputData["message"] = "update success";
            } else {
                throw new Exception("MySQL is broken.");
            }
        }else{
            $outputData["state"] = 410;
            $outputData["message"] = "no product found";
        }
    }
} catch(Exception $e){
    $outputData["state"]=500;
    $outputData["message"] = $e->getMessage();
}
$outputJson = json_encode($outputData);
echo $outputJson;
?>