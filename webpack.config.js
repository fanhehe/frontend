var path = require('path');
var config = require('./config');
var webpack = require('webpack');

var HMR = new webpack.HotModuleReplacementPlugin();
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var webpackConfig = {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        'index': ['./src/main.js'],
        'libs': ['vue', 'vuex', 'vue-router'],
    },
    output: {
        path: path.join(__dirname, './build'),
        publicPath: '/',
        filename: 'js/[name].[hash:6].bundle.js',
        chunkFilename: 'js/chunk/[name].[hash:6].js',
    },
    resolve: {
        extensions: ['', '.js', '.vue', 'jsx'],
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
    module: {
        preLoaders: [{
            test: /\.vue$/,
            loader: 'eslint',
            exclude: /node_modules/
        },{
            test: /\.js$/,
            loader: 'eslint',
            exclude: /node_modules/
        }],

        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        },{
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        },{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css?modules&localIdentName=[name]__[local]___[hash:base64:5]!postcss')
        },{
            test: /\.scss$/,
            loader: 'style-loader!css?modules&localIndentName=[name]__[local]__[hash:base64:5]!postcss!sass'
        },{
            test: /\.(png|gif|jpg|jpeg)$/,
            loader: 'url-loader?limit=10000&name=images/[hash].[ext]'
        }],
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('css/[name].css?[contenthash:6]',{ allChunks : true,resolve : ['modules'] }),
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
            favicon: './favicon.ico',
            inject: 'body'
        })
    ],
    vue: {
        loaders: {
            css: ExtractTextPlugin.extract('vue-style-loader', 'css!postcss'),
            sass: ExtractTextPlugin.extract('vue-style-loader', 'css!postcss!sass')
        },
    },
};

if (config.env === 'development') {
    webpackConfig.entry.index.push('webpack/hot/dev-server');
    webpackConfig.entry.libs.push('webpack/hot/dev-server');
    webpackConfig.plugins.push(HMR);
}
module.exports = webpackConfig;
