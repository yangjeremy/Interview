
var $=require("./jquery.js")
var Carousel=require("./carousel.js");
var GoTop=require("./gotop.js");
var Water=require("./waterfall.js");


Carousel.init($('.carousel'));
GoTop.init($('body'));
Water($('#pic-ct'));
