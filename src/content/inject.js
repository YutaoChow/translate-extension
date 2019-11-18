window._ = function (str) {
    return str;
};
window.oncontextmenu = function () {
    window.postMessage('sf-select-text','翻译{0}英文');
    return false;
};
window.addEventListener("sf-translate-text", 
    function(e) { 
        console.log(e.data); 
    }, false);