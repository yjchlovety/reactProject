#React

### JavaScript:

>Language: ES6
>Framework: React, Redux

### CSS:

### Build Tool:
>Webpack



代码热替换：HotModuleReplacementPlugin
生成html文件：HtmlWebpackPlugin
报错但不退出webpack进程：NoErrorsPlugin
代码压缩：UglifyJsPlugin
自动打开浏览器： OpenBrowserPlugin
设置环境变量： DefinePlugin


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









