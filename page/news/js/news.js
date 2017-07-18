+function ($) {
    $('.select').niceSelect();

    $("#letter-list li.letter-item").click(function(){
        $(this).toggleClass("letter-open");
        $(this).siblings("li.letter-item").removeClass("letter-open");
    })
}(jQuery);
