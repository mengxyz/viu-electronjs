import Vue from 'vue'
import axios from 'axios'
import cheerio from 'cheerio'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import 'material-icons/iconfont/material-icons.scss'

import App from './App'
import router from './router'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
//Vue.router = Vue.prototype.$router = router
Vue.http = Vue.prototype.$http = axios
Vue.cheerio = Vue.prototype.$cheerio = cheerio
Vue.config.productionTip = false
Vue.use(VueMaterial)


/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  template: '<App/>'
}).$mount('#app')
