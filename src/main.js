import Vue from 'vue';
import VueRouter from 'vue-router';

import './utils/reset.css';
import Routes from './routes/';
import Store from './vuex/store';

Vue.use(VueRouter);

const store = Store;
const routes = Routes;

const router = new VueRouter({
	mode: 'hash',
	routes: routes,
});

if (module.hot) {
	module.hot.accept();
}
Vue.config.devtools = true;
new Vue({ router, store }).$mount('#app');
