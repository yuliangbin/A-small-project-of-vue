<template>
    <div class='header'>
        <mheader :back="false" >首页</mheader>
        <load v-if="loading">疯狂加载中</load>
        <template v-else>
          <swiper :swiperSlides="sliders"></swiper>
          <div class="container">
            <h3>热门图书</h3>
            <ul class="book-list">
              <li class="book-item" v-for="(book,index) in hotbook" :key="index">
                <img class="item-img" :src="book.bookCover">
                <b class="item-name">{{book.bookName}}</b>
              </li>
            </ul>
          </div>
        </template>
    </div>
</template>
<script>
import mheader from '../base/MHeader.vue';
import loading from '../base/loading.vue'
import swiper from '../base/Swiper.vue';
import {getSliders,getHotBook,getAll} from '../api';
export default {
  created(){
    this.getData();
    //this.getSlide();  //获取轮播图
    //this.getHot();  //获取最新图书
  },
  data(){
    return {
      sliders:[],
      hotbook:[],
      loading:true,
    }
  },
  methods:{
    async getData() {
      let all = await getAll();
      //console.log(all);
      this.sliders = all[0].data;
      this.hotbook = all[1].data;
      this.loading = false;
    }
    // getHot:async function(){
    //   let book = await getHotBook();
    //   this.hotbook = book.data;
    // },
    // getSlide: async function(){
    //   let data = await getSliders();
    //   //将获取的数据放到sliders中
    //   //console.log(data.data);
    //   this.sliders = data.data;
    // },
  },
  components:{
      mheader:mheader,
      swiper:swiper,
      load:loading,
  }
}
</script>
<style scoped lang="less">
  .header {
    margin-top: 1rem;
  }
  .container {
    margin:0 0.072rem;
    margin-bottom: 1rem;
    h3 {
      color:#999;
      padding:0.1rem 0;
      font-size: 0.5rem;
    }
    .book-list {
      display:flex;
      flex-wrap:wrap;
      padding-bottom:1rem;
      .book-item {
        width:50%;
        height: 4.3rem;
        margin:0.4rem 0;
        text-align:center;
        .item-img{
          width:3.5rem;
          height: 3.8rem;
        }
        .item-name {
          height: 0.4rem;
          line-height: 0.4rem;
          font-size: 0.4rem;
          display: block;
        }
      }
      
    }
  }
  
  
</style>
