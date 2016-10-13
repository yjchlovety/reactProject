#React

## 1. 技术选型

### JavaScript:

>Language: ES6
>Framework: React, Redux

### CSS:

### Build Tool:
>Webpack

## 2.webpack 基础

### 2.1安装 webpack

2.1安装 webpack

作为全局变量安装
```js
 $ npm install -g webpack
 $ webpack -v
```

作为项目依赖安装
```js
 $ npm install webpack --save-dev
```

### 2.2 webpack 简介

webpack 的配置项主要包括以下几点：
- entry: 入口,定义要打包的文件
- output: 出口，定义打包输出的文件；包括路径，文件名，还可能有运行时的访问路径（publicPath）参数
- module: webpack将所有的资源都看做是模块，而模块就需要加载器；主要定义一些loaders,定义哪些后缀名的文件应该用哪些loader
- test: 检测哪些文件需要此loader，是一个正则表达式
- exclude: 忽略哪些文件
- resolve: 定义能够被打包的文件，文件后缀名
- plugins: 定义一些额外的插件

示例用到的 Loaders
- 处理样式：sass-loader、style-loader、css-loader，将 sass 转成 css
- 图片处理，url-loader、file-loader、image-webpack-loader， 将图片转换成base64 或者 进行压缩
- js处理： babel-loader，babel-preset-es2015，babel-preset-react，将es6或更高级的代码转成es5的代码

Plugins
- 代码热替换：HotModuleReplacementPlugin
- 生成html文件：HtmlWebpackPlugin
- 报错但不退出webpack进程：NoErrorsPlugin
- 代码压缩：UglifyJsPlugin
- 自动打开浏览器： OpenBrowserPlugin
- 设置环境变量： DefinePlugin


### 2.3 使用 webpack-dev-server 启动服务器
- webpack.config.***.js: webpack常规配置，配置入口文件，输出文件，loaders等等
- server.js: 将server部分分离到一个单独到的文件配置
- package.json: 自定义启动命令

```js
<!-- webpack.config.dev.js -->
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
    new OpenBrowserPlugin({ url: 'http://localhost:' + configBase.port }),
    new DashboardPlugin()
  ]
}

module.exports = config

```
```js
<!-- server.js -->
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const devConfig = require('./webpack.config.dev.js');
const configBase = require('./config.base')

const isDeveloping = process.env.NODE_ENV === 'development';
const port = configBase.port;

function baseConfig (config, contentBase) {
  return new webpackDevServer(webpack(config), {
    historyApiFallback: true, //启用历史API后备支持
    hot: true, //添加HotModuleReplacementPlugin和切换服务器热模式
    inline: true, //嵌入的WebPack-dev的服务器运行到包
    progress: true, //显示某种进度条
    contentBase: contentBase, //为内容的基本路径
    stats: { colors: true } // 用颜色标识
  });
}

var server
if (isDeveloping) {
  server = baseConfig(devConfig, "/app");
  console.log("开发环境 development mode... ");
}

server.listen(port, "localhost", function (err) {
  if (err) {
    console.log(err);
  }
  console.log('------>服务启动中 Listening on ' + process.env.NODE_ENV + ' port ' + port + '<------');
});

```

```js
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "export NODE_ENV=development &&  node server.js && npm run lint:watch",
    "build": "rm -r -f build && mkdir build && NODE_ENV=production && webpack -p --config webpack.config.prod.js --progress --colors",
    "lint:watch": "eslint --ext .js,.jsx app"
  },
```


webpack-dev-server
--content-base <file/directory/url/port>：为内容的基本路径。
--quiet：不输出任何东西到控制台。
--no-info：抑制无聊的信息。
--colors：添加一些颜色到输出。
--no-colors：不要在输出时使用的颜色。
--compress：使用gzip压缩。
--host <hostname/ip>：主机名或IP 绑定到所有主机。0.0.0.0
--port <number>： 端口。
--inline：嵌入的WebPack-dev的服务器运行到包。
--hot：添加HotModuleReplacementPlugin和切换服务器热模式。注意：请确保您不添加HotModuleReplacementPlugin两次。
--hot --inline还增加了webpack/hot/dev-server条目。
--public：覆盖中使用的主机和端口--inline模式的客户端（虚拟机或泊坞窗有用）。
--lazy：没有鲸，编制要求（不能结合--hot）。
--https：提供的WebPack-DEV-服务器通过HTTPS协议。包括服务请求时使用自签名的证书。
--cert，--cacert，--key：路径的证书文件。
--open：将打开默认浏览器的URL（的WebPack-dev的服务器版本> 2.0）。
--history-api-fallback：启用历史API后备支持。


webpack-dashboard --









