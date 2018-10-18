const proxyTable =  {
  '/api': {
    //后台接口地址
    target:'http://10.12.252.48:8380',
    //  target:'http://172.18.50.20:8280',//本地
    // dev服务器地址:http://10.12.252.48:8380
    changeOrigin: true,
    pathRewrite: {'^/api': ''}
  },
  '/api1': {
    //图片服务器地址
    // target:'http://172.18.50.20:8280',
    changeOrigin: true,
    pathRewrite: {'^/api': ''}
  },
}
module.exports = proxyTable






