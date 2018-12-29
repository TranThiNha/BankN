$(document).ready(function () {

    $(".tab").click(function () {
        id = $(this).attr("id").replace("-tab", "");
        $(".tab").removeClass("tab-in");
        $(".tab").addClass("tab-out");
        $(this).addClass("tab-in");
        $(this).removeClass("tab-out");
        $(".tab-content").hide();
        $("#" + id).show();
    })

    $("#add-rep-btn").click(function () {
        $("#add-rep-modal").fadeIn("fast");
    })

    $("#add-rep-neg").click(function() {
        $("#add-rep-modal").fadeOut("fast");
    })

    $("#card-remove").click(function() {
        $("#cremove-modal").fadeIn("fast");
    })

    $("#min-close").click(function() {
        $("#min-modal").fadeOut("fast");
    })

    $("#empty-close").click(function() {
        $("#empty-modal").fadeOut("fast");
    })

    $("#cremove-neg").click(function() {
        $("#cremove-modal").fadeOut("fast");
    })

    $("#cremove-pos").click(function() {
        $("#cremove-modal").fadeOut("fast");
    })

    $("#sign-out-btn").click(function() {
        $("#sout-modal").fadeIn("fast");
    })

    $("#sout-neg").click(function() {
        $("#sout-modal").fadeOut("fast");
    })

    $("#sout-pos").click(function() {
        $("#sout-modal").fadeOut("fast");
    })

    $("#transfer-act").click(function() {
        $("#transfer-modal").fadeIn("fast");
    })

    $("#transfer-close").click(function() {
        $("#transfer-modal").fadeOut("fast");
    })

})