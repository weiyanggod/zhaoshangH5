const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  publicPath: '/report/',
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://60.188.134.204:8827/seeyon',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        },
        withCredentials: true
      }
    }
  }
})
