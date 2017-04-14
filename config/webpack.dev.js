var webpackMerge = require('webpack-merge');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',
    output: {
        path: helpers.root('dist'),
        publicPath: '/',
        filename: 'js/[name].js',
        chunkFilename: '[id].chunk.js'
    },

    plugins: [
        new webpack.DefinePlugin({
            process:{
                env: '"dev"'
            }
        }),
        new ExtractTextPlugin('css/[name].css'),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ],

    devServer: {
        historyApiFallback: true,
        stats: 'minimal',
        host: '10.37.3.232'
    }
});
