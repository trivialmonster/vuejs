const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge'); //  webpack配置文件合并
const CleanWebpackPlugin = require('clean-webpack-plugin'); //  清除指定文件文件夹
const CopyWebpackPlugin = require('copy-webpack-plugin'); //  拷贝指定文件或文件夹到指定路径
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //  webpack4替代extract-text-webpack-plugin提取出组件的css文件
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //  为html模板注入打包好的带MD5后缀静态文件
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; //  打包后分析包的组成
const config = require('./config');
const webpackConfig = require('./webpack.base.config');

module.exports = merge(webpackConfig, {
  mode: 'production', //  提供模式配置选项告诉WebPACK使用其内置的优化
  //  压缩配置
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    splitChunks: {
      cacheGroups: {
        // vendor: {
        //   test: /[\\/]node_modules[\\/]/,
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
        },
        styles: { //  把所有CSS文件合并成一个文件
          name: 'styles',
          test: /\.(less|css)$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.(less|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'less-loader',
            options: {
              // javascriptEnabled: true //  antd-mobile中需要的配置
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([config.distPath], {
      root: config.rootPath,
      verbose: true //  开启在控制台输出信息
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(), //  可以稍微减小打包的体积,聊胜于无
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css'
    }),
    new OptimizeCSSAssetsPlugin({
      cssProcessorOptions: {
        safe: true, //  避免分包拆css文件时每个都单独压缩重写z-index属性、@keyframes名等情况导致的样式冲突
        discardComments: {
          removeAll: true
        },
        autoprefixer: { remove: false }
      }
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(config.srcPath, 'index.html'),
      inject: 'body',
      hash: false, //  是否添加?[hash]后缀
      chunksSortMode: 'dependency', //  按依赖关系在html中顺序引入js文件，避免main在vendor之前引入导致的报错
      minify: {
        removeComments: true, // 清除HTML注释
        collapseWhitespace: true, // 压缩HTML
        collapseBooleanAttributes: true, // 省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true, // 删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, // 删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, // 删除<style>和<link>的type="text/css"
        minifyJS: true, // 压缩页面JS
        minifyCSS: true // 压缩页面CSS
      }
    }),
    new CopyWebpackPlugin([ //  拷贝index.html中直接引入的，不经过webpack的静态资源);
      {
        from: path.join(config.srcPath, 'static/'),
        to: path.join(config.distPath, 'static')
      }
    ]),
    new BundleAnalyzerPlugin() // 打包完成后会打开浏览器列出包的详情
  ]
});
