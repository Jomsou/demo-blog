; (function () {
    let Little = (id) => {
        /*------------------------attribute--------------------------*/
        let oDiv = document.getElementById(id);
        this.aBtn = oDiv.getElementsByTagName('input');
        this.aDiv = oDiv.getElementsByTagName('div');

        let _this = this;
        for (let i = 0; i < this.aBtn.length; i++) {
            this.aBtn[i].index = i;
            this.aBtn[i].addEventListener('click', function () {
                _this.tabSwitch(this);
            }, false)
        }
    };
    /*------------------------getStyle--------------------------*/
    //获取非行间样式
    let getStyle = (obj, name) => {
        if (obj.currentStyle) {
            //IE
            return obj.currentStyle[name];
        }
        else {
            //FF、Chrome
            return getComputedStyle(obj, false)[name];
        }
    };
    /*------------------------getClass--------------------------*/
    //获取类名class
    let getClass = (oParent, sClass) => {
        let aEle = oParent.getElementsByTagName('*');
        let aResult = [];

        for (let i = 0; i < aEle.length; i++) {
            if (aEle[i].className == sClass) {
                aResult.push(aEle[i]);
            }
        }

        return aResult;
    };
    Little.prototype = {
        /*-----------------------tabSwitch---------------------------*/
        tabSwitch: (oBtn) => {
            for (var i = 0; i < this.aBtn.length; i++) {
                this.aBtn[i].className = '';
                this.aDiv[i].style.display = 'none';
            }
            oBtn.className = 'active';
            this.aDiv[oBtn.index].style.display = 'block';
        },
        /*------------------------startMove--------------------------*/
        //完美运动框架
        startMove: (obj, json, fnEnd) => {
            clearInterval(obj.timer);
            obj.timer = setInterval(function () {
                var bStop = true;		//假设：所有值都已经到了

                for (var attr in json) {
                    var cur = 0;

                    if (attr == 'opacity') {
                        cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
                    }
                    else {
                        cur = parseInt(getStyle(obj, attr));
                    }

                    var speed = (json[attr] - cur) / 6;
                    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

                    if (cur != json[attr])
                        bStop = false;

                    if (attr == 'opacity') {
                        obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
                        obj.style.opacity = (cur + speed) / 100;
                    }
                    else {
                        obj.style[attr] = cur + speed + 'px';
                    }
                }

                if (bStop) {
                    clearInterval(obj.timer);

                    if (fnEnd) fnEnd();
                }
            }, 30);
        },
        /*------------------------ajax.js--------------------------*/
        ajax: (method, url, data, success) => {
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
        },
        /*------------------------cookie--------------------------*/
        /* 设置cookie */
        setCookie: (name, value, iDay) => {
            var oDate = new Date();
            oDate.setDate(oDate.getDate() + iDay);

            document.cookie = name + '=' + value + ';expires=' + oDate;
        },
        /* 获取cookie */
        getCookie: (name) => {
            var arr = document.cookie.split('; ');

            for (var i = 0; i < arr.length; i++) {
                var arr2 = arr[i].split('=');

                if (arr2[0] == name) {
                    return arr2[1];
                }
            }

            return '';
        },
        /* 删除cookie */
        removeCookie: (name) => {
            setCookie(name, 1, -1);
        },
        /*--------------------generator's runner---------------------*/
        /*
        使用实例：runner(function *(){
          let data1=yield $.ajax({url: xxx, dataType: 'json'});
          let data2=yield $.ajax({url: xxx, dataType: 'json'});
          let data3=yield $.ajax({url: xxx, dataType: 'json'});
          console.log(data1, data2, data3);
        });
        注意要引进jq
        */
        runner: (_gen) => {
            return new Promise((resolve, reject) => {
                var gen = _gen();

                _next();
                function _next(_last_res) {
                    var res = gen.next(_last_res);

                    if (!res.done) {
                        var obj = res.value;

                        if (obj.then) {
                            obj.then((res) => {
                                _next(res);
                            }, (err) => {
                                reject(err);
                            });
                        } else if (typeof obj == 'function') {
                            if (obj.constructor.toString().startsWith('function GeneratorFunction()')) {
                                runner(obj).then(res => _next(res), reject);
                            } else {
                                _next(obj());
                            }
                        } else {
                            _next(obj);
                        }
                    } else {
                        resolve(res.value);
                    }
                }
            });
        }
    };
    window.Little = Little; // Little is JavaScript Asynchronous (callings) Synchronizer
})();