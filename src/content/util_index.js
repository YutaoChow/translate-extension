/**
 *@author zhouyutao
 */

/**
 *  获取数据
 *  @param {Function} callback
 *  @return {String} 返回数据
 */
export function getData(callback) {
    chrome.storage.sync.get(
        { translateData: '' }, 
        function(items) { 
            callback(items.translateData || '{}');
        }
    );

}

/**
 *  获取保存数据数据
 *  @param {String} chinese 中文字符串
 *  @param {String} english 英文字符串
 *  @return {*} 返回
 */
export function saveData(chinese, english) {
    getData(function(translateData) {
        let data = JSON.parse(translateData);
        chrome.storage.sync.set(
            { 
                translateData: JSON.stringify({
                    ...data,
                    [chinese]: english
                })
            }, 
            function() { 
                console.log('保存成功')
            }
        );
    })
}

/**
 *  获取数据
 *  @param {Function} callback
 *  @return {String} 返回数据
 */
export function canInject(callback) {
    chrome.storage.sync.get(
        {
            translateState: 'open' 
        }, 
        function(items) { 
            callback(items.translateState || 'open');
        }
    );

}