import Vue from 'vue'
import App from './App.vue'
import http from '@/static/js/http.js'
import store from '@/store/index.js'
import router from '@/router/index.js'
import iView from 'iview'
// 引入iview的css样式
import 'iview/dist/styles/iview.css';

Vue.use(iView)
Vue.config.productionTip = false
Vue.prototype.$http = http

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
