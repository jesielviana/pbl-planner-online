/* eslint-disable import/no-extraneous-dependencies */
import Vue from 'vue'
import { BootstrapVue, LayoutPlugin } from 'bootstrap-vue'
import vueMoment from 'vue-moment'
import VueTour from 'vue-tour'
import FirebaseVue from './firebase'

import '@fortawesome/fontawesome-free/css/all.css'
// eslint-disable-next-line import/extensions
import '@fortawesome/fontawesome-free/js/all.js'

import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './filters/format'

require('vue-tour/dist/vue-tour.css')

Vue.use(FirebaseVue)
Vue.use(BootstrapVue)
Vue.use(LayoutPlugin)
Vue.use(vueMoment)
Vue.use(VueTour)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: (h) => h(App)
}).$mount('#app')
