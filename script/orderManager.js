$(document).ready(function() {
    importOrder();
    //setInterval('window.location.reload();',10000);

})

function importOrder()
{
    $.ajax({
        url: 'php/getAllReceiptId.php',
        type: "GET",
        
    })
    .done(function(result){
        let objs = JSON.parse(result);
        console.log(objs[0].id);
        for(let i=0;i<objs.length;i++){
            /* create div class="col" */
            let divCol=document.createElement("div");
            divCol.setAttribute("class","col");
            divCol.setAttribute("id","col-"+objs[i].id);
            document.getElementById("flex-container").appendChild(divCol);

            /* create div class="card text-black" */
            let divCard=document.createElement("div");
            divCard.setAttribute("class","card text-white");
            divCard.setAttribute("id","card-"+objs[i].id);
            divCol.appendChild(divCard);

            /* create div class="card-header" */
            let divCardHeader=document.createElement("div");
            divCardHeader.setAttribute("class","card-header");
            divCardHeader.setAttribute("id","cardHeader-"+objs[i].id);
            divCard.appendChild(divCardHeader);

            /* create div class="card-body" */
            let divCardBody=document.createElement("div");
            divCardBody.setAttribute("class","card-body");
            divCardBody.setAttribute("id","cardBody-"+objs[i].id);
            divCard.appendChild(divCardBody);

            /* create div class="card-footer" */
            let divCardFooter=document.createElement("div");
            divCardFooter.setAttribute("class","card-footer");
            divCardFooter.setAttribute("id","cardFooter-"+objs[i].id);
            divCard.appendChild(divCardFooter);

            /* create div class="btn-group dropup d-grid gap-2" */
            let divBtnGroup=document.createElement("div");
            divBtnGroup.setAttribute("class","btn-group dropup d-grid gap-2");
            divBtnGroup.setAttribute("id","btnGroup-"+objs[i].id);
            divCardFooter.appendChild(divBtnGroup);

            /* create button class="btn btn-secondary dropdown-toggle" */
            let btnDropDown=document.createElement("button");
            btnDropDown.setAttribute("type","button");
            btnDropDown.setAttribute("class","btn btn-secondary dropdown-toggle");
            btnDropDown.setAttribute("data-bs-toggle","dropdown");
            btnDropDown.setAttribute("aria-expanded","false");
            btnDropDown.innerHTML="訂單備註";
            divBtnGroup.appendChild(btnDropDown);

            /* create ul class="dropdown-menu" */
            let ul=document.createElement("ul");
            ul.setAttribute("class","dropdown-menu");
            divBtnGroup.appendChild(ul);

            /* create li h4 class="dropdown-header"*/
            let lih4=document.createElement("li");
            let h4DropDownHeader=document.createElement("h4");
            h4DropDownHeader.setAttribute("class","dropdown-header");
            ul.appendChild(lih4);
            lih4.appendChild(h4DropDownHeader);

            /* create li h5 for comment */
            let liComment=document.createElement("li");
            let h5Comment=document.createElement("h5");
            h5Comment.setAttribute("id","comment-"+objs[i].id);
            ul.appendChild(liComment);
            liComment.appendChild(h5Comment);

            /* create br */
            divCardFooter.appendChild(document.createElement("br"));

            /* create div for button content */
            let divButtonContent=document.createElement("div");
            divButtonContent.setAttribute("class","d-flex justify-content-between");
            divCardFooter.appendChild(divButtonContent);

            /* create button class="btn btn-warning btn-outline-dark" for payment */
            let btnPayment=document.createElement("button");
            btnPayment.setAttribute("type","button");
            btnPayment.setAttribute("class","btn btn-warning btn-outline-dark");
            btnPayment.setAttribute("id","payment-"+objs[i].id);
            divButtonContent.appendChild(btnPayment);

            /* create button class="btn btn-warning btn-outline-dark" for delivery*/
            let btnDelivery=document.createElement("button");
            btnDelivery.setAttribute("type","button");
            btnDelivery.setAttribute("class","btn btn-warning btn-outline-dark");
            btnDelivery.setAttribute("id","delivery-"+objs[i].id);
            divButtonContent.appendChild(btnDelivery);

            setState(objs[i].id);
        }
        for(let i=0;i<objs.length;i++){
            $("#payment-"+objs[i].id).click(function(){
                console.log(objs[i].id);
                $("#payment-"+objs[i].id).attr("class","btn btn-success");
                $("#payment-"+objs[i].id).attr("disabled","true");
                $("#payment-"+objs[i].id).html("已付款");
                clickPaymentState(objs[i].id);
                
            })
            $("#delivery-"+objs[i].id).click(function(){
                $("#delivery-"+objs[i].id).attr("class","btn btn-success");
                $("#delivery-"+objs[i].id).attr("disabled","true");
                $("#delivery-"+objs[i].id).html("已送出");
                clickDeliveryState(objs[i].id);
            })
        }
    })
}
function setState(receiptId){
    $.ajax({
        url: "php/getReceipt.php",
        type: "POST",
        data: {"receiptId":receiptId},
    })
    .done(function(data){
        let objs=JSON.parse(data);
        //console.log(objs.data.payment);
        if(objs.data.payment==0){
            $("#payment-"+receiptId).html("未付款");
        }
        else{
            $("#payment-"+receiptId).html("已付款");
        }
        if(objs.data.delivery==0){
            $("#delivery-"+receiptId).html("未送出");
        }
        else{
            $("#delivery-"+receiptId).html("已送出");
        }
    })
}
function clickPaymentState(receiptId){
    $.ajax({
        url: "php/updateState.php",
        type: "POST",
        data: {
            "receiptId":receiptId,
            "payment":1,
        },
    })
    .done(function(data){
        let objs=JSON.parse(data);
        console.log(objs);
    })
}
function clickDeliveryState(receiptId){
    $.ajax({
        url: "php/updateState.php",
        type: "POST",
        data: {
            "receiptId":receiptId,
            "delivery":1,
        },
    })
    .done(function(data){
        let objs=JSON.parse(data);
        console.log(objs);
    })
}