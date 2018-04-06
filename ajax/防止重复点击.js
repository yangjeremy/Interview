var isDataArrive = false;
btn.addEventListener('click', function () {
    if (isDataArrive) { return }
    isDataArrive = true;
    xhr = new XMLHttpRequest();
    xhr.onreadystate = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 304) {
                //do something 
            } else {
                console.log('出错了！')
            }
            isDataArrive = false;
        }
    }
    xhr.open('.....')
    shr.send()
})


//点击按钮，使用 ajax 获取数据，如何在数据到来之前防止重复点击