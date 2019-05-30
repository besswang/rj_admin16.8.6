const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(proxy('/rjwl', {
    target: 'http://47.94.142.215:8081',
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      "^/rjwl": "/rjwl"
    }
  }))
}
