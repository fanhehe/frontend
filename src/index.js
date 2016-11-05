import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

import Actions from './vuex/actions';
import App from './container/App.vue';

Vue.use(Vuex);
Vue.use(VueRouter);
const routes = [{path: '/', component: App}];
const router = new VueRouter({
    mode: 'history',
    routes,
});

if (module.hot) {
    module.hot.accept();
}
const app = new Vue({router}).$mount('#app');
