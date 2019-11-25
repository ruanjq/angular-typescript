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
        publicPath: '/angular-typescript',
        filename: 'js/[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js'
    },
    module: {
        rules: [],
        exprContextCritical: false
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
            mangle: {
                keep_fnames: true
            },
            compress: {
                warnings: true
            },
            comments:false
        }),
        new ExtractTextPlugin('css/[name].[hash].css'),
        new webpack.DefinePlugin({
            process: {
                env: '"production"'
            }
        }),
        new webpack.LoaderOptionsPlugin({
            htmlLoader: {
                minimize: true // workaround for ng2
            }
        }),
        new HtmlWebpackPlugin({
            filename: '../index.html',
            template: 'src/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            }
        })
    ]
});
