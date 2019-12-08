/**
 *@author zhouyutao
 */


/**
 *  获取数据
 *  @return {String} 返回数据
 */
export function getData() {
    return window.localStorage.getItem('sf_auto_translate') || '{}';
}

/**
 *  获取保存数据数据
 *  @param {String} chinese 中文字符串
 *  @param {String} english 英文字符串
 *  @return {*} 返回
 */
export function saveData(chinese, english) {
    let data = JSON.parse(getData());
    window.localStorage.setItem('sf_auto_translate', JSON.stringify({
        ...data,
        [chinese]: english
    }));
}

/**
 * 清除保存数据数据
 *  @return {*} 返回
 */
export function clearData() {
    window.localStorage.setItem('sf_auto_translate', '');
}

/**
 *  是否展示英语
 *  @return {Boolean} 是否展示英语
 */
// function isEnglish () {
// // 国际化：地址上配置 ?lang=en_US 开启英文模式
//     let lang = location.search.match(/lang=(\w+)/);

//     if (lang && lang[1] === 'en_US') {
//         return true;
//     }
//     return false;
// }

/**
 * _ 中英文替换函数
 * @param {String} str    _('我是中文{0}、{1}', 'replace0', 'replace1')
 * @returns {String}      替换后的字符串
 * @return {*} 返回
 */
export function _(str) {

    let langMap = JSON.parse(getData()) || {};

    if (langMap && langMap.hasOwnProperty(str)) {
        str = langMap[str];
    }
    return str
        /**
         * 字串中可以包含形如 {#mark#} 的文本，它的作用是用于附加额外语境信息。
         * 例如中文里“启用”，可以是形容词，表示此条记录启用；也可以是动词，点击即启用此记录；
         * 如果没有额外标识，它们翻译成英文只能有一个结果，但实际上它们应该分别翻译为：“Enabled”与“Enable”
         * 有额外标识后，翻译表中，就是这样的了：
         * “启用{#adj#}” -> “Enabled”
         * “启用{#verb#}” -> “Enable”
         * 如果没有翻译表，则自动去掉额外标识，翻译为“启用”
         */
        // return str.replace(/\{(\d+|#\w+#)\}/g, function (m, i) {
        //     i = parseInt(i, 10);
        //     if (isNaN(i)) {
        //         return '';
        //     }
        //     if (i >= 0 && i < args.length) {
        //         return args[i];
        //     }
        //     return m;
        // });
}


/**
 * 初始化中英文，全局注册 _()
 * @return {*} 返回
 */
export function initI18n() {
    if (typeof window !== 'undefined') {
        window._ = _;

        // let old;
        // if (window._) {
        //     // logger.log('function _ () {} found...');
        //     // old = window._;
        //     window._ = function(str, ...args) {
        //         return _(str, ...args);
        //         // let langMap = isEnglish() ? JSON.parse(getData()) : {};

        //         // return langMap.hasOwnProperty(str) ? _(str, ...args) : old(str, ...args);
        //     };
        // } else {
        //     window._ = _;
        // }

        // Vue.prototype._ = window._;
    }
}