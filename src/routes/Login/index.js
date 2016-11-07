module.exports = {
	path: '/login',
	name: 'Login',
	component: r => require.ensure([], () => r(require('./index.vue')), 'Login'),
};
