let loginDiv;
let loginInfo = {};
$(document).ready(function() {
    init();
    importOrder();
    timeRemind();
    setInterval('window.location.reload();',5000);

})
function init() {
    loginDiv = new bootstrap.Modal(document.getElementById("loginDiv"), {});
    getSession();
    $('#loginBtn').click(function() {
        postLogin($('#loginName').val(), $('#loginPwd').val());
    });
}
function showLogin() {
    loginDiv.show();
    $('#loginFailed').hide();
}
function getSession() {
    $.ajax({
        url: 'php/getSession.php',
        type: 'GET',
        success: function(res) {
            res = JSON.parse(res);
            if (res.state == 200) {
                console.log(res);
                loginInfo.e_name = res.session.e_name;
                loginInfo.e_id = res.session.e_id;
            } else {
                showLogin();
            }
        },
        error: function(res) {
            console.log(res);
        }
    });
}
function postLogin(name, pwd) {
    $.ajax({
        url: 'php/login.php',
        type: 'POST',
        data: {
            name: name,
            pwd: pwd
        },
        success: function(res) {
            res = JSON.parse(res);
            console.log(res);
            if (res.state == 200) {
                $("#loginFailed").hide();
                loginDiv.hide();
                getSession();
            } else {
                $("#loginFailed").show();
            }
        },
        error: function(res) {
            console.log(res);
        }
    });
}

