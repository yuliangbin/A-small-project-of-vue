import Vue from 'vue';
//这样直接引用vue，引用的并不是vue.js，引用的h是vue的runtime
//vue = compiler + runtime  (compiler可以编译模板)
import App from './App.vue';
import router from './router/router.js';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
Vue.use(VueAwesomeSwiper);

new Vue({
  el:'#app',
  //render函数的作用是将虚拟DOM渲染成真实的DOM
  //h函数返回的是虚拟DOM
  render:(h)=>h(App),
  router:router,
})

