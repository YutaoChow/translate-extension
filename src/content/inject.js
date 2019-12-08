/**
 * @author zhouyutao
 */

import { saveData, initI18n } from './util.js';

let menu, anchorNode;
/**
 * 鼠标右键菜单
 * @param {Object} e 浏览器事件
 * @param {Object} node  鼠标选中节点
 * @param {String} string 选中的字符
 * @return {*} 返回
 */
function createMenu(e, string) {
    // let modal;
    menu = document.createElement('div');
    menu.innerText = '翻译';
    menu.onclick = function() {
        window.postMessage({
            type: 'sf-select-text',
            text: string
        }, '*');
    };
    menu.style.cssText = `
        width: 60px;
        border-radius: 4px;
        overflow: hidden;
        box-shadow: 5px 10px 20px rgba(0, 0, 0, 0.15);
        background:#5383ed;
        position:fixed;
        cursor: pointer;
        text-align: center;
        left:${e.clientX}px;
        top:${e.clientY}px;`;
    document.body.appendChild(menu);
}

/**
 *  初始化事件
 *  @return {*} 返回
 */
function initEvents() {
    window.onclick = function() {
        if (menu) {
            document.body.removeChild(menu);
            menu = null;
        }
    };
    window.oncontextmenu = function(e) {
        let selection = document.getSelection(),
            string = selection.toString();
        anchorNode = selection.anchorNode;
        if (string && !menu) {
            createMenu(e, string);
            return false;
        }
    };
    window.addEventListener("message", function(e) {
        let data = e.data;
        if (data.type && data.type === 'sf-translate-text') {
            anchorNode && (anchorNode.textContent = data.english);
            saveData(data.chinese, data.english);
        }
    }, false);
}

initEvents();

initI18n();