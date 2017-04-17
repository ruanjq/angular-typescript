var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer'); // css3 属性自动添加前缀
var helpers = require('./helpers');

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/main.ts'
    },

    resolve: {
        extensions: ['.ts', '.js', '.less', '.css']
    },

    module: {
        rules: [{
            test: /\.ts$/,
            loaders: [{
                loader: 'awesome-typescript-loader',
                options: { configFileName: helpers.root('./', 'tsconfig.json') }
            }, 'angular2-template-loader']
        }, {
            test: /\.html$/,
            loader: 'html-loader'
        }, {
            test: /\.(woff|woff2|ttf|eot|svg)$/,
            loader: 'file-loader?name=fonts/[name].[hash].[ext]'
        }, {
            test: /\.(png|jpg|jpeg|gif)(\?.*)?$/,
            loader: 'url-loader',
            query: {
                limit: 1, // 小于 这个数值使用base转换
                name: 'images/[name].[ext]'
            }
        }, {
            test: /\.css$/,
            exclude: helpers.root('src', 'app'),
            loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader?minimize?sourceMap' })
           
        }, {
            test: /\.css$/,
            include: helpers.root('src', 'app'),
            loader: 'raw-loader'
            
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract({
                fallbackLoader: "style-loader",
                loader: "css-loader?minimize!less-loader"
            })
        }],
        exprContextCritical: false
    },

    plugins: [
        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            helpers.root('./src'), // location of your src
            {} // a map of your routes
        ),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),
        new webpack.LoaderOptionsPlugin({
            // test: /\.xxx$/, // may apply this only for some modules
            options: {
                postcss: [autoprefixer({ browsers: ["last 4 versions", "Firefox >= 20", "Firefox < 20"] })]
            }
        })
    ]

};
