$(function() {
    setTopBlockHeight();
    
    setMapTrianglePosition();
    $(window).on('resize', setTopBlockHeight);
});
function setTopBlockHeight() {
    var headerHeight = parseFloat($('.main-header').outerHeight()),
                windowHeight = parseFloat($(window).innerHeight());
    $('.main-header').next().css({
        'paddingTop': headerHeight + 'px',
        'height': windowHeight + 'px'
    });
}

function setMapTrianglePosition() {
    var mapTriangle = $('.map-triangle');
    var borderWidth = parseFloat(mapTriangle.css('border-left-width').split(' ')[0]);
    var parentHeight = parseFloat(mapTriangle.parent().height());
    mapTriangle.css('top', parentHeight / 2 - borderWidth + 'px');
}