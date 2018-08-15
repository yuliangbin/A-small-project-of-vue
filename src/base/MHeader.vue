<template>
  <header>
      <slot></slot>
      <i v-if="back" class='iconfont icon-fanhui1' @click="goBack"></i>
  </header>
</template>
<script>
export default {
  props:{
      back:{
          type:Boolean,
          default:false,
      }
  },
  methods:{
    goBack(){
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped lang="less">
    header {
        position: fixed;
        top: 0;
        z-index: 10;
        background:#afd9ee;
        font-size: 0.5rem;
        width: 9.2rem;
        height:1rem;
        text-align:center;
        line-height:1rem;
        font-weight:bold;
         i {
            position:absolute;
            left:0.1rem;
          }
    }
 
</style>
