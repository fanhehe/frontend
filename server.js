var webpack = require('webpack');
var config = require('./config');
var WebpackDevServer = require('webpack-dev-server');

var complier = webpack(require('./webpack.config.js'));

var env = process.env.NODE_ENV || "product";
var publicPath = env === "product"? '/build': '/';
var port = config[env].port;
var ip = config[env].ip;

var server = WebpackDevServer(complier, {
    hot: true,
    compress: true,
    staticOptions: {},
    publicPath:  '',
    contentBase: './build/',
    stats: {color: true}
});

server.listen(port, ip, function () {
    console.log('=======> the server is running at ', ip, port);
});
