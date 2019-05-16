export default {
	path: '/',
	name: 'home',
	component: r => require.ensure([], () => r(require('./index.vue')), 'Home'),
};
