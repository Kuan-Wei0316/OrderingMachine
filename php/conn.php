<?php
header("Access-Control-Allow-Origin: *");
$dbServerName = "localhost";
$dbUserName = "root";
$dbPwd = "";
$dbName = "ordering_machine";

// 伺服器設定
// $dbServerName = "localhost";
// $dbUserName= "id20033960_root";
// $dbPwd= "orderMachine1!";
// $dbName= "id20033960_ordering_machine";

$conn = new mysqli($dbServerName, $dbUserName, $dbPwd,$dbName);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error."<br>");
}
// echo "Connected successfully<br>";
?>