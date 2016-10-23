module.exports = {
  port: 9090,//本地服务端口
  proxy: { //请求代理指向
    path: '/api/*',
    target: 'http://goods.vip.dev.xkeshi.so:8082',
    host: 'goods.vip.dev.xkeshi.so'
  },
  project: 'mobileShop',//项目的名称
}