//获取非行间样式
function getStyle(obj, name) {
    if (obj.currentStyle) {
        //IE
        return obj.currentStyle[name];
    }
    else {
        //FF、Chrome
        return getComputedStyle(obj, false)[name];
    }
}
//基本运动
function Move(obj, attr, iTarget, fnEnd) {

    clearInterval(obj.timer);

    obj.timer = setInterval(function () {
        var cur = 0;
        var speed;
        if (attr == 'opacity') {
            cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
            speed = (iTarget - cur) / 10;
        }
        else {
            cur = parseInt(getStyle(obj, attr));
            speed = (iTarget - cur) / 2;
        }



        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

        if (iTarget == cur) {
            clearInterval(obj.timer);
            if (fnEnd) fnEnd();
        }
        else {
            if (attr == 'opacity') {

                obj.style.filter = 'alpha(opacity = ' + (cur + speed) + ')';//IE
                obj.style.opacity = (cur + speed) / 100; //chrome FF
            }
            else {
                obj.style[attr] = cur + speed + 'px';
            }
        }
    }, 30)
}
window.onload = function(){
    var oPlays = document.getElementById('plays');	//获取相关元素
    var oBtn_prev = document.getElementById('p_prev');	//左按钮
    var oBtn_next = document.getElementById('p_next');	//右按钮
    var oImg_ul = oPlays.getElementsByTagName('ul')[0];
    var oImg_li = oImg_ul.getElementsByTagName('li');

    var judge2 = false; //用于后面按钮判断，防止切图过程中鼠标多次点击
    var ofLeft = -2040; //运动初始值

    //按钮渐显渐隐
    oBtn_prev.onmouseover = function () {
        Move(this, 'opacity', 100);
    };
    oBtn_prev.onmouseout = function () {
        Move(this, 'opacity', 60);
    };
    oBtn_next.onmouseover = function () {
        Move(this, 'opacity', 100);
    };
    oBtn_next.onmouseout = function () {
        Move(this, 'opacity', 60);
    };

    //播放下张图片函数
    function autoPlay() {
        if (judge2) {
            judge2 = false;
            return;
        }
        else {
            ofLeft -= 1020;

            judge2 = true;

            Move(oImg_ul, 'left', ofLeft, function () {
                if (ofLeft == -11220) {
                    oImg_ul.style.left = '-2040px';
                    ofLeft = -2040;
                }
                judge2 = false;
            });
        }
    }
    function lastPlay() {
        if (judge2) {
            judge2 = false;
            return;
        }
        else {
            ofLeft += 1020;

            judge2 = true;

            Move(oImg_ul, 'left', ofLeft, function () {
                if (ofLeft == -1020) {
                    oImg_ul.style.left = '-10200px';
                    ofLeft = -10200;
                }
                judge2 = false;
            });
        }
    }
    //上一张图片按钮
    oBtn_prev.addEventListener('click', function () {
        lastPlay();
    });
    //下一张图片按钮
    oBtn_next.addEventListener('click', function () {
        autoPlay();
    });
    //自动播放幻灯片
    setInterval(autoPlay, 5000);
}