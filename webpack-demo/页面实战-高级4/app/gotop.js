
////////
var $=require("./jquery.js");
var GoTop=(function(){
    function _GoTop($ct){
      this.$ct=$ct;
      this.$target=$('<div class="go-top">回到顶部</div>')
      this.bindEvent()
      this.createNode()
    }
    _GoTop.prototype.bindEvent=function(){
      var _this=this;
      $(window).on('scroll',function(){
        var offset=$(window).scrollTop();
        if(offset>200){
          _this.$target.show();
        }else{
          _this.$target.hide();
        }
      })
      this.$target.on('click',function(){
        $(window).scrollTop(0)
      })
    }

    _GoTop.prototype.createNode=function(){
      this.$ct.append(this.$target)

    }

    return {
      init:function($ct){
        new _GoTop($ct)
      }
    }

})()


module.exports=GoTop;
