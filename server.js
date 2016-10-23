const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const devConfig = require('./webpack.config.dev.js');
const configBase = require('./config.base')

const isDeveloping = process.env.NODE_ENV === 'development';
const port = configBase.port;

const ip = require('ip')
const lostIp = ip.address()

function baseConfig (config, contentBase) {
  return new webpackDevServer(webpack(config), {
      historyApiFallback: true, //启用历史API后备支持
      hot: true, //添加HotModuleReplacementPlugin和切换服务器热模式
      inline: true, //嵌入的WebPack-dev的服务器运行到包
      progress: true, //显示某种进度条
      contentBase: contentBase, //为内容的基本路径
      stats: { colors: true }, // 用颜色标识,
      proxy: {
        "/api/*": {
          "target": "http://goods.vip.prepub.xkeshi.net",
          ignorePath: true,
          changeOrigin: true,
          secure: false
        }
      }
    }
  );
}

var server
if (isDeveloping) {
  server = baseConfig(devConfig, "/" + configBase.project);
  console.log("开发环境 development mode... ");
}

server.listen(port, lostIp, function (err) {
  if (err) {
    console.log(err);
  }
  console.log('------>服务启动中 ' + lostIp + ' on ' + process.env.NODE_ENV + ' port ' + port + '<------');
});
