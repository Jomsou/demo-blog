function ajax(method, url, data, success) {
    //1.创建服务
    var xhr = null;
    try {
        xhr = new XMLHttpRequest();
    } catch (error) {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }
    //2.判断提交方法，get方法url数据处理
    if (method == 'get' && data) {
        url += '?' + data;
    }
    //3.打开服务
    xhr.open(method, url, true);
    //4.发送服务
    if (method == 'get') {
        xhr.send();
    } else {
        xhr.setRequestHeader('content-type', 'appliction/x-www-form-urlencoded');
        xhr.send(data);
    }
    //5.接收响应
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                success && success(xhr.responseText);
            } else {
                alert(xhr.status);
            }
        }
    }
}