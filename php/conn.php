<?php
header("Access-Control-Allow-Origin: *");
$dbServerName = "localhost";
$dbUserName = "root";
$dbPwd = "";
$dbName = "ordering_machine";

$conn = new mysqli($dbServerName, $dbUserName, $dbPwd,$dbName);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error."<br>");
}
// echo "Connected successfully<br>";
?>