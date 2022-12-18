let loginDiv;
let loginInfo = {};
let pdLabel = [];
let curLabel = "";

$(document).ready(function() {
    init();
});


function init() {
    loginDiv = new bootstrap.Modal(document.getElementById("loginDiv"), {});
    getSession();
    $('#loginBtn').click(function() {
        postLogin($('#loginName').val(), $('#loginPwd').val());
    });
    getLabel();
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
            if (curLabel == "") {
                curLabel = pdLabel[0];
            }
            drawPdCard();
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

            })
        );
    }
}

function getProduct() {
    $.ajax({
        url: 'php/getProduct.php',
        type: 'POST',
        data: {

        },
        success: function(res) {

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
    $("#pdList").html("");

}