var path = require('path');
var config = require('./config');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')

var env = process.env.NODE_ENV;
var HMR = new webpack.HotModuleReplacementPlugin();

var webpackConfig = {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        'index': './src/index.js',
        'libs': ['vue', 'vuex', 'vue-router'],
    },
    output: {
        path: path.join(__dirname, './build'),
        publicPath: '/',
        filename: 'js/[name].[chunkhash:6].bundle.js',
        chunkFilename: 'js/chunk/[name].[chunkhash:6].js',
    },
    resolve: {
        alias: {
        }
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        },{
            test: /\.jsx?$/,
            loader: 'babel',
            exclude: /node_modules/
        },{
            test: /\.css$/,
            loader: 'style!css?modules&localIdentName=[name]__[local]___[hash:base64:5]!postcss'
        },{
            test: /\.scss$/,
            loader: 'style!css?modules&localIndentName=[name]__[local]__[hash:base64:5]!postcss'
        },{
            test: /\.(png|gif|jpg|jpeg)$/,
            loader: ''
        }],
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            filename: 'js/[name].[chunkhash:6].bundle.js',
            minChunks: Infinity
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(config.env)
            },
            config: JSON.stringify(config)
        }),
        new HtmlWebpackPlugin({
            template: './index.temp.html',
            filename: 'index.html',
            inject: 'body'
        })
    ],
};

if (config.env === 'development') {
    webpackConfig.entry['hmr'] = 'webpack/hot/dev-server';
    webpackConfig.plugins.push(HMR);
}
module.exports = webpackConfig;
