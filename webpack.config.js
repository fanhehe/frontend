var path = require('path');
var config = require('./config');
var webpack = require('webpack');

var precss = require('precss');
var autoprefixer = require('autoprefixer');

var Dashboard = require('webpack-dashboard');
var DashboardPlugin = require('webpack-dashboard/plugin');
var dashboard = new Dashboard();

var HMR = new webpack.HotModuleReplacementPlugin();
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var NODE_MODULE = './node_modules';
var moduleArray = ['vue/dist/vue.min.js', 'vue-router/dist/vue-router.min.js', 'vuex/dist/vuex.min.js'];

var webpackConfig = {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        'index': ['./src/main.js'],
    },
    output: {
        path: path.join(__dirname, './build'),
        publicPath: '/',
        filename: 'js/[name].[hash:6].bundle.js',
        chunkFilename: 'js/chunk/[name].[hash:6].js',
    },
    resolve: {
        extensions: ['', '.js', 'json', '.vue', 'jsx'],
        alias: {
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
            exclude: [/node_modules/, /utils/],
        }],
        loaders: [{
            test: /\.vue$/,
            loader: 'vue',
            options: {
                cssModules: {
                     localIdentName: '[name]-[local]-[hash:base64:5]',
                    camelCase: true
                }
            }
        },{
            test: /\.js$/,
            loader: 'babel',
            exclude: /node_modules/
        },{
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css?modules&localIdentName=[name]__[local]___[hash:base64:5]!postcss')
        },{
            test: /\.sass$/,
            loader: 'style-loader!css?localIndentName=[name]__[local]__[hash:base64:5]!postcss!sass'
        },{
            test: /\.(png|gif|jpg|jpeg)$/,
            loader: 'url-loader?limit=10000&name=images/[hash].[ext]'
        }],
        noParse: [],
    },
    plugins: [
        new DashboardPlugin(dashboard.setData),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('css/[name].[id].css?[contenthash:6]',{ allChunks : true,resolve : ['modules'] }),
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
            css: ExtractTextPlugin.extract('vue-style-loader', 'css?localIdentName=[name]__[local]__[hash:base64:5]!postcss'),
            sass: ExtractTextPlugin.extract('vue-style-loader', 'css?localIdentName=[name]__[local]__[hash:base64:5]!postcss!sass')
        },
    },
    postcss: function () {
        return [autoprefixer, precss];
    }
};


moduleArray.forEach(function (module) {
    var modulePath = module ||path.resolve(module);
    webpackConfig.resolve.alias[module.split(path.sep)[0]] = modulePath;
    webpackConfig.module.noParse.push(modulePath);
});

if (config.env === 'development') {
    webpackConfig.entry.index.push(`webpack-dev-server/client?http://localhost:${config.port}/`,'webpack/hot/dev-server');
    webpackConfig.plugins.push(HMR);
}

module.exports = webpackConfig;
