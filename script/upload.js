$(document).ready(function(){
    showAllLabelInSelect();
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
    location.reload();
}

function showAllLabelInSelect(){
    $.ajax({
        url:'php/getLabel.php',
        type:"GET",
        
        success:function(result){
            let objs=JSON.parse(result)
            console.log(objs[0].label);
            console.log(objs.length);
            for(let i=0;i<objs.length;i++){
                //select
                let setOption = document.createElement("option");
                setOption.setAttribute("id",objs[i].label);
                setOption.setAttribute("value",objs[i].label);
                setOption.innerHTML=objs[i].label;
                document.getElementById("productCate").appendChild(setOption);
                //下拉展開
                let accordionItem=document.createElement("div");
                accordionItem.setAttribute("class","accordion-item");
                let accordionItemH2=document.createElement("h2");
                accordionItemH2.setAttribute("class","accordion-header");
                accordionItemH2.setAttribute("id","accordion-"+objs[i].label);
                let accordionButton=document.createElement("button");
                accordionButton.setAttribute("class","accordion-button collapsed");
                accordionButton.setAttribute("type","button");
                accordionButton.setAttribute("data-bs-toggle","collapse");
                accordionButton.setAttribute("data-bs-target","#collapse-"+objs[i].label);
                accordionButton.setAttribute("aria-expanded","false");
                accordionButton.setAttribute("aria-controls","collapse-"+objs[i].label);
                accordionButton.innerHTML=objs[i].label;
                accordionItem.appendChild(accordionItemH2)
                accordionItemH2.appendChild(accordionButton);

                let collapseItem=document.createElement("div");
                collapseItem.setAttribute("id","collapse-"+objs[i].label);
                //collapseItem.setAttribute("class","accordion-collapse collapse");
                collapseItem.setAttribute("class","accordion-collapse collapse list-group");
                collapseItem.setAttribute("aria-labelledby","headingOne");
                collapseItem.setAttribute("data-bs-parent","#productAccordion");
                let collapseBody=document.createElement("div");
                /**************************************************** */
                //collapseBody.setAttribute("class","accordion-body");
                collapseBody.setAttribute("class","accordion-body list-group");
                /***************************************************** */
                collapseBody.setAttribute("id","collapseBody-"+objs[i].label);
                // let productUl=document.createElement("ul");
                // productUl.setAttribute("class","list-group");
                // productUl.setAttribute("id","ul-"+objs[i].label);
                // collapseBody.appendChild(productUl);
                
                let divList=document.createElement("div");
                divList.setAttribute("class","list-group");
                divList.setAttribute("id","divList-"+objs[i].label);
                //collapseBody.appendChild(divList);

                //collapseItem.appendChild(collapseBody);
                accordionItem.appendChild(collapseItem);
                document.getElementById("collapseTitle").appendChild(accordionItem);
                showAllProductInUpload(objs[i].label);
            }
        }
    })
}
function showAllProductInUpload(productLabel){
    $.ajax({
        url:"php/getProductInUpload.php",
        type:"POST",
        data:{"productLabel": productLabel},

        success:function(result){
            let datas=JSON.parse(result);
            console.log(datas);
            for(let i=0;i<datas.length;i++){
                // let productLi=document.createElement("li");
                // productLi.setAttribute("class","list-group");
                // productLi.setAttribute("id","li-"+datas[i].product_name);
                // document.getElementById("ul-"+productLabel).appendChild(productLi);
                
                // let productButton=document.createElement("button");
                // productButton.setAttribute("id",datas[i].product_name);
                // productButton.innerHTML=datas[i].product_name;
                // productLi.appendChild(productButton);

                let productA=document.createElement("a");
                productA.setAttribute("href","#");
                productA.setAttribute("class","list-group-item list-group-item-action");
                productA.innerHTML=datas[i].product_name;
                
                document.getElementById("collapse-"+productLabel).appendChild(productA);
                productA.addEventListener("click",showProductDetail(datas[i].product_name),false);

            }
        }
    })
}
function showProductDetail(product_name){
    console.log("detail-"+product_name);
}