$(document).ready(function () {

    var filled = 0;

    $("#username").keyup(function() {
        if ($(this).val() != "") filled = 1;
        if ($("#password").val() != "") $("#login-btn").removeAttr("disabled");
    })

    $("#password").keyup(function() {
        if ($(this).val() != "") filled = 1;
        if ($("#username").val() != "") $("#login-btn").removeAttr("disabled");
    })

    $("#login-btn").click(function() {
        $("#failure-modal").fadeIn("fast");
    })

    $("#fmodal-close").click(function() {
        $("#failure-modal").fadeOut("fast");
    })

})