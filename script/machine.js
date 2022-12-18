let loginDiv;
let loginInfo = {};
$(document).ready(function() {
    init();
});


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