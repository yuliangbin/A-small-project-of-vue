<template>
    <div>
        <mheader :back="false">首页</mheader>
        <load v-if="loading">疯狂加载中</load>
        <template v-else>
          <swiper :swiperSlides="sliders"></swiper>
          <div class="container">
            <h3>热门图书</h3>
            <ul>
              <li v-for="(book,index) in hotbook" :key="index">
                <img :src="book.bookCover">
                <b>{{book.bookName}}</b>
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
<style scoped>
  h3 {
    color:#999;
    padding:5px 0;
  }
  .container {
    width:90%;
    margin:0 auto;
    margin-bottom:50px;
  }
  ul {
    display:flex;
    flex-wrap:wrap;
    padding-bottom:10px;
  }
  ul li {
    width:50%;
    margin:5px 0;
    text-align:center;
  }
  img {
    width:100%;
  }
</style>
