$(document).ready(function() {
    init();
});

function init() {
    $.ajax({
        url: 'php/getSession.php',
        type: 'GET',
        success: function(res) {
            res = JSON.parse(res);
            if (res.state == 200) {

            } else {
                showLoginDiv();
            }
        },
        error: function(res) {
            console.log(res);
        }
    });
}

function showLoginDiv() {
    document.getElementById('loginDiv').show();
}

function showState(state) {
    for (let i = 0; i < $("#wrap").children().length; ++i) {
        if (i == state) {
            $(("#" + $("#wrap").children()[0].id)).show();
        } else {
            $(("#" + $("#wrap").children()[0].id)).hide();
        }
    }
}