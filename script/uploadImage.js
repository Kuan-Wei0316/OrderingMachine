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

async function uploadImage(element) { //element是網頁中的原件，請已JQuery元件表示，如$("#inputFile")；結果會回傳照片的網址，使用時請加await
    let fileData = await fetchFile(element);
    let retURL = await imgurAPI(fileData);
    return await retURL;
}

/*
<input id="in" type="file">
<button id="btn">send</button>
$("#btn").click(async function() {
    let url = await uploadImage($("#in"));
    // 取得URL後要做的事...
});
*/