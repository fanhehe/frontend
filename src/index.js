import Vue from 'vue';
import VueRouter from 'vue-router';

import Routes from './routes/';
import Store from './vuex/store';

Vue.use(VueRouter);

const routes = Routes;
const router = new VueRouter({
    mode: 'history',
    routes,
});

if (module.hot) {
    module.hot.accept();
}
const app = new Vue({router, store}).$mount('#app');
