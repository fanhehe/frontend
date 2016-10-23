import Vue from 'vue';
import VueRouter from 'vue-router';

import Store from './vuex/store';
import Actions from './vuex/actions';
import configRouter from './router';
import App from './container/App.vue';

Vue.use(VueRouter);
const router = new VueRouter();
configRouter(router);

router.start(Vue.extends(App), 'body');
