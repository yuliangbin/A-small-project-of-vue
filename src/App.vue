<template>
  <div>
    <transition name="fadeIn">
      //需要缓存的页面走第一个
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="fadeIn">
      //不要缓存的走这个
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <tab></tab>
  </div>
</template>
<script>
import Tab from './base/Tab.vue';
export default {
  name: 'app',
  data(){
    return {
      msg:'hello',
    }
  },
  components:{
    tab:Tab,
  }
}
</script>

<style>
  * {
    margin:0;
    padding:0;;
  }
  ul , li {
    list-style:none;
  }
  a {
    text-decoration:none;
  }
  input , button {
    -webkit-appearence:none;
  }
  .content {
    position:fixed;
    width:100%;
    height:100%;
    top:40px;
    bottom:50px;
    overflow:auto;
  }
  .fadeIn-enter {
    opacity:0;
  }
  .fadeIn-enter-active {
    transition:all 0.1s linear;

  }
  .fadeIn-leave-active {
    transition:all 0.1s linear;
    opacity:0;
  }
</style>
