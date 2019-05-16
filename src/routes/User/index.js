export default {
	path: '/u/:userId',
	name: 'user',
	component: r => require.ensure([], () => r(require('./index.vue')), 'User'),
};
