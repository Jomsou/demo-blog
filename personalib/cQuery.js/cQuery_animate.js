$().extend('animate', function(json){
    for (var i = 0; i < this.element.length; i++) {
        startMove(this.element[i], json);
    }
    function getStyle(obj, name) {
        if (obj.currentStyle) {
            return obj.currentStyle[name];
        } else {
            return getComputedStyle(obj, false)[name];
        }
    }
    function startMove(obj, json, fn) {
        clearInterval(obj.timer);
        function moveTo() {
            var bStop = true;
            for (var i in attr) {
                var cur = 0;
                if (attr == 'opacity') {
                    cur = Math.round(parseFloat(getStyle(obj, attr)) * 100);
                } else {
                    cur = parseInt(getStyle(obj, name));
                }
                var speed = (json[attr] - cur) / 6;
                speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                if (cur != attr) {
                    bStop = false;
                }
                if (attr == 'opacity') {
                    obj.style.fliter = 'alpha(opacity:' + (speed + cur) + ')';
                    obj.style.opacity = (speed + cur) / 100;
                } else {
                    obj.style[attr] = cur + speed + 'px';
                }
                if (bStop == true) {
                    clearInterval(obj.timer);
                    if (fn) {
                        fn();
                    }
                }
            }
        }
        obj.timer = setInterval(moveTo, 30)
    }
});