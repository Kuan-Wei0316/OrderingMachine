let loginDiv;
let loginInfo = {};
let pdLabel = [];
let curLabel = "";
let productList;
let productData = [];
let cart = [];
let productMap = {};
$(document).ready(function() {
    init();
});


function init() {
    loginDiv = new bootstrap.Modal(document.getElementById("loginDiv"), {});
    getSession();
    $('#loginBtn').click(function() {
        postLogin($('#loginName').val(), $('#loginPwd').val());
    });
    $('#clearBtn').click(function() {
        cart = [];
        drawResult();
    });
    $('#sendBtn').click(function() {
        if (cart.length > 0) {
            postCreateReceipt();
        }
    });
    getLabel();
    getAllProduct();
    drawResult();
}

function postCreateReceipt() {
    $.ajax({
        url: 'php/createReceipt.php',
        type: 'POST',
        data: {
            comment: getComment(),
            takeout: ($('#takeoutBtn')[0].checked ? '1' : '0')
        },
        success: function(res) {
            res = JSON.parse(res);
            if (res.state == 200) {
                for (let i = 0; i < cart.length; ++i) {
                    postAddSell(res.receiptId, cart[i].id, cart[i].num);
                }
            }
            cart = [];
            drawResult();
            window.open('', '_blank');
        }
    })
}

function getComment() {
    let ret = "";
    for (let i = 0; i < cart.length; ++i) {
        ret += productMap[cart[i].id].product_name + ":" + cart[i].comment + ',<br>';
    }
    return ret;
}

function postAddSell(rId, pId, num) {
    $.ajax({
        url: 'php/addSell.php',
        type: 'POST',
        data: {
            productId: pId,
            num: num,
            receiptId: rId
        },
        success: function(res) {
            res = JSON.parse(res);
            if (res.state == 200) {;
            } else {
                console.log(res);
            }
        }
    })
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

function showState(state) {

}

function logout() {
    loginInfo = {};
    $.ajax({
        url: 'php/logout.php',
        type: 'GET',
        success: function(res) {},
        error: function(res) {
            console.log(res);
        }
    });
}

function getLabel() {
    $.ajax({
        url: "php/getLabel.php",
        type: 'GET',
        success: function(res) {
            res = JSON.parse(res);
            pdLabel = [];
            for (let i = 0; i < res.length; ++i) {
                pdLabel.push(res[i].label);
            }
            drawPdCard();
            drawProducts();
        }
    })
}

function drawPdCard() {
    console.log("draw");
    $('#pdLabelBar').html("");
    for (let i = 0; i < pdLabel.length; ++i) {
        $('#pdLabelBar').append(
            $('<button></button>')
            .attr('type', 'button')
            .addClass('btn')
            .addClass('btn-light')
            .addClass('m-1')
            .html(pdLabel[i])
            .click(function() {
                curLabel = pdLabel[i];
                drawProducts();
            })
        );
    }
}

function getAllProduct() {
    $.ajax({
        url: 'php/getAllProduct.php',
        type: 'GET',
        success: function(res) {
            res = JSON.parse(res);
            productData = res.data;
            productMap = {};
            for (let i = 0; i < productData.length; ++i) {
                productMap[productData[i].product_id] = productData[i];
            }
        }
    });
}

function drawProducts() {
    // <div class="card m-1 productCard">
    //                 <div class="card-header p-1">
    //                     <span class="card-text">Cola</span>
    //                 </div>
    //                 <div class="card-body w-100 p-0" style="background-image: url('upload/shark.png');background-size:cover;">
    //                 </div>
    //                 <div class="card-footer p-1">
    //                     <span class="card-text">$100</span>
    //                 </div>
    //             </div>
    console.log("drawProduct");
    if (curLabel == "") curLabel = pdLabel[0];
    $("#pdList").html("");
    for (let i = 0; i < productData.length; i++) {
        if (productData[i].product_label == curLabel) {
            $("#pdList").append(
                $('<div></div>')
                .addClass('card').addClass('m-1').addClass("productCard")
                .append(
                    $('<div></div>')
                    .addClass('card-header').addClass('p-1')
                    .append(
                        $('<span></span>')
                        .addClass('card-text')
                        .html(productData[i].product_name)
                    )
                ).append(
                    $('<div></div>')
                    .addClass('card-body').addClass('w-100').addClass('p-0')
                    .attr('style', ('background-image: url("' + productData[i].product_img + '");background-size:cover;'))
                ).append(
                    $('<div></div>')
                    .addClass('card-footer').addClass('p-1')
                    .append(
                        $('<span></span>')
                        .addClass('card-text')
                        .html(productData[i].product_price)
                    )
                ).click(function() {
                    putInCart(productData[i].product_id);
                })
            );
        }
    }


}

function putInCart(productId) {
    console.log("putinCart", productId);
    let idx = -1;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == productId) {
            idx = i;
            break;
        }
    }
    if (idx == -1) {
        let obj = {
            id: productId,
            num: 1,
            comment: ""
        }
        cart.push(obj);
    } else {
        ++cart[idx].num;
    }
    drawResult();
}

function drawResult() {
    // <div class="input-group mb-3">
    //     <span class="input-group-text">$</span>
    //     <span class="input-group-text">0.00</span>
    //<button class="btn btn-outline-secondary" type="button" id="button-addon1">Button</button>
    //     <input type="text" class="form-control" aria-label="Dollar amount (with dot and two decimal places)">
    // </div>

    $('#resultDiv').html("")
    for (let i = 0; i < cart.length; i++) {
        $('#resultDiv').append(
            $('<div></div>')
            .addClass('input-group border')
            .append(
                $('<span></span>')
                .addClass('input-group-text')
                .html(productMap[cart[i].id].product_name)
            )
            .append(
                $('<span></span>')
                .addClass('input-group-text')
                .html(cart[i].num + "份")
            )
            .append(
                $('<button></button>')
                .addClass('btn').addClass('btn-danger')
                .attr('type', 'button')
                .html("-1")
                .click(function() {
                    if (cart[i].num > 1) {
                        --cart[i].num;
                    } else {
                        let tmp = [];
                        for (let j = 0; j < i; ++j) {
                            tmp.push(cart.shift());
                        }
                        cart.shift();
                        for (let j = 0; j < tmp.length; ++j) {
                            cart.unshift(tmp.pop());
                        }
                    }
                    drawResult();
                }))
            .append(
                $('<input></input>')
                .addClass('form-control')
                .attr('type', 'text')
                .attr('placeholder', '備註')
                .val(cart[i].comment)
                .change(function() {
                    cart[i].comment = $(this).val();
                })
            )
        )
    }


}