$(document).ready(function () {
    $("#kontakt_form").click(function () {
        $(".Kontakt").show(200);
        $('html, body').css({
            overflow: 'hidden',
            height: '100%'
        })
    });
    $("#close_form").click(function () {
        $(".Kontakt").hide(200);
        $("#FullName").value = "";
        $("#Email").value = "";
        $("#ReceiveNewsletter").value = "";
        $("#Message").value = "";
        $('html, body').css({
            overflow: 'auto',
            height: 'auto'
        })
    });
});

