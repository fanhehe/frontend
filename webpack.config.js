var path = require('path');
var config = require('./config');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')

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
        filename: 'js/[name].[hash:6].bundle.js',
        chunkFilename: 'js/chunk/[name].[hash:6].js',
    },
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js' 
        }
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        },{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/
        },{
            test: /\.css$/,
            loader: 'style!css?modules&localIdentName=[name]__[local]___[hash:base64:5]!postcss'
        },{
            test: /\.scss$/,
            loader: 'style!css?modules&localIndentName=[name]__[local]__[hash:base64:5]!postcss!sass'
        },{
            test: /\.(png|gif|jpg|jpeg)$/,
            loader: 'url-loader?limit=10000&name=images/[hash].[ext]'
        }],
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'commons',
            filename: 'js/[name].[hash:6].bundle.js',
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
