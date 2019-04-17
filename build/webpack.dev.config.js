const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');     //  webpack配置文件合并
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //  webpack4替代extract-text-webpack-plugin提取出组件的css文件
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const config = require('./config');
const webpackConfig = require('./webpack.base.config');
const { ip, port, publicPath } = config;

// process.env.NODE_ENV = 'development';

module.exports = merge(webpackConfig, {
    mode: 'development', //  提供模式配置选项告诉WebPACK使用其内置的优化
    devtool: 'source-map',
    devServer: {
        host: ip, //  使用IP地址代替默认的localhost，方便手机访问
        port: port, //  同上
        // open: 'http://localhost:' + port + publicPath, //  打开浏览器
        open: 'http://' + ip + ':' + port + publicPath, //  打开浏览器
        // contentBase: config.rootPath + 'dev', //  告诉服务器从哪里提供内容。只有在你想要提供静态文件时才需要
        historyApiFallback: {
            verbose: false,
            rewrites: [
                {
                    from: new RegExp(config.publicPath + '*?'),
                    to: config.srcPath + 'index.html'
                }
            ]
        }, //  HTML5 History API 404 响应
        compress: false, //  是否开启Gzip
        disableHostCheck: true,
        proxy: { //  开启代理服务器，开发时连接接口
            // '/api': {
            //     target: 'https://app.alldobetter.com',
            //     secure: false
            // },
            '/': {
                target: 'http://localhost:8000',
                secure: false
            },
        },
        stats: { //  控制命令行输出的内容
            timings: true,  // 增加时间信息
            version: true,  // 增加 webpack 版本信息
            publicPath: true, // 增加 public path 的信息
            assets: true, // 增加资源信息
            assetsSort: 'field',   // 对资源按指定的项进行排序，你可以使用 `!field` 来反转排序。
            children: false,  // 子级的信息
            chunks: false,  // 包信息（设置为 `false` 能允许较少的冗长输出）
            modules: false, // 增加内置的模块信息
            errors: true, // 错误信息
            errorDetails: true, // 增加错误的详细信息（就像解析日志一样）
            warnings: false  // 警告信息
        },
        inline: true, //  开启webpack原生的热更新
        hot: true //  开启webpack原生的热更新
    },
    optimization: {
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            cacheGroups: {
                // vendor: {
                //   test: /node_modules/,
                //   name: 'vendor',
                //   priority: -20,
                //   chunks: 'initial',
                //   enforce: true
                // },
                commons: {
                    chunks: 'initial',
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.(less|css)$/,
                use: [
                    'css-hot-loader',
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            // sourceMap: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            // sourceMap: true
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            // sourceMap: true,
                            javascriptEnabled: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        // new webpack.NamedModulesPlugin(), //  热更新时方便调试，webpack4不再需要显示调用
        new webpack.HotModuleReplacementPlugin(), //  开启webpack原生的热更新
        // new webpack.NoEmitOnErrorsPlugin(),                  //  webpack4不再需要显示调用
        new FriendlyErrorsPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(config.srcPath, 'index.html'),
            inject: true //  true的话就说明是开发版本，会自动引入css和js文件
        })
    ]
});
