import Vue from 'vue';
import App from './App.vue';
import router from './router/router.js';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
Vue.use(VueAwesomeSwiper);

new Vue({
  el:'#app',
  render:(h)=>h(App),
  router:router,
})

