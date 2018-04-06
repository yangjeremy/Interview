function ajax(opts) {
    opts.success = opts.success || function () { };
    opts.error = opts.error || function () { };
    opts.type = opts.type || 'get';
    opts.dataType = opts.dataType || 'json';
    opts.data = opts.data || {};

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.status === 200 || xmlhttp.status === 304) {
            if (opts.dataType === 'text') {
                opts.success(xmlhttp.responseText)
            }
            if (opts.dataType === 'json') {
                var json = JSON.parse(xmlhttp.responseText);
                opts.success(json);
            }
        } else {
            opts.error();
        }
    }

    var dataStr = '';
    for (var key in opts.data) {
        dataStr += key + '=' + opts.data[key] + '&';
    }
    dataStr = dataStr.substr(0, dataStr.length - 1);
    if (opts.type.toLowerCase() === 'post') {
        xmlhttp.open(opts.type, opts.url, true);
        xmlhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xmlhttp.send(dataStr);
    }
    if (opts.type.toLowerCase() === 'get') {
        xmlhttp.open(opts.type, opts.url + '?' + dataStr, true);
        xmlhttp.send()
    }
}
document.querySelector('#btn').addEventListener('click', function () {
    ajax({
        url: '/login',   //接口地址
        type: 'get',               // 类型， post 或者 get,
        data: {
            username: 'xiaoming',
            password: 'abcd1234'
        },
        success: function (ret) {
            console.log(ret);       // {status: 0}
        },
        error: function () {
            console.log('出错了')
        }
    })
});