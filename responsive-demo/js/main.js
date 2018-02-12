/* 获取元素 */
const oBtn = document.getElementById('btn1'),
      oUl = document.getElementById('nav');
/* 判断内容的函数，用于后面的设备适配 */
let getContent = device=>{
    return window.getComputedStyle(document.body, ':after').getPropertyValue('content').
    indexOf(device)>-1;
}
/* 响应式效果函数 */
let navRepsonsive = function(){
    if (getContent('small')) {
        oUl.classList.add('hide');
    }else {
        oUl.classList.remove('hide');
    }
}
/* 点击右侧按钮后的效果 */
oBtn.addEventListener('click', function(){
    oUl.classList.toggle('hide');
})
/* 初始化响应式 */
navRepsonsive();
/* 当窗口改变尺寸时，执行响应式函数 */
window.addEventListener('resize', navRepsonsive);