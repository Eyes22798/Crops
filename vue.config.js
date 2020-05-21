const path = require('path')

const apiRoot = process.env.NODE_ENV === 'development' ? 'http://www.mock.eyesky.site/mock/8' : 'localhost:8900/farm'
console.log(apiRoot)
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  devServer: {
    proxy: {
      '/': {
        target: apiRoot, // 对应自己的接口  http://www.mock.eyesky.site/mock/8
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
