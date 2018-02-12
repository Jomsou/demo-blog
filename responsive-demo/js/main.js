const oBtn = document.getElementById('btn1'),
      oUl = document.getElementById('nav');

let getContent = device=>{
    return window.getComputedStyle(document.body, ':after').getPropertyValue('content').
    indexOf(device)>-1;
}

let navRepsonsive = function(){
    if (getContent('small')) {
        oUl.classList.add('hide');
    }else {
        oUl.classList.remove('hide');
    }
}
oBtn.addEventListener('click', function(){
    oUl.classList.toggle('hide');
})

navRepsonsive();

window.addEventListener('resize', navRepsonsive);