const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: '/briefing',
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/zs': {
        target: 'http://115.231.76.92:8827',
        changeOrigin: true,
        withCredentials: true
      }
    }
  }
})
