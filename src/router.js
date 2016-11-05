module.exports = function (router) {
    /*
    router.map({
        '/': {
            name: 'index',
            component: require('./routes/index')
        }
    });
    */

    router.match ('/', {
        component: require('./routes/index')
    });
}
