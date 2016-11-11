const webpack = require('webpack');
const path = require('path');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const configBase = require('./config.base')
const ip = require('ip')
const lostIp = ip.address()
const config = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://' + lostIp + ':' + configBase.port,
    path.resolve(__dirname, configBase.project + '/index.js')
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: 'http://' + lostIp + ':' + configBase.port + '/' // 引用路径
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
        test: /\.(woff|woff2|eot|ttf)$/i,
        loader: "file-loader?name=fonts/[name]-[hash].[ext]"
      },
      {
        test: /\.less$/,
        loader: "style!css!less"
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
      favicon: configBase.project + '/favicon.ico',
      template: configBase.project + '/template.html',
      filename: 'index.html',
      inject: true,  //允许插件修改哪些内容，包括head与body
      hash: true,    //为静态资源生成hash值
      minify: {    //压缩HTML文件
        removeComments: true,    //移除HTML中的注释
        collapseWhitespace: true    //删除空白符与换行符
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new OpenBrowserPlugin({ url: 'http://' + lostIp + ':' + configBase.port }),
    new DashboardPlugin()
  ]
}

module.exports = config