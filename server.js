const webpack = require('webpack');
const express = require('express')
const webpackDevServer = require('webpack-dev-server');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const proxy = require('proxy-middleware')
const devConfig = require('./webpack.config.dev.js');
const configBase = require('./config.base')

const port = configBase.port;

const ip = require('ip')
const lostIp = ip.address()
// const app = express()
// const compiler = webpack(devConfig);

// app.use(webpackDevMiddleware(compiler, {
//     publicPath: devConfig.output.publicPath,
//     stats: { colors: true }, // 用颜色标识
//   }
// ))
// app.use(webpackHotMiddleware(compiler));
// app.use(proxy(configBase.proxyIp));
// app.listen(port, lostIp, function (err) {
//   if (err) {
//     console.log(err);
//   }
//   console.log('------>服务启动中 ' + lostIp + ' port ' + port + '<------');
// });
//
// app.get('/', function (req, res) {
//   console.log(req.url);
//   // res.sendFile(path.join(__dirname, './dist/index.html'));
// });
//
// app.get('/api', function (req, res) {
//   console.log(req.url);
//   // res.sendFile(path.join(__dirname, './dist/index.html'));
// });

function baseConfig (config, contentBase) {
  return new webpackDevServer(webpack(config), {
      historyApiFallback: true, //启用历史API后备支持
      hot: true, //添加HotModuleReplacementPlugin和切换服务器热模式
      inline: true, //嵌入的WebPack-dev的服务器运行到包
      progress: true, //显示某种进度条
      contentBase: contentBase, //为内容的基本路径
      stats: { colors: true }, // 用颜色标识
    }
  );
}

var server
server = baseConfig(devConfig, "/" + configBase.project);
console.log("开发环境 development mode... " + '项目 ' + configBase.project);

server.listen(port, lostIp, function (err) {
  if (err) {
    console.log(err);
  }
  console.log('------>服务启动中 ' + lostIp + ' on ' + process.env.NODE_ENV + ' port ' + port + '<------');
});