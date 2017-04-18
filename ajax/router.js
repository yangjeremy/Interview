

/**
 * 发送 GET 请求， 无参数
 * GET /hello
 * 返回响应数据
 */
app.get('/loadMore', function(req, res) {
	var curIdx = req.query.index,
		  len = req.query.lenth;
	var data = [];

	for(var i=0; i<len ;i++){
		data.push('新内容'+(parseInt(curIdx)+i));
	}
	res.send(data);
});
