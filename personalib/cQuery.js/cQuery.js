;(function(){
    //cQuery主函数
    var cQuery = function (elm) {
        this.elements = [];
        switch (typeof elm) {
            case 'function':
                addHandler(window, 'load', elm);
                break;
            case 'string':
                switch (elm.charAt(0)) {
                    case '#':
                        var obj = document.getElementById(elm.substring(1));
                        this.elements.push(obj);
                        break;
                    case '.':
                        this.elements = getClass(document, elm.substring(1));
                    default:
                        this.elements = document.getElementsByTagName(elm);
                        break;
                }
                break;
            case 'object':
                this.elements.push(elm);
                break;
        }
    }
    //添加事件句柄函数
    var addHandler = function(obj, type, handler) {
        if (obj.addEventListener) {
            return obj.addEventListener(type, handler);
        } else if (obj.attachEvent) {
            return obj.attachEvent('on' + type, handler);
        } else {
            return obj['on' + type] = handler;
        }
    }
    //获取类函数--getClass
    var getClass = function (oParent, sClass) {
        var aEle = document.getElementsByTagName('*');
        var aResults = [];
        for (var i = 0; i < aEle.length; i++) {
            if (aEle[i].className == sClass) {
                aResults.push(aEle[i]);
            }
        }

        return aResults;
    }
    //获取非行间样式
    var getStyle = function (obj, name) {
        if (obj.currrentStyle) {
            return obj.currrentStyle[name];
        } else {
            return getComputedStyle(obj, false)[name];
        }
    }
    //getIndex函数
    var getIndex = function (obj) {
        var aBrother = obj.parentNode.children;
        for (var i = 0; i < aBrother.length; i++) {
            if (aBrother[i] == obj) {
                return i;
            }
        }
    }
    //appendArr函数
    var appendArr = function (arr1, arr2) {
        for (var i = 0; i < arr2.length; i++) {
            arr1.push(arr2[i]);
        }
    }
    cQuery.prototype = {
        //show函数
        show: function () {
            for (var i = 0; i < this.elements.length; i++) {
                this.elements[i].style.display = 'block';
            }

            return this;
        },
        //hide函数
        hide: function () {
                for (var i = 0; i < this.elements.length; i++) {
                    this.elements[i].style.display = 'none';
                }

                return this;
        },
        //hover函数
        hover: function (fn) {
                for (var i = 0; i < this.elements.length; i++) {
                    addHandler(this.elements[i], 'mouseover', fn);
                    addHandler(this.elements[i], 'moveout', fn);
                }

                return this;
            },
        //click函数
        click: function (fn) {
                for (var i = 0; i < this.elements.length; i++) {
                    addHandler(this.elements[i], 'click', fn);
                }

                return this;
            },
        //css函数
        css: function (attr, value) {
                if (arguments.length == 2) {
                    for (var i = 0; i < this.elements.length; i++) {
                        this.elements[i][attr] = value;
                    }
                } else {
                    if (typeof attr == 'string') {
                        return getStyle(this.elements[0], attr);
                    } else {
                        var k = '';
                        for (k in attr) {
                            this.elements[i].style[k] = attr[k];
                        }
                    }
                }

                return this;
            },
        //attr函数
        attr: function (attr, value) {
                if (arguments.length == 2) {
                    for (var i = 0; i < this.elements.length; i++) {
                        this.elements[i][attr] = value;
                    }
                } else {
                    return this.elements[0][attr];
                }

                return this;
            },
        //eq函数
        eq: function (n) {
                return $(this.elements[n]);
            },
        //find函数
        find: function (str) {
            var aResults = [];
            for (var i = 0; i < this.elements.length; i++) {
                switch (str.charAt(0)) {
                    case '.':	//class
                        var aEle = getByClass(this.elements[i], str.substring(1));

                        aResult = aResult.concat(aEle);
                        break;
                    default:	//标签
                        var aEle = this.elements[i].getElementsByTagName(str);

                        //aResult=aResult.concat(aEle);
                        appendArr(aResult, aEle);
                }
            }

            var newVquery = $();

            newVquery.elements = aResult;

            return newVquery;
        },
        //index函数
        index: function () {
            return getIndex(this.elements[0]);
        },
        //bind函数
        bind: function (type, fn) {
            for (var i = 0; i < this.elements.length; i++) {
                addHandler(this.elements[i], type, fn);
            }
        },
        //extend函数
        extend: function (name, fn) {
            this.elements[name] = fn;
        }
    }
    //$函数
    function $(elm) {
        return new cQuery(elm);
    }
    window.cQuery = cQuery; 
})()