export default {
	path: '/w',
	name: 'writer',
	redirect: '/w/default',
	component: r => require.ensure([], () => r(require('./index.vue')), 'Writer'),
	children: [{
		path: 'md',
		name: 'writer/md',
		component: r => require.ensure([], () => r(require('./markdown.vue')), 'Writer/Markdown'),
	}, {
		path: '*',
		name: 'writer/default',
		component: r => require.ensure([], () => r(require('./default.vue')), 'Writer/Markdown'),
	}],
};
