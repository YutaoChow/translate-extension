import Vue from 'vue';
import View from './view/form.vue';
import 'element-ui/lib/theme-chalk/index.css';

//通过Chrome插件的API加载字体文件 
(function insertElementIcons() {
    let elementIcons = document.createElement('style')
    elementIcons.type = 'text/css';
    elementIcons.textContent = ` @font-face {
        font-family: "element-icons"; src: url('${ window.chrome.extension.getURL("fonts/element-icons.woff")}')
        format('woff'), url('${ window.chrome.extension.getURL("fonts/element-icons.ttf ")}')
        format('truetype'); /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/ } `;
    document.head.appendChild(elementIcons);
})();

let formWindow;

function showWindow(string) {
    if (!formWindow) {
        let dom = document.createElement('div');
        dom.id = "sf-translate";
        document.body.appendChild(dom);
        formWindow = new Vue(View).$mount('#sf-translate');
        formWindow.$on('submit', (data) => {
            console.log(data);
            window.postMessage({
                type: 'sf-translate-text',
                chinese: data.chinese,
                english: data.english
            }, '*');
        })
    }
    formWindow.open(string);
}

window.addEventListener("message", function(e) {
    if (e.data && e.data.type === 'sf-select-text') {
        e.data && showWindow(e.data.text)
    }
}, false);

// //js注入
function injectCustomJs(jsPath) {
    jsPath = jsPath || 'js/inject.js';
    var temp = document.createElement('script');
    temp.setAttribute('type', 'text/javascript');
    // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js 
    temp.src = window.chrome.extension.getURL(jsPath);
    document.body.appendChild(temp);
}
injectCustomJs()