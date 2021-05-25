import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue"
import router from "./routes/router"

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Multiselect from 'vue-multiselect'

Vue.component('multiselect', Multiselect);

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
