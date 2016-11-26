import Vue from 'vue';
import VueRouter from 'vue-router';

import Routes from './routes/';
import Store from './vuex/store';
import RouterConfig from './routes/RouterConfig';

Vue.use(VueRouter);

const store = Store;
const routes = Routes;

let router = new VueRouter({
	mode: 'hash',
	routes: routes,
});

router = RouterConfig(router);

if (module.hot) {
	module.hot.accept();
}
Vue.config.devtools = true;
new Vue({ router, store }).$mount('#app');
