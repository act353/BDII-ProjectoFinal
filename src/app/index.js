import Vue from 'vue';
import App from './App.vue';

import VueResource from 'vue-resource';
Vue.use(VueResource);

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Sesion from './components/Sesion.vue';
import Entries from './components/Inicio.vue';
import Productos from './components/Productos.vue';

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path:'/Sesion',
      component: Sesion
    },
    {
      path:'/Entries',
      component: Entries
    },
    {
      path:'/Productos',
      component: Productos
    }
  ]
});

Vue.config.productionTip = false

new Vue({
  router,
  template: '<App/>',
  components: { App },
  render: h => h(App)
}).$mount('#app');
