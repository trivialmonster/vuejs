import axios from 'axios';

export const request = axios.create({
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        // 'Authorization': 'alldobetter 3WKfpxKAqwzsVIEjkM7GLbcn8heIoXUq6hTLiwsYAxuSjhyrg3pNOH/kNT3Ml0Fpl7AkpBeC3FGlzf2TynkS9lyUSFLsp0DS+c4upPMa/mQdKjN1ABVH31QdV091uqEyhqQm0hs28/uZkhCD24CqkGKQaj6wSCa+5tlGnKNGDedlTP1Q6SIqL71JgOMUP/V4SsRMmktREkGmJJvpTol9rw=='
    },
});

//  解决IE10下发送的中文参数不会转码导致请求失败的情况，统一编码中文字符
request.interceptors.request.use(
    function (config) {
        if (/.*[\u4e00-\u9fa5]+.*$/.test(config.url)) {
            config.url = encodeURI(config.url);
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

//  解决IE 9 responseType为json时res.data是undefined的情况
request.interceptors.response.use(function (response) {
    if (response.data == null && (response.config.responseType === 'json' || response.config.responseType === '') && response.request.responseText != null) {
        try {
            // eslint-disable-next-line no-param-reassign
            response.data = JSON.parse(response.request.responseText);
        } catch (e) {
            // ignored
        }
    }
    return response;
});
