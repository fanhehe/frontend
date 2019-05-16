export default {
	path: '/blog',
	name: 'blog',
	component: r => require.ensure([], () => r(require('./index.vue')), 'Blog'),
};
