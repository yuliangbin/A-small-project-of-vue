<template>
  <header >
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

<style scoped>
    header {
        background:#afd9ee;
        height:40px;
        text-align:center;
        line-height:40px;
        font-weight:bold;
    }
  i {
    position:absolute;
    left:5px;
  }
</style>
