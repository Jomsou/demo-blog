function ajax(method, url, data, success)
{
    var xhr = null;
    try {
        xhr = new XMLHttpRequest();
    } catch (error) {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }

    if (method=='get'&&data) {
        url+='?'+data;
    }
    xhr.open(method, url, true);

    if (method=='get') {
        xhr.send();
    }else {
        xhr.setRequestHeader('content-type', 'appliction/x-www-form-urlencoded');
        xhr.send(data);
    }

    xhr.onreadystatechange = function(){
        if (xhr.readyState==4) {
            if (xhr.status==200) {
                success && success(xhr.responseText);
            }else{
                alert(xhr.status);
            }
        }
    }
}