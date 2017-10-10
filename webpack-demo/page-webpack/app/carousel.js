var $=require("./jquery.js");
var Carousel=(function(){
  function _Carousel($ct){
    this.$ct = $ct;
    this.init();
    this.bind();
    this.autoPlay();
  }
  _Carousel.prototype.autoPlay=function(){
    var _this=this;
    _this.clock=setInterval(function(){
      _this.playNext();
    },2500)
    }
  _Carousel.prototype.stopPlay=function(){
    var _this=this;
    clearInterval(this.clock)
  }
  _Carousel.prototype.init = function(){
    var $imgCt = this.$imgCt = this.$ct.find('.img-ct'),
        $preBtn = this.$preBtn = this.$ct.find('.btn-pre'),
        $nextBtn = this.$nextBtn = this.$ct.find('.btn-next'),
        $bullet = this.$bullet = this.$ct.find('.bullet');
        clock=this.clock;
        $btn=this.$btn=this.$ct.find('.btn');
    var $firstImg = $imgCt.find('li').first(),
        $lastImg = $imgCt.find('li').last()

    this.curPageIndex = 0
    this.imgLength = $imgCt.children().length
    this.isAnimate = false;
    this.imgWidth = $('body').width();
    this.$imgCt.find('li').width(this.imgWidth);
    //需要把图片都设置为一样的宽度
    //适用于图片大小是一样的
    $imgCt.prepend($lastImg.clone());
    $imgCt.append($firstImg.clone());

   $imgCt.width(this.imgWidth*$imgCt.children().length)
    $imgCt.css({"left":0-this.imgWidth});
  };
  _Carousel.prototype.bind = function(){
    var _this=this;
    $btn.on('click',function(){
        _this.stopPlay();
        if($(this).hasClass('btn-pre')){
            _this.playPre();
          }else if($(this).hasClass('btn-next')){
              _this.playNext();
          }
             _this.autoPlay();
          })


          _this.$bullet.on('click','li',function(){
              _this.stopPlay();
                var curIndex=$(this).index();
                var step=curIndex-_this.curPageIndex;
                if(curIndex>_this.curPageIndex){
                  _this.playNext(step)
                }else if(curIndex<_this.curPageIndex){
                 _this.playPre(-step)
              }
                 _this.autoPlay();
              })
    // this.playAuto();
  };
  _Carousel.prototype.playPre = function(n){
    var _this = this;
    if (this.isAnimate) return;
    this.isAnimate = true

    var n=n||1;
    this.$imgCt.animate({
        left: '+='+this.imgWidth*n
    }, function() {
      _this.curPageIndex=_this.curPageIndex-n;
      if (_this.curPageIndex < 0) {
          _this.$imgCt.css('left', -_this.imgWidth * _this.imgLength);
          _this.curPageIndex = _this.imgLength - 1
        }
        _this.setBullet()
        _this.isAnimate = false;
    })

  };
  _Carousel.prototype.playNext = function(n){
    var _this = this;
    if (this.isAnimate) return;
    this.isAnimate = true;

    // console.log(this);
    var n=n||1;
    this.$imgCt.animate({
    left: '-='+this.imgWidth*n
   }, function() {
   _this.curPageIndex=_this.curPageIndex+n;
   if (_this.curPageIndex === _this.imgLength) {
         _this.$imgCt.css({
               'left': 0-_this.imgWidth
                 })
     _this.curPageIndex = 0
           }
     _this.isAnimate = false;
     _this.setBullet();
         })

  };

  _Carousel.prototype.setBullet = function(){
    this.$bullet.children()
                .removeClass('active') /*它们对应的标记点*/
                .eq(this.curPageIndex)/*对应的序号*/
                .addClass('active')
  };


  return {
    init:function($ct){
        $ct.each(function(index,node){
            //注意each里面的node是原生dom元素，需要用$(node)包裹才是jq元素
            new _Carousel($(node));
        })
    }
  }
})()


module.exports=Carousel;
