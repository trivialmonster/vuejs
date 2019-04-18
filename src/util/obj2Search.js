/**
 * 对象转query字符串
 * @param obj
 * @param needSymbol  是否需要'?'
 * @returns {string}
 */
const obj2Search = (obj, needSymbol) => {
  if (Object.prototype.toString.call(obj) !== '[object Object]' || !Object.keys(obj).length) {
    return '';
  }
  let result = needSymbol ? '?' : '';
  const _arr = [];
  for (const k in obj) {
    const value = obj[k];
    if (Array.isArray(value)) {
      value.forEach(item => {
        _arr.push(k + '=' + item);
      });
    } else {
      _arr.push(k + '=' + value);
    }
  }
  
  result += _arr.join('&');
  return result;
};

export default obj2Search;
