import obj2Search from '../util/obj2Search';

/**
 *
 * @param params 传来的参数对象
 * @param queryParams  this.queryParams占位对象
 * @returns {*}
 */
const _getQueryString = (queryParams, params) => {
    const resultObj = {};

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

    testApi: {
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
