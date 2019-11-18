import { Message, MessageBox } from 'element-ui'; 
// 通过Chrome插件的API加载字体文件 
(function insertElementIcons() { 
    let elementIcons = document.createElement('style') 
    elementIcons.type = 'text/css'; 
    elementIcons.textContent = ` @font-face {
        font-family: "element-icons"; src: url('${ window.chrome.extension.getURL("fonts/element-icons.woff")}')
        format('woff'), url('${ window.chrome.extension.getURL("fonts/element-icons.ttf ")}')
        format('truetype'); /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/ } `;
document.head.appendChild(elementIcons); })(); 

// MessageBox.alert('这是一段内容', '标题名称', { 
//         confirmButtonText: '确定', 
//         callback: action => { 
//             Message({ 
//                 type: 'info', 
//                 message: `action: ${ action }` }); 
//         }   
// })

window.addEventListener("sf-select-text", 
    function(e) { 
        console.log(e.data); 
    }, false);




//js注入
function injectCustomJs(jsPath) { 
    jsPath = jsPath || 'js/inject.js'; 
    var temp = document.createElement('script'); 
    temp.setAttribute('type', 'text/javascript'); 
    // 获得的地址类似：chrome-extension://ihcokhadfjfchaeagdoclpnjdiokfakg/js/inject.js 
    temp.src = chrome.extension.getURL(jsPath); 
    temp.onload = function() { 
        // 放在页面不好看，执行完后移除掉 
        this.parentNode.removeChild(this); 
    };
    document.head.appendChild(temp); 
}
injectCustomJs() 