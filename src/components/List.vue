<template>
    <div>
      <mheader>列表页</mheader>
      <div class="container" ref="content" @scroll="loadMore">
        <ul>
          <router-link v-for = '(book,index) in books' tag="li" :key="index" :to="{name:'detail',params:{bid:book.bookId}}">
            <img :src="book.bookCover">
            <div>
              <h4>{{book.bookName}}</h4>
              <p>{{book.bookInfo}}</p>
              <b>{{book.bookPrice}}</b>
              <button @click.stop="remove(book.bookId)">删除</button>
            </div>
          </router-link>
        </ul>
        <!--<button @click="more" class="button">加载更多</button>-->
      </div>
    </div>
</template>
<script>
import MHeader from '../base/MHeader.vue';
import {allBook,removeBook,pagitation} from '../api';
export default {
  components:{
    mheader:MHeader,
  },
  created(){
    //this.getAllBooks();
    this.getBook();
  },
  data(){
    return {
      books:[],
      hasMore:true,
      offset:0,
      isLoading:false,
      //allBooks:[],
    }
  },
  mounted(){

  },
  methods:{
    loadMore() {
      clearTimeout(this.timer);
      this.timer = setTimeout(this.scroll,500);
    },
    scroll(){
      //console.log(this.$refs.content);
      let {clientHeight,scrollTop,scrollHeight} = this.$refs.content;
      console.log(clientHeight,scrollTop,scrollHeight);
      if(clientHeight + scrollTop + 30  > scrollHeight ){
         this.getBook();
       }
    },
    // async more() {
    //   await this.getBook();
    // },
    async getBook() {
      if (this.hasMore && !this.isLoading) {//当没有图片正在加载的时候，可以加载图片
        this.isLoading = true;//正在加载图片时，把isLoading置为true，表示正在加载
        let {data} = await pagitation(this.offset);
        //console.log(data);
        this.hasMore = data.hasMore;
        this.books = this.books.concat(data.book);
        this.offset = this.books.length;
        this.isLoading = false;
      }
    },
    // getAllBooks:async function(){
    //   let allBooks = await allBook();
    //   this.allBooks = allBooks.data;
    // },
    remove:async function(id){
      let status = await removeBook(id);
      //console.log(status.data);
      this.allBooks = this.allBooks.filter(
        item => item.bookId != id
      );
    }
  }
}
</script>

<style scoped>
  .container {
    width:100%;
    height: 428px;
    margin:0 auto;
    margin-bottom:50px;
    overflow:auto;
  }
  ul li{
    display:flex;
    /*flex-wrap:wrap;*/
    padding-bottom:10px;
    padding-top:10px;
    border-bottom:1px solid #f1f1f1;
  }
  li div {
    width: 70%;
  }
  li h4 {
    line-height:25px;
    font-size:20px;
  }
  li p {
    color:#2a2a2a;
    line-height:20px;
  }
  li img {
    width:100px;
    height:100px;
  }
  ul  button {
    display:block;
    width:60px;
    height:35px;
    background:orangered;
    text-align:center;
    color:white;
    border:none;
    box-sizing:content-box;
    border-radius:2px;
    outline:none;
  }
  .button {
    width:100%;
    height:25px;
    background:#2afedd;
    border:none;
    box-sizing:content-box;
    border-radius:2px;
    outline:none;
    padding:5px;
    line-height:25px;
    text-align:center;
    font-size:20px;
  }

</style>

