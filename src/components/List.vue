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
      this.timer = setTimeout(this.scroll,300);
    },
    scroll(){
      //console.log(this.$refs.content);
      let {clientHeight,scrollTop,scrollHeight} = this.$refs.content;
      console.log(clientHeight,scrollTop,scrollHeight);
      if(clientHeight + scrollTop + 40  > scrollHeight ){
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

<style scoped lang="less">
  .container {
    width:100%;
    margin:0 auto;
    margin-top: 1rem;
    margin-bottom:1rem;
    height: 20rem;
    overflow:auto;
    ul {
      li {
        display:flex;
        /*flex-wrap:wrap;*/
        padding-bottom:0.2rem;
        padding-top:0.2rem;
        border-bottom:0.02rem solid #f1f1f1;
          img {
            width:3.2rem;
            max-height: 4rem;
          }
        div {
          width: 9.8rem;
          margin-right: 0.2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          h4 {
            line-height:0.5rem;
            padding: 0.1rem 0;
            font-size:0.5rem;
          }
          p {
            color:#2a2a2a;
            padding: 0.1rem 0;
            line-height:0.5rem;
            font-size: 0.4rem;
          }
          b {
            font-size: 0.6rem;
          }
           button {
            display:block;
            width:1.5rem;
            height:0.8rem;
            background:orangered;
            text-align:center;
            color:white;
            border:none;
            box-sizing:content-box;
            border-radius:2px;
            outline:none;
          }
        }
        
      }
    }
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

