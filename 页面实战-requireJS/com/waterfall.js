define(['jquery'],function ($) {
    var water = (function(){
      function waterFall($data){
        var curPage = 1
        var perPageCount = 9
        var colSumHeight = []
        var nodeWidth = $('.item').outerWidth(true)
        var colNum = parseInt($data.width()/nodeWidth)
        for(var i = 0; i < colNum; i++){
        	colSumHeight[i] = 0
        }

        var isDataArrive = true

        start()

        function start(){

        	getData(function(newsList){
        		//console.log(newsList)
        		isDataArrive = true
        		$.each(newsList, function(idx, news){
        			var $node = getNode(news)
        			$node.find('img').load(function(){
        				$data.append($node)
        				//console.log($node, 'loaded...')
        				waterFallPlace($node)
        			})
        		})
        	})
        	isDataArrive = false
        }



        $('#load').on('click',function () {
          if(!isDataArrive) return
            start();
        })


        function getData(callback){
        		$.ajax({
        			url: 'http://platform.sina.com.cn/slide/album_tech',
        			dataType: 'jsonp',
        			jsonp:"jsoncallback",
        			data: {
        				app_key: '1271687855',
        				num: perPageCount,
        				page: curPage
        			}
        		}).done(function(ret){
        			if(ret && ret.status && ret.status.code === "0"){
        				callback(ret.data);   //如果数据没问题，那么生成节点并摆放好位置
        				curPage++
        			}else{
        				console.log('get error data');
        			}
        		});
        }


        function getNode(item){
        	var tpl = ''
        		tpl += '<li class="item">';
        		tpl += ' <a href="'+ item.url +'" class="link"><img src="' + item.img_url + '" alt=""></a>';
        		tpl += ' <h4 class="header">'+ item.short_name +'</h4>';
        		tpl += '<p class="desp">'+item.short_intro+'</p>';
        		tpl += '</li>';

        	return $(tpl)
        }

        function waterFallPlace($node){

        		var idx = 0,  //声明序号为0
        			  minSumHeight = colSumHeight[0];
        				//声明数组的第0个为最小值

        		for(var i=0;i<colSumHeight.length; i++){
        			//遍历这个数组
        			if(colSumHeight[i] < minSumHeight){
        				//当遍历到第i个时的高度小于原本的最小高度时
        				idx = i;//将这个i赋给这个序号
        				minSumHeight = colSumHeight[i];
        				//此时这个第i个的高度就是最小值
        			}
        		}

        		$node.css({
        			left: nodeWidth*idx,
        			top: minSumHeight,
        			opacity: 1
        		});
        		//开始摆放它的位置（CSS）

        		colSumHeight[idx] = $node.outerHeight(true) + colSumHeight[idx];
        		//数组的最小高度=元素的外边框高度+之前累加的高度
        		$data.height(Math.max.apply(null,colSumHeight));
             //容器的高度要撑开
        }





      }
      return waterFall
    })()
    return water
})
  /*



          var isDataArrive = true

          start()

          function start(){

          	getData(function(newsList){
          		//console.log(newsList)
          		isDataArrive = true
          		$.each(newsList, function(idx, news){
          			var $node = getNode(news)
          			$node.find('img').load(function(){
          				$('#pic-ct').append($node)
          				//console.log($node, 'loaded...')
          				waterFallPlace($node)
          			})
          		})
          	})
          	isDataArrive = false
          }




          function getData(callback){
              $.ajax({
                url: 'http://platform.sina.com.cn/slide/album_tech',
                dataType: 'jsonp',
                jsonp:"jsoncallback",
                data: {
                  app_key: '1271687855',
                  num: perPageCount,
                  page: curPage
                }
              }).done(function(ret){
                if(ret && ret.status && ret.status.code === "0"){
                  callback(ret.data);   //如果数据没问题，那么生成节点并摆放好位置
                  curPage++
                }else{
                  console.log('get error data');
                }
              });
          }


            start();

            $('#load').on('click',function () {
              if(!isDataArrive) return
                start();
            })



*/
