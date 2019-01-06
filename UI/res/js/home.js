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

    $("#add-rep-neg").click(function () {
        $("#add-rep-modal").fadeOut("fast");
    })

    $("#card-remove").click(function () {
        $("#cremove-modal").fadeIn("fast");
    })

    $("#min-close").click(function () {
        $("#min-modal").fadeOut("fast");
    })

    $("#empty-close").click(function () {
        $("#empty-modal").fadeOut("fast");
    })

    $("#cremove-neg").click(function () {
        $("#cremove-modal").fadeOut("fast");
    })

    $("#cremove-pos").click(function () {
        $("#cremove-modal").fadeOut("fast");
    })

    $("#sign-out-btn").click(function () {
        $("#sout-modal").fadeIn("fast");
    })

    $("#sout-neg").click(function () {
        $("#sout-modal").fadeOut("fast");
    })

    $("#sout-pos").click(function () {
        $("#sout-modal").fadeOut("fast");
    })

    $("#transfer-act").click(function () {
        $("#transfer-modal").fadeIn("fast");
    })

    $("#transfer-close").click(function () {
        $("#transfer-modal").fadeOut("fast");
    })

    // Thêm ở đây

    $(".rep-info").find(".info").mouseenter(function () {
        $(this).parent().find(".transfer").fadeIn(200);
        $(this).fadeOut(200);
    })

    $(".rep-info").find(".transfer").mouseleave(function () {
        $(this).parent().find(".info").fadeIn(200);
        $(this).fadeOut(200);
    })

    $(".rep-info").find(".transfer").click(function () {
        $(this).parent().find(".info").fadeIn(200);
        $(this).fadeOut(200);
    })

    var menuToggleOff = function (self) {
        $(".rep-item").each(function () {
            letter = $(this).find(".rep-name").html().slice(0, 1);
            $(this).find(".rep-ava").html(letter);
        })
        var repItem = self.parent();
        // repItem.find(".rep-info").show();
        // repItem.find(".crud").hide();
        $(".rep-ava").removeClass("chosen");
    }

    var menuToggleOn = function (self) {
        var repItem = self.parent();
        self.addClass("chosen");
        repItem.find(".rep-info").hide();
        repItem.find(".crud").show();
        self.html("<img src='res/icons/rep-chosen.png'>");
    }

    var avaPressed = null;
    var itemPressed = null;

    $(".rep-ava").click(function () {
        self = $(this);

        if (!$(".rep-ava").hasClass("chosen")) {
            menuToggleOn(self);
            itemPressed = self;
        }
        else {
            if (self.hasClass("chosen")) {
                menuToggleOff(self);
            }
            else {
                menuToggleOff(itemPressed);
                menuToggleOn(self);
            }
        }





        // if (avaPressed === event.target) {
        //     alert(2);
        //     menuToggleOff(self);
        //     avaPressed = null;
        // }
        // else {
        //     alert(3);
        //     menuToggleOff(itemPressed);
        //     menuToggleOn(self);
        //     avaPressed = event.target;
        // }
    })

    $(".choose-card").click(function () {
        $(".choose-card").removeClass("chosen");
        $(this).addClass("chosen");
    })

    // Thêm ở đây

})