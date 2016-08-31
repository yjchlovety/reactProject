const webpack = require('webpack');
const path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const configBase = require('./config.base')
const config = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:' + configBase.port,
    path.resolve(__dirname, 'app/index.js')
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: 'http://localhost:' + configBase.port + '/' // 引用路径
  },
  resolve: {
    extensions: [ '', '.js', '.jsx' ]
  },
  devtool: "source-map",
  module: {
    loaders: [
      {
        test: /\.js|jsx$/, // 检测哪些文件需要此loader，是一个正则表达式，用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
        exclude: /(node_modules|bower_components)/,
        loaders: [ 'babel' ]  // 加载模块 "babel" 是 "babel-loader" 的缩写
      },
      {
        test: /\.css$/,
        loaders: [ "style", "css?sourceMap" ]
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i,
        loaders: [
          'url?limit=10000&name=img/[hash:8].[name].[ext]', // 图片小于8k就转化为 base64, 或者单独作为文件
          'image-webpack' // 图片压缩
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: './app/favicon.ico',
      template: 'app/template.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new OpenBrowserPlugin({ url: 'http://localhost:' + configBase.port }),
    new DashboardPlugin()
  ]
}

module.exports = config