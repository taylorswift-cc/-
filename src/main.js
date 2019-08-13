import Vue from 'vue'
import App from './App.vue'
import router from '@/router'

import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.less'

import axios from '@/api'

import MyCom from '@/components/index.js'

Vue.prototype.$http = axios
Vue.use(MyCom)
Vue.use(elementUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
