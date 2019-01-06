$(document).ready(function () {

    $(".rep-item").each(function () {
        letter = $(this).find(".rep-name").html().slice(0, 1);
        $(this).find(".rep-ava").html(letter);
    })

    $(".card-num-format").each(function () {
        var foo = $(this).text().split("-").join(""); // remove hyphens
        if (foo.length > 0) {
            foo = foo.match(new RegExp('.{1,4}', 'g')).join(" ");
        }
        $(this).text(foo);
    })

})