$(document).ready(function() {
    //Set the carousel options
    $('#quote-carousel').carousel({
        pause: true,
        interval: false
    })
        .on('slide.bs.carousel', function (e) {
        var nextH = $(e.relatedTarget).height();
            $(this).find('div.active').parent().animate({ height: nextH }, 500);
    });
});
