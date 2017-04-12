var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
    devtool: 'source-map',

    output: {
        path: helpers.root('dist'),
        publicPath: 'windHome/dist/',
        filename: 'js/[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js'
    },
    module: {
        rules: [{
            test: /\.less$/,
            include: helpers.root('src', 'app'),
            loader: ExtractTextPlugin.extract({
                fallbackLoader: "style-loader",
                loader: "css-loader!less-loader",
                publicPath: "../../../"     // 过滤文件中的fonts 路径
            })
        }, {
            test: /\.css$/,
            include: /node_modules/,
            loader: ExtractTextPlugin.extract({
                fallbackLoader: "style-loader",
                loader: "css-loader",
                publicPath: "../../../"     // 过滤 ionicons/dist/scss/ionicons 文件中的fonts 路径
            })
        }],
        exprContextCritical: false
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
            mangle: {
                keep_fnames: true
            }
        }),
        new ExtractTextPlugin('css/[name].[hash].css'),
        new webpack.DefinePlugin({
            process:{
                env: '"production"'
            }
        }),
        new webpack.LoaderOptionsPlugin({
            htmlLoader: {
                minimize: false // workaround for ng2
            }
        }),
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: 'src/index.html'
        })
    ]
});
