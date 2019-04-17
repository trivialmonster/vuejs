import search2Obj from '../util/search2Obj';
import obj2Search from '../util/obj2Search';

const searchObj = search2Obj();

const deviceCode = searchObj.deviceCode || sessionStorage.getItem('deviceCode') || ''; //  设备code，作为query参数给每个接口带上
sessionStorage.setItem('deviceCode', deviceCode); //  缓存下来，规避跳转页面没带search参数刷新的情况
const withCache = 'withCache' in searchObj || sessionStorage.getItem('withCache') || '';
sessionStorage.setItem('withCache', withCache); //  缓存下来，规避跳转页面没带search参数刷新的情况

/**
 *
 * @param params 传来的参数对象
 * @param queryParams  this.queryParams占位对象
 * @returns {*}
 */
const _getQueryString = (queryParams, params) => {
    const resultObj = {};
    deviceCode && (resultObj.deviceCode = deviceCode);

    if (Object.prototype.toString.call(queryParams) === '[object Object]' && Object.keys(queryParams).length) {
        for (const k in queryParams) {
            if (Object.prototype.toString.call(params) === '[object Object]' && typeof params[k] !== 'undefined') {
                resultObj[k] = params[k];
            } else {
                resultObj[k] = queryParams[k];
            }
        }
    }

    return obj2Search(resultObj, true);
};

/**
 * parseURL('/api/{{name}}', {name: 'joke'}) ---> '/api/joke'
 * @param url           原始字符串
 * @param params        传来的参数对象
 */
const _getUrl = (url, params) => {
    url = url || '';
    if (Object.prototype.toString.call(params) !== '[object Object]' || !Object.keys(params).length) {
        return url;
    }

    return url.replace(/{{\w.*?}}/g, (match) => {
        const key = match.replace(/{{(\w+)}}/, '$1');
        if (params[key]) {
            return params[key];
        }
        throw new Error('path参数：' + key + '不存在，请确认!');
    });
};

const apis = {
    baseUrl: '/',

    testApi: { // POST 上传图片
        url: 'test',
        queryParams: {

        }
    },

    getUrl(id, params) {
        if (!this[id]) {
            throw new Error(id + '接口未定义，请确认!');
        }
        const api = this[id];
        const doNotJoinBaseUrl = api.url.search(/(https?:\/\/)|(\/\/)/) === 0 || api.doNotJoinBaseUrl === true;
        return (doNotJoinBaseUrl ? '' : this.baseUrl) + _getUrl(api.url, params) + _getQueryString(api.queryParams, params);
    }
};

export default apis;
