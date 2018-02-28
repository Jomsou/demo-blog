window.onload = function () {
    let ex = new Little('div1');

    var oPlays = document.getElementById('plays');	//获取相关元素
    var oBtn_prev = document.getElementById('p_prev');	//左按钮
    var oBtn_next = document.getElementById('p_next');	//右按钮
    var oImg_ul = oPlays.getElementsByTagName('ul')[0];
    var oImg_li = oImg_ul.getElementsByTagName('li');

    var judge2 = false; //用于后面按钮判断，防止切图过程中鼠标多次点击
    var ofLeft = -2040; //运动初始值

    //按钮渐显渐
    oBtn_prev.onmouseover = function () {
        ex.startMove(this, {'opacity': 100});
    };
    oBtn_prev.onmouseout = function () {
        ex.startMove(this, {'opacity': 60});
    };
    oBtn_next.onmouseover = function () {
        ex.startMove(this, {'opacity': 100});
    };
    oBtn_next.onmouseout = function () {
        ex.startMove(this, {'opacity': 60});
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

            ex.startMove(oImg_ul, {'left': ofLeft}, function () {
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

            ex.startMove(oImg_ul, {'left': ofLeft}, function () {
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
    //ajax test
    ex.ajax('post', 'data/test.json', new Date(), function (str) {
        console.log(str);
    })
}