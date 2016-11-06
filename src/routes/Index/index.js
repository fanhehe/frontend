export default {
    path: '/',
    name: 'index',
    component: r => require.ensure([], () => r(require('./index.vue')), 'index'),
}
