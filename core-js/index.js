$(document).ready(function() {
    $('.js-trigger').on('click', function() {
        $('html').toggleClass('show-me');
    });

    $('.view-online-users').mouseenter(function() {
        var x = $('.view-online-users').width() + 10;
        $('.view-online-users').width(x);
    });

    $('.view-online-users').mouseleave(function() {
        var x = $('.view-online-users').width() - 10;
        $('.view-online-users').width(x);
    });
});

$(document).on("click", ".chatbox-header", function() {
    var newBottom = ($(this).closest('.chatbox').css('bottom') == '-325px') ? '0px' : '-325px';
    $(this).closest('.chatbox').animate({'bottom':newBottom}, 200);
});