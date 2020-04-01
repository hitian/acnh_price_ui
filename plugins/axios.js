export default function({ $axios, redirect, store }) {
    $axios.onRequest(config => {
        console.debug('axios config', config);
        if (config.url.substring(0, 7).toLowerCase() === 'http://' || config.url.substring(0, 8).toLowerCase() === 'https://') {
            return;
        }
        config.baseURL = 'https://acnh-api-origin.hitian.me/';
        let authToken = window.localStorage.getItem("auth_token");
        config.headers.common.AuthToken = authToken;
    });
    $axios.onResponse((res) => {
        console.log("axios on response", res);
    });
    $axios.onError(err => {
        console.log("onError", err);
    });
    $axios.onRequestError(err => {
        console.log("onRequestError", err);
    });
    $axios.onResponseError(err => {
        console.log("onResponseError", err);
        // if (err.response.status == 403) {
        //     alert("登录状态已经失效, 或者没有权限, 请重新登录");
        //     redirect('/login');
        // }
    });
}