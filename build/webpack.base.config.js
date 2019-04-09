const path = require('path');
const webpack = require('webpack');
const config = require('./config');
const isDev = process.env.NODE_ENV !== 'production';
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry: {
        vendor: [
            'babel-polyfill',
            'axios',
            'vue',
            // 'react-dom',
            // 'react-router-dom'
        ],
        main: path.resolve(config.srcPath, 'index')
    },
    output: {
        path: isDev ? config.rootPath + 'dev' : config.distPath,
        publicPath: config.publicPath,
        filename: 'js/[name].[hash:10].js',
        chunkFilename: 'chunk/[name].[chunkhash:10].js'
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['.js', '.vue']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [config.srcPath],
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.vue$/,
                include: [config.srcPath],
                use: {
                    loader: 'vue-loader'
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'imgs/[name].[hash:10].[ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac|swf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'media/[name].[hash:10].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:10].[ext]'
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
        // new webpack.ProvidePlugin({ //  不需要在代码中import或require
        //     $: 'jquery',
        //     jQuery: 'jquery',
        //     videojs: 'video.js',
        // })
    ]
};
