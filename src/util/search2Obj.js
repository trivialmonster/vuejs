/**
 * query字符串转对象
 * @param str
 * @returns {{}}
 */
const search2Obj = (str) => {
    str = str || window.location.href;
    str = str.indexOf('?') > -1 ? str.slice(str.indexOf('?') + 1) : str;

    const items = str.split('&');
    const result = {};
    for (let i = 0; i < items.length; i++) {
        const arr = items[i].split('=');
        const key = arr[0];
        const value = arr[1];
        if (key) {
            if (result[key]) {
                if (Array.isArray(value)) {
                    result[key] = result[key].concat(value);
                } else {
                    result[key] = [result[key]].concat(value);
                }
            } else {
                result[key] = value;
            }
        }
    }
    return result;
};

export default search2Obj;
