const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(proxy('/api', {
    // target: 'http://47.94.142.215:8081',
    // target: 'http://localhost:8081',
    // target: 'http://qqter.chenxianshen.org.cn/',
    target: 'https://sdaff.hefengzhijia.cn', // 及享用后台
    // target: 'https://qqter.chenxianshen.org.cn', // 及享用渠道后台
    // target :'http://cs.huakodai.com', //小赢花花后台
    //target: 'http://h5.huakodai.com', // 小赢花渠道后台
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      '^/api': '/api'
    }
  }))
}
