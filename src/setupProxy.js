const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    proxy('/api', {
      // target: 'http://47.94.142.215:8081',
      // target: 'http://qqter.chenxianshen.org.cn/',
      // target: 'https://hefengqb.qidianshenghuo.com.cn', // 及享用后台
      // target: 'https://qqter.chenxianshen.org.cn', // 及享用渠道后台
      // target :'http://cs.huakodai.com', //小赢花花后台
      //target: 'http://h5.huakodai.com', // 小赢花渠道后台
      // target: 'https://mxjqingjie.imxiaomang.com.cn', // 梦想借后台
      // target: 'https://qqter.anwangfei.cn', // 梦想借渠道后台
      // target: 'https://pizzaqb.zhengxingmeirong.net.cn', // pizza后台
      target: 'https://qutorpsqb.qichegongzhuang.cn', // pizza渠道
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api'
      }
    })
  )
}
