export default {
	name: 'article',
	path: '/article/:articleId',
	component: r => require.ensure([], () => r(require('./index.vue')), 'Article'),
};
