<?php
require_once "conn.php";
$outputData= array();
try{
    if (isset($_FILES)&&$_FILES['image']['error'] === UPLOAD_ERR_OK){
        if (file_exists('../upload/' . $_FILES['image']['name'])) {
            $outputData['state'] = 409;
            $outputData['message'] = "duplicate file";
        } else {
            $file = $_FILES['image']['tmp_name'];
            $dest = '../upload/' . $_FILES['image']['name'];
            move_uploaded_file($file, $dest);

            $filePath = '../upload/' . $_FILES['image']['name'];
            $url = "https://api.imgbb.com/1/upload";
            $headers = array("Content-Type:multipart/form-data"); // cURL headers for file uploading
            $postfields = array(
                'image' => new \CurlFile($filePath, $_FILES['image']['type'], $_FILES['image']['name']),
                'key'=> '9d0a6aa08db5c141199ee07323b2e961'
            );
            $ch = curl_init();
            $options = array(
                CURLOPT_URL => $url,
                // CURLOPT_HEADER => true,
                CURLOPT_POST => 1,
                CURLOPT_HTTPHEADER => $headers,
                CURLOPT_POSTFIELDS => $postfields,
                CURLOPT_INFILESIZE => $_FILES['image']['size'],
                CURLOPT_RETURNTRANSFER => true
            ); // cURL options
            curl_setopt_array($ch, $options);
            $result= curl_exec($ch);


            unlink('../upload/'.$_FILES['image']['name']);
            $result= json_decode($result,true);

            $outputData['url']=$result['data']['url'];

            $outputData['state'] = 200;
            $outputData['message'] = "OK";
        }
    }else{
        $outputData['state'] = 406;
        $outputData['message'] = "no file upload";
    }
    
}catch(Exception $e){
    $outputData['state']=500;
    $outputData['message']=$e->getMessage();
}
echo json_encode($outputData);