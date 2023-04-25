import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
let availButtons = new Set();
export default new Vuex.Store({
    modules: {
        // 把 store/modules下的文件引入
    },
    state: {
    },
    mutations: {
    },
    actions: {},
    getters: {
        // 储存接口所需要的头部信息
        headerDetails(state, getters) {
            let user = sessionStorage.getItem('user');
            let header;
            if (user) {
                header = {
                    loginKey: JSON.parse(user).LoginKey,
                    UserName: encodeURIComponent(JSON.parse(user).UserName),
                    Password: JSON.parse(user).PassWord,
                    'Cache-Control': 'no-cache',
                    Pragma: 'no-cache'
                };
            }
            return header;
        }
    }
});
