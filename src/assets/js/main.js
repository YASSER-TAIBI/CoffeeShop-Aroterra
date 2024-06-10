
    document.addEventListener('DOMContentLoaded', function() {
    const selectElement = document.querySelector('.custom-select');

    selectElement.addEventListener('change', function() {
    const options = selectElement.querySelectorAll('option');
    options.forEach(option => {
    option.style.color = option.selected ? 'white' : 'black';
});
});

    // Initial setup to ensure the selected option is white
    const initialOptions = selectElement.querySelectorAll('option');
    initialOptions.forEach(option => {
    option.style.color = option.selected ? 'white' : 'black';
});
});

(function ($) {
    "use strict";

    // Date and time picker
    $('.date').datetimepicker({
        format: 'L'
    });
    $('.time').datetimepicker({
        format: 'LT'
    });

    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        margin: 30,
        dots: true,
        loop: true,
        center: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });

    // Back to top
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // Menu tabs
    $(function() {
        $("#tabs").tabs();
    });


})(window.jQuery);