module.exports = {
	path: '/about',
	name: 'About',
	component: r => require.ensure([], () => r(require('./index.vue')), 'About'),
};
