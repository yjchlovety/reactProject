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
      stats: { colors: true }, // 用颜色标识,
      proxy: {
        "/api/*": {
          "target": {
            "host": "goods.vip.dev.xkeshi.so",
            "protocol": 'http:',
            "port": 8082
          },
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
  server = baseConfig(devConfig, "/app");
  console.log("开发环境 development mode... ");
}

server.listen(port, "localhost", function (err) {
  if (err) {
    console.log(err);
  }
  console.log('------>服务启动中 Listening on ' + process.env.NODE_ENV + ' port ' + port + '<------');
});
