import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 字体
import '../src/css/font.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  render: function (h) {
    return h(App)
  }
}).$mount('#app')
