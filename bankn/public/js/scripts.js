$(document).ready(function(){

    $(".rep-item").each(function () {
        letter = $(this).find(".rep-name").html().slice(0, 1);
        $(this).find(".rep-ava").html(letter);
    })

})