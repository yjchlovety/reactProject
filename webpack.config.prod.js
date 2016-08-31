const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: [
    path.resolve(__dirname, 'app/index.js')
  ],
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[chunkhash:8].bundle.js',
    publicPath: ''
  },
  resolve: {
    extensions: [ '', '.js', '.jsx' ]
  },
  module: {
    loaders: [
      {
        test: /\.js|jsx$/,
        exclude: /(node_modules|bower_components)/,
        loaders: [ 'babel' ]
      },
      {
        test: /(\.css)$/,
        loaders: [ "style", "css" ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'url?limit=10000&name=[hash:8].[name].[ext]',
          'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
        ]
      }
    ],
    devtool: 'cheap-source-map'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ //js和css压缩
      compress: {
        warnings: false
      },
      except: []    //排除关键字
    }),
    new HtmlWebpackPlugin({
      template: 'app/template.html',
      filename: 'index.html',
      inject: true
    }),

    // new HtmlWebpackPlugin({                        //根据模板插入css/js等生成最终HTML 压缩HTML
    //   favicon: './src/img/favicon.ico', //favicon路径
    //   filename: '/view/index.html',    //生成的html存放路径，相对于 path
    //   template: './src/view/index.html',    //html模板路径
    //   inject: true,    //允许插件修改哪些内容，包括head与body
    //   hash: true,    //为静态资源生成hash值
    //   minify: {    //压缩HTML文件
    //     removeComments: true,    //移除HTML中的注释
    //     collapseWhitespace: true    //删除空白符与换行符
    //   }
    // })
  ]
};

module.exports = config;
