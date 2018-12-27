$(document).ready(function () {


    $("#rep-search-btn").click(function () {
        $("#rep-search-modal").fadeIn("fast");
    })

    $("#rep-search-close").click(function () {
        $("#rep-search-modal").fadeOut("fast");
    })

    $("#otp-veri").click(function () {
        $("#otp-modal").fadeIn("fast");
    })

    $("#otp-resend").click(function () {
        var counter = 30;
        var interval = setInterval(function () {
            counter--;
            if (counter >= 0) {
                $("#otp-time").html(counter);
                $("#otp-resend").css("pointer-events", "none")
            }
            if (counter === 0) {
                $("#otp-resend").css("pointer-events", "auto")
                $("#otp-time").html(30);
                clearInterval(counter);
            }
        }, 1000);
    })

    $("#otp-neg").click(function () {
        $("#otp-modal").fadeOut("fast");
    })

    $("#otp-pos").click(function() {
        $("#otp-modal").fadeOut("fast");
        $("#success-modal").fadeIn("fast");
    })

    $("#smodal-close").click(function() {
        $("#success-modal").fadeOut("fast");
    })

    $("#fmodal-close").click(function() {
        $("#failure-modal").fadeOut("fast");
    })

})