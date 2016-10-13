#React

## 1. 技术选型

### JavaScript:

>Language: ES6
>Framework: React, Redux

### CSS:

### Build Tool:
>Webpack

## webpack 基础

### 安装 webpack

作为全局变量安装
```js
 $ npm install -g webpack
 $ webpack -v
```

作为项目依赖安装
```js
 $ npm install webpack --save-dev
```

### webpack 简介

webpack 的配置项主要包括以下几点：
- entry: 入口,定义要打包的文件
- output: 出口，定义打包输出的文件；包括路径，文件名，还可能有运行时的访问路径（publicPath）参数
- module: webpack将所有的资源都看做是模块，而模块就需要加载器；主要定义一些loaders,定义哪些后缀名的文件应该用哪些loader
- test: 检测哪些文件需要此loader，是一个正则表达式
- exclude: 忽略哪些文件
- resolve: 定义能够被打包的文件，文件后缀名
- plugins: 定义一些额外的插件

Loaders
- 处理样式：less-loader、style-loader、css-loader，将 less 转成 css
- 图片处理，url-loader、file-loader、image-webpack-loader， 将图片转换成base64 或者 进行压缩
- js处理： babel-loader，babel-preset-es2015，babel-preset-react，将es6或更高级的代码转成es5的代码

Plugins
- 代码热替换：HotModuleReplacementPlugin
- 生成html文件：HtmlWebpackPlugin
- 报错但不退出webpack进程：NoErrorsPlugin
- 代码压缩：UglifyJsPlugin
- 自动打开浏览器： OpenBrowserPlugin
- 设置环境变量： DefinePlugin


### 使用 webpack-dev-server 启动服务器
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

## 配置 React, ES6 & Babel 6
ES6 和 JSX 转换
.babelrc 文件
```js
{
  "presets": [
    "es2015",
    "stage-0",
    "react"
  ],
  "plugins": [
    "transform-decorators-legacy"
  ]
}
```
这里transform-decorators-legacy暂且用不到,是解析ES7语法的


## 使用 ESlint 进行代码检查
特点:
- 默认规则包含所有 JSLint、JSHint 中存在的规则，易迁移
- 规则可配置性高：可设置「警告」、「错误」两个 error 等级，或者直接禁用


.eslint配置文件常见的格式
```js
{
  "parserOptions": { //EsLint通过parserOptions，允许指定校验的ecma的版本，及ecma的一些特性
    "ecmaVersion": 6, //指定ECMAScript支持的版本，6为ES6
    "sourceType": "module", //指定来源的类型，有两种”script”或”module”
    "ecmaFeatures": { // ecmaFeatures指定你想使用哪些额外的语言特性
        "jsx": true //启动JSX
    }
  },
  "parser": "babel-eslint", // EsLint默认使用esprima做脚本解析，也可以切换成babel-eslint解析
  "env": { // Environment可以预设好的其他环境的全局变量，如brower、node环境变量、es6环境变量、mocha环境变量等
    "browser": true,
    "node": true,
    "es6": true,
    "mocha": true
  },
  "plugins": [ // EsLint允许使用第三方插件
    "react"
  ],
  extends: [ // Extends是EsLint默认推荐的验证你可以使用配置选择哪些校验是你所需要的
    "eslint:recommended"
  ],
  rules: [ // 自定义规则
  ],
  "globals": { // 即插件在执行过程中用到的其它全局变量
  }
}

```

相关插件
- babel-eslint: ESLint 是前端JS代码检测利器。而 babel-eslint 则允许你检测所有的 Babel 代码
- eslint: JavaScript 语法检测利器：分析出你代码潜在的错误和非标准用法
- eslint-plugin-react: ESLint 中关于 React 语法检测的插件

[更多参考](http://eslint.org/docs/user-guide/configuring)



## Configuration tasks/命令
- npm start: 启动开发模式下的server
- npm run build: 打包生产模式的代码
- npm run lint:watch:eslint 监视


## 参考
[React官网](http://reactjs.cn/react/docs/getting-started.html)

[WebPack实例与前端性能优化](https://segmentfault.com/a/1190000004577578)

[React 入门实例教程](http://www.ruanyifeng.com/blog/2015/03/react.html)








