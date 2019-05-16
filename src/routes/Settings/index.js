export default {
	path: '/s/:userId',
	name: 'settings',
	redirect: '/s/:userId/basis',
	component: r => require.ensure([], () => r(require('./index.vue')), 'Settings'),
	children: [{
		path: 'basis',
		name: 'settings/basis',
		component: r => require.ensure([], () => r(require('./basis.vue')), 'Settings/basis'),
	}, {
		path: 'profile',
		name: 'settings/profile',
		component: r => require.ensure([], () => r(require('./profile.vue')), 'Settings/profile'),
	}, {
		path: '*',
		name: 'settings/*',
		redirect: 'basis',
	}],
};
