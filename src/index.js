import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

import Actions from './vuex/actions';
import configRouter from './router';
import App from './container/App.vue';

Vue.use(Vuex);
Vue.use(VueRouter);
const router = new VueRouter();

configRouter(router);

router.start(Vue.extends(App), '#app');
