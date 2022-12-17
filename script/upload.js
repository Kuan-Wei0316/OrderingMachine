$(document).ready(function(){
    $("#productCate").change(function(){
        var selectLabel=$("#productCate").val();
        alert(selectLabel);
    })
    let conBtn = document.getElementById("conBtn");
    conBtn.addEventListener("click", setProduct, false);
    $("#addNewLabelBtn").click(function(){
        $("#productCate").append("<option value='"+$('#addNewLabel').val()+"'>"+$('#addNewLabel').val()+"</option>")
    })
})

async function setProduct(){
    let productId = "";
    let productName = $("#productName").val();
    let productImg = "";//await uploadImage($("#productPic"));
    let productText = $("#productIntro").val();
    let productLabel = $("#productCate").val();
    let productCost = $("#productPrice").val();

    $.ajax({
        url:'php/setProduct.php',
        type:"POST",
        data:{
            "productId": productId,
            "productName": productName,
            "productImg": productImg,
            "productText": productText,
            "productLabel": productLabel,
            "productCost": productCost
        },
        
    })
    .done(function(data) {
        let obj = JSON.parse(data);
        console.log(obj.message);
    })
    //location.reload();
}