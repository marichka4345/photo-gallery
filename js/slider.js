$(function() {
    animateDownArrow();
    setSliderHeight();
    activateSlider();
    $(window).on('resize', setSliderHeight);
});

function animateDownArrow() {
    var arrDown = $('.scroll-btn');
    setInterval(function() {
        arrDown.fadeToggle('slow', 'linear');
    }, 1000);
}

function setSliderHeight() {
    $('.slider').css('height', $(window).innerHeight());
    $('.slider-item img').css('height', $('.slider').css('height'));
}

function activateSlider() {
    var currIndex = 1,
        prevIndex = 0,
        items = $('.slider-item'),
        itemsLength = items.length;

    function moveSlider() {
        items.eq(prevIndex).removeClass('active');
        items.eq(currIndex).addClass('active');
        prevIndex = currIndex;
        currIndex++;
        if (currIndex == 6) {
            currIndex = 0;
        }
    }

    var interval;

    function autoDisplay() {
        interval = setInterval(moveSlider, 5000);
    }
    autoDisplay();

    $('.slider-control').click(function() {
        clearInterval(interval);
        if ($(this).hasClass('prev')) {
            prevIndex = currIndex - 1;
            if ((currIndex -= 2) < 0) {
                currIndex = 6 + currIndex;
            }
        }
        moveSlider();
        autoDisplay();
    });
}