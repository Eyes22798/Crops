const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  devServer: {
    proxy: {
      '/': {
        target: 'http://127.0.0.1:3000/mock/11/farm/', // 对应自己的接口
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '^/farm': ''
        }
      }
    }
  },
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('api', resolve('src/api'))
      .set('assets', resolve('src/assets'))
      .set('common', resolve('src/common'))
      .set('components', resolve('src/components'))
      .set('plugins', resolve('src/plugins'))
      .set('router', resolve('src/router'))
      .set('store', resolve('src/store'))
      .set('views', resolve('src/views'))
  }
}
