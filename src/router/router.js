import Vue  from 'vue'
import VueRouter from 'vue-router';
Vue.use(VueRouter);
//和以前不一样的地方，这里引入router必须使用use。功能为注册全局组件
// import Home from '../components/Home.vue';
// import List from '../components/List.vue';
// import Add from '../components/Add.vue';
// import Detail from '../components/Detail.vue';
// import Collect from '../components/Collect.vue';

export default new VueRouter({
  mode:"hash",
  routes:[
    {path:'/',redirect:'/home'},
    {
      path:'/home',
      component:() => import('../components/Home.vue'),
      meta:{keepAlive:true},//this.$route.meta.keepAlive
    },
    {path:'/list',component:() => import('../components/List.vue')},
    {path:'/add',component:() => import('../components/Add.vue')},
    {path:'/collect',component:() => import('../components/Collect.vue')},
    {path:'/detail/:bid',component:() => import('../components/Detail.vue'),name:'detail'},
  ]
})
