module.exports = {
	path: '/topic',
	name: 'topic',
	component: r => require.ensure([], () => r(require('./index.vue')), 'Topic'),
};
