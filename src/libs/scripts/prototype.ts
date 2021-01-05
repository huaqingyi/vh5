import Vue from 'vue';
import Router from 'vue-router';
import Axios from 'axios';
import { httpConfig } from '@/config/http';
import { Service } from '@/libs/vuex';
import { Toast } from 'vant';

Vue.prototype.$http = Axios.create(httpConfig);
Service.prototype.http = Axios.create(httpConfig);
Service.prototype.http.interceptors.request.use(config => {
    let sessiontoken = sessionStorage.getItem('sessiontoken') || '';
    let freshtoken = sessionStorage.getItem('freshtoken') || '';
    config.headers = {
        ...config.headers,
        sessiontoken, freshtoken,
        authorization: sessiontoken,
        'Access-Control-Expose-Headers': 'sessionToken, freshtoken'
    }
    return config;
});
Service.prototype.http.interceptors.response.use(response => {
    if (response.headers && response.headers.sessiontoken) {
        sessionStorage.setItem('sessiontoken', response.headers.sessiontoken);
    }
    if (response.headers && response.headers.freshtoken) {
        sessionStorage.setItem('freshtoken', response.headers.freshtoken);
    }
    let { data } = response;
    if (data && data.errno && data.errno === 1000) {
        sessionStorage.removeItem('sessiontoken');
        sessionStorage.removeItem('freshtoken');
        sessionStorage.removeItem('userInfo');
        Toast.fail('登录超时, 请重新登录');
        setTimeout(() => {
            window.location.href = '/';
        }, 2000);
    }
    return response;
});

const routerPush = Router.prototype.push;

Router.prototype.push = function push(location: any) {
    return (routerPush.call(this, location) as any).catch(
        (error: any) => error
    );
};
