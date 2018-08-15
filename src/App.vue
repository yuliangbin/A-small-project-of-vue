<template>
  <div>
    <transition mode="out-in">
      //需要缓存的页面走第一个
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition mode="out-in">
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

  .v-enter, .v-leave-to {
       opacity: 0;
  }
  .v-enter-active, .v-leave-active {
      transition: all 0.3s ease;
  }
</style>
