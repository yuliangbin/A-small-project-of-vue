<template>
  <swiper :options="swiperOption">
    <swiper-slide class="swiper-item" v-for="(slide,index) in swiperSlides" :key='index'>
      <img class="item-img" :src="slide">
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
  export default {
    name: 'carrousel',
    data() {
      return {
        swiperOption: {
          pagination: {
            el: '.swiper-pagination'
          }
        },
      }
    },
    props:['swiperSlides'],
    // mounted() {
    //   setInterval(() => {
    //     console.log('simulate async data')
    //     if (this.swiperSlides.length < 10) {
    //       this.swiperSlides.push(this.swiperSlides.length + 1)
    //     }
    //   }, 3000)
    //}
  }
</script>
<style scoped lang="less">
  .swiper-item {
    width: 7.2rem;
    height: 3rem;
    .item-img {
      width: 100%; 
      height: 100%;
    }
  }
</style>
