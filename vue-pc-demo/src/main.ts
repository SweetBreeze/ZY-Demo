// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import Axios from 'axios';
import store from './store/index';

import './assets/css/font-awesome.scss';
// import './assets/css/global.scss';
import './assets/css/iconfont.css';
import './assets/style/index.scss';

import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

import App from './App.vue';
import router from './router';
import VueQuillEditor from 'vue-quill-editor';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';

Vue.use(VueQuillEditor);
Vue.use(ElementUI);
Vue.use(VueRouter);

Axios.interceptors.request.use(function(config) {
    config.headers['lang'] = window.navigator.language;
    // 自动在请求中设置access-token
    let oldToken = sessionStorage.getItem('TOKEN');
    if (oldToken) {
        config.headers['x-access-token'] = oldToken;
    }
    return config;
});
Axios.interceptors.response.use(function(config) {
    // 自动更新access-token
    let oldToken = sessionStorage.getItem('TOKEN');
    let token = config.headers['x-access-token'];
    if (token && token !== oldToken) {
        sessionStorage.setItem('TOKEN', token);
    }
    return config;
});

Vue.config.productionTip = true;

/* eslint-disable no-new */
new Vue({
    // el: '#app',
    store,
    router,
    render: h => h(App),
    created() {
        store.commit('addMenu', router);
    }
}).$mount('#app');
