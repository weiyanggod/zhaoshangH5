const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '/briefing',
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/zs': {
        target: 'http://115.231.76.92:8827', //招商
        // target: 'https://zsxmgj.jxufida.com:8826/', //嘉秀
        changeOrigin: true,
        withCredentials: true
      }
    }
  }
})
