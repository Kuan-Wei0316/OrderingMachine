<?php
require_once "conn.php";
$outputData=array();
try{
    if(isset($_FILES)&&$_FILES['image']['error']===UPLOAD_ERR_OK){
        $file=$_FILES['image']['tmp_name'];
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $fileType= explode('.', $_FILES['image']['name'], 2)[1];
        
        $randstring = '';
        for ($i = 0; $i < 10; $i++) {
            $randstring =$randstring.$characters[rand(0, strlen($characters)-1)];
        }
        $randstring=$randstring.'.'.$fileType;
        $dest='../upload/'.$randstring;
        move_uploaded_file($file,$dest);
        $url='http://localhost/workSpace/OrderingMachine/upload/';
        $filePath=$url.$randstring;
        $outputData['url']=$filePath;
        $outputData['state']=200;
        $outputData['message']="OK";
    }else{
        $outputData['state'] = 406;
        $outputData['message'] = "no file upload";
    }

}catch(Exception $e){
    $outputData['state']=500;
    $outputData['message']=$e->getMessage();
}

echo json_encode($outputData);