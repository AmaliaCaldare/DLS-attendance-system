import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue"
import router from "./routes/router"

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Multiselect from 'vue-multiselect'
import SocketIO from 'socket.io-client';
import VueSocketIOExt from 'vue-socket.io-extended';
//import VueSocketIO from 'vue-socket.io'

Vue.component('multiselect', Multiselect);

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

// const options = { transports : ['websocket'] };

// Vue.use(new VueSocketIO({
//   connection: SocketIO('http://localhost:3080', options)
//   })
// );

const socket = SocketIO('http://localhost:3080', {transports : ['websocket']});
// Vue.use(new VueSocketIOExt({
//   connection: SocketIO('http://localhost:3080')
//   })
// );
Vue.use(VueSocketIOExt, socket);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
