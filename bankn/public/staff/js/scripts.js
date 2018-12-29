$(document).ready(function(){

    $(".acc-item").each(function () {
        letter = $(this).find(".acc-name").html().slice(0, 1);
        $(this).find(".acc-ava").html(letter);
    })
    
})