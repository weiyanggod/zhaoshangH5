const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '/report',
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/zs': {
        target: 'https://zsxmgj.jxufida.com:8826/',
        changeOrigin: true,
        pathRewrite: {
          '^/zs': ''
        },
        withCredentials: true
      }
    }
  }
})
