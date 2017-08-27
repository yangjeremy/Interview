define(['jquery','com/carousel','com/waterfall','com/gotop'],function($,Carousel,WaterFall,GoTop){
    Carousel.init($('.carousel'));
    WaterFall($('#pic-ct'));
    GoTop.init($('body'));

})