function importOrder()
{
    $.ajax({
        url: 'php/getAllReceiptId.php',
        type: "GET",
        
    })
    .done(function(result){
        let objs = JSON.parse(result);
        console.log(objs.data.length);
        for(let i=0;i<objs.data.length;i++){
            /* create div class="col" */
            let divCol=document.createElement("div");
            divCol.setAttribute("class","col");
            divCol.setAttribute("id","col-"+objs.data[i].receipt_id);
            document.getElementById("flex-container").appendChild(divCol);

            /* create div class="card text-black" */
            let divCard=document.createElement("div");
            divCard.setAttribute("class","card text-black");
            divCard.setAttribute("id","card-"+objs.data[i].receipt_id);
            divCol.appendChild(divCard);

            /* create div class="card-header" */
            let divCardHeader=document.createElement("div");
            divCardHeader.setAttribute("class","card-header");
            divCardHeader.setAttribute("id","cardHeader-"+objs.data[i].receipt_id);
            divCard.appendChild(divCardHeader);

            /* create div for content between */
            let divCardHeaderContent=document.createElement("div");
            divCardHeaderContent.setAttribute("class","d-flex justify-content-between");
            divCardHeader.appendChild(divCardHeaderContent);

            /* create h5 for meal form */
            let h5MealForm=document.createElement("h5");
            h5MealForm.setAttribute("class","card-title");
            h5MealForm.setAttribute("id","mealForm-"+objs.data[i].receipt_id);
            if(objs.data[i].takeout==0){
                h5MealForm.innerHTML="內用";
            }
            else{
                h5MealForm.innerHTML="外帶";
            }
            divCardHeaderContent.appendChild(h5MealForm);

            /* create h5 for number */
            let h5Number=document.createElement("h5");
            h5Number.setAttribute("class","card-title");
            h5Number.innerHTML="#"+objs.data[i].receipt_id;
            divCardHeaderContent.appendChild(h5Number);

            /* create div class="card-body" */
            let divCardBody=document.createElement("div");
            divCardBody.setAttribute("class","card-body");
            divCardBody.setAttribute("id","cardBody-"+objs.data[i].receipt_id);
            divCard.appendChild(divCardBody);
            createBodyElement(objs.data[i].receipt_id);
            //createBodyElement(1);

            /* create div class="card-footer" */
            let divCardFooter=document.createElement("div");
            divCardFooter.setAttribute("class","card-footer");
            divCardFooter.setAttribute("id","cardFooter-"+objs.data[i].receipt_id);
            divCard.appendChild(divCardFooter);

            /* create div class="btn-group dropup d-grid gap-2" */
            let divBtnGroup=document.createElement("div");
            divBtnGroup.setAttribute("class","btn-group dropup d-grid gap-2");
            divBtnGroup.setAttribute("id","btnGroup-"+objs.data[i].receipt_id);
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
            h4DropDownHeader.innerHTML="備註";
            ul.appendChild(lih4);
            lih4.appendChild(h4DropDownHeader);

            /* create li h5 for comment */
            let liComment=document.createElement("li");
            let h5Comment=document.createElement("h5");
            h5Comment.setAttribute("id","comment-"+objs.data[i].receipt_id);
            h5Comment.innerHTML=objs.data[i].comment;
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
            btnPayment.setAttribute("id","payment-"+objs.data[i].receipt_id);
            divButtonContent.appendChild(btnPayment);

            /* create button class="btn btn-warning btn-outline-dark" for delivery*/
            let btnDelivery=document.createElement("button");
            btnDelivery.setAttribute("type","button");
            btnDelivery.setAttribute("id","delivery-"+objs.data[i].receipt_id);
            divButtonContent.appendChild(btnDelivery);

            createStateButton(objs.data[i].receipt_id);
        }
        for(let i=0;i<objs.data.length;i++){
            $("#payment-"+objs.data[i].receipt_id).click(function(){
                console.log(objs.data[i].receipt_id);
                clickPaymentState(objs.data[i].receipt_id);
                createStateButton(objs.data[i].receipt_id);
                
            })
            $("#delivery-"+objs.data[i].receipt_id).click(function(){
                clickDeliveryState(objs.data[i].receipt_id);
                createStateButton(objs.data[i].receipt_id);
            })
        }
    })
}
function createStateButton(id){
    $.ajax({
        url: "php/getAllReceiptId.php",
        type: "GET"
    })
    .done(function(reslut){
        let objs=JSON.parse(reslut);
        console.log(objs)
        let index=0;
        while(objs.data[index].receipt_id!=id){
            ++index;
        }
        console.log(objs.data[index].receipt_id+"  "+id);
        if(objs.data[index].payment==1){
            $("#payment-"+id)
            .attr("type","button")
            .attr("class","btn btn-success")
            .attr("disabled","true")
            .html("已付款")
        }
        else{
            $("#payment-"+id)
            .attr("type","button")
            .attr("class","btn btn-warning btn-outline-dark")
            .html("未付款")
        }
        if(objs.data[index].delivery==1){
            $("#delivery-"+id)
            .attr("type","button")
            .attr("class","btn btn-success")
            .attr("disabled","true")
            .html("已送出")
        }
        else if(objs.data[index].delivery==0){
            $("#delivery-"+id)
            .attr("type","button")
            .attr("class","btn btn-warning btn-outline-dark")
            .html("未送出")
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
function createBodyElement(receiptId){
    $.ajax({
        url: "php/getSell.php",
        type: "POST",
        data: {"receiptId": receiptId,},
    })
    .done(function(reslut){
        let objs=JSON.parse(reslut);
        console.log(objs.data.length);
        for(let i=0;i<objs.data.length;i++){
            let divCardBodyBorder=document.createElement("div");
            divCardBodyBorder.setAttribute("class","card border-secondary mb-3 text-black");
            divCardBodyBorder.setAttribute("style","max-width: 18rem;");
            document.getElementById("cardBody-"+receiptId).appendChild(divCardBodyBorder);

            let cardbody=document.createElement("div");
            cardbody.setAttribute("class","card-body");
            divCardBodyBorder.appendChild(cardbody);

            let h5ProductName=document.createElement("h5");
            h5ProductName.setAttribute("class","title-card");
            h5ProductName.setAttribute("id","showProductName-"+objs.data[i].sell_id)
            cardbody.appendChild(h5ProductName);
            getProductName(objs.data[i].product_id,objs.data[i].sell_id);

            let h5ProductNum=document.createElement("h5");
            h5ProductNum.setAttribute("class","card-title text-end");
            h5ProductNum.innerHTML="×"+objs.data[i].num;
            cardbody.appendChild(h5ProductNum);
            

        }
    })
}
function getProductName(productId,sellId){
    $.ajax({
        url: "php/getProduct.php",
        type: "POST",
        data: {"productId": productId,},
    })
    .done(function(reslut){
        let objs=JSON.parse(reslut);
        document.getElementById("showProductName-"+sellId).innerHTML="品項:"+objs[0].product_name;
    })
}
function timeRemind(){
    let currentTime=new Date();
    $.ajax({
        url: "php/getAllReceiptId.php",
        type: "GET",
    })
    .done(function(reslut){
        let objs=JSON.parse(reslut);
        for(let i=0;i<objs.data.length;i++){
            let useTime=Date.parse(currentTime)-Date.parse(objs.data[i].create_time);
            let conversionMinute=Math.floor(useTime/(60*1000));
            if(conversionMinute>=5){
                document.getElementById("card-"+objs.data[i].receipt_id).setAttribute("class","card text-white bg-danger");
            }
        }
    })
}