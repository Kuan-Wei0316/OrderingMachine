function fetchFile(element) {
    return new Promise(function(resolve, reject) {
        let fReader = new FileReader();
        fReader.onload = async function(e) {
            fileData = e.target.result;
            resolve(fileData);
        };
        fReader.onerror = async function(e) {
            reject(e);
        }
        fReader.readAsDataURL(element[0].files[0]);
    });
}

function imgurAPI(fData) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: "https://api.imgur.com/3/image",
            data: JSON.stringify({ "image": fData.slice(fData.indexOf(",") + 1) }),
            type: "POST",
            // async: false,
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            headers: {
                //Authorization: "Client-ID " + "e136cde6840d358" //暫用henry0523ho的Client-ID
                'Authorization': "Client-ID " + "e49dbac35d46ef7" //暫用chen的Client-ID
            },
            success: function(returnData) {
                resolve(returnData["data"]["link"]);
            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);
                reject(thrownError);
            },
        });
    });
}

function freeImageAPI(fData) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: "https://freeimage.host/api/1/upload",
            data: JSON.stringify({
                "image": fData.slice(fData.indexOf(",") + 1),
                "key": "6d207e02198a847aa98d0a2a901485a5",
                "format": "json"
            }),
            type: "POST",
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function(returnData) {
                resolve(returnData["image"]["url"]);
            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);
                reject(thrownError);
            },
        });
    });
}

function imgbbAPI(fData) {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: "https://api.imgbb.com/1/upload",
            data: JSON.stringify({
                "key": "9d0a6aa08db5c141199ee07323b2e961",
                "image": fData.slice(fData.indexOf(",") + 1)
            }),
            type: "POST",
            dataType: "json",
            contentType: "application/json;charset=utf-8",
            success: function(returnData) {
                resolve(returnData["data"]["url"]);
            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(xhr.status);
                console.log(thrownError);
                reject(thrownError);
            },
        });
    });
}

function myAPI(element) {
    if (element[0].files.length == 0) return "";
    else {
        return new Promise(function(resolve, reject) {
            let formData = new FormData();
            formData.append('image', element[0].files[0]);
            $.ajax({
                url: "http://localhost/workSpace/OrderingMachine/php/uploadImage.php",
                type: "POST",
                data: formData,
                contentType: false, //required
                processData: false, // required
                mimeType: 'multipart/form-data',
            }).done(function(res) {
                res = JSON.parse(res);
                if (res.state == 200) {
                    resolve(res.url);
                } else {
                    console.log(res);
                }
            });
        });
    }
}

async function uploadImage(element) { //element是網頁中的原件，請已JQuery元件表示，如$("#inputFile")；結果會回傳照片的網址，使用時請加await
    // let fileData = await fetchFile(element);
    // let retURL = await imgurAPI(fileData);
    // return await retURL;
    return await myAPI(element);
}

async function testUploadImg(element) {
    return await myAPI(element);
}

/*
<input id="in" type="file">
<button id="btn">send</button>
$("#btn").click(async function() {
    let url = await uploadImage($("#in"));
    // 取得URL後要做的事...
});
*/