$(document).ready(function(){
    $("#productCate").change(function(){
        var selectLabel=$("#productCate").val();
        alert(selectLabel);
    })
    $("#conBtn").click(function(){
        
    })
    $("#addNewLabelBtn").click(function(){
        $("#productCate").append("<option value='"+$('#addNewLabel').val()+"'>"+$('#addNewLabel').val()+"</option>")
    })
})

async function addLabel(){
    let productLabelId="";
    let productLabel=$("#addNewLabel").val();

    $.ajax({
        url:'php/addLabel.php',
        type:"POST",
        data:{
            "productLabelId": productLabelId,
            "productLabel": productLabel
        },
    })
    .done(function(data){
        let obj
    })
}