window._ = function(str) {return str}
setTimeout(function() {
    console.log('start');
    let dom = document.createElement('div');
    dom.innerText = window._('中文{0}英文','于涛');
    document.body.appendChild(dom);
},3000)