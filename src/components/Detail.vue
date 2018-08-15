<template>
    <div class="detail">
      <mheader :back="true">详情页</mheader>
      <ul>
        <li>
          <label for="bookName">书的名字</label>
          <input type="text" v-model="book.bookName" id="bookName">
        </li>
        <li>
          <label for="bookInfo">书的信息</label>
          <textarea type="text" v-model="book.bookInfo" id="bookInfo"></textarea>
        </li>
        <li>
          <label for="bookPrice">书的价格</label>
          <input type="text" v-model.number="book.bookPrice" id="bookPrice">
        </li>
        <li><button @click="update">确定修改</button></li>
      </ul>
    </div>
</template>
<script>
import MHeader from '../base/MHeader.vue';
import {getOneBook,updateBook} from '../api';
export default {
  data(){
    return {
      book:{},
    }
  },
  components:{
    mheader:MHeader,
  },
  created(){//页面一加载，需要根据id发送请求
    this.getData();
  },
  watch:{
    $route(){//vue默认复用模板，路径变化但模板没变不会重新渲染。因此需要监听路径变化
      this.getData();
    }
  },
  methods:{
    async update(){
      await updateBook(this.bid,this.book);
      this.$router.push('/list');//修改完成后跳转页面
    },
    async getData(){//通过id找到某一项后，赋值给book
      let oneBook = await getOneBook(this.bid);
      this.book = oneBook.data;
      //如果获取了一个空对象，则返回列表页
      Object.keys(this.book).length > 0 ? void 0 : this.$router.push('/booklist')
    }
  },
  computed:{
    bid(){
      return this.$route.params.bid;//当前组件的属性
    }
  }
}
</script>
<style scoped lang='less'>
  .detail {
    position:absolute;
    top:0;
    bottom:-1rem;
    margin-top: 1rem;
    background:#fff;
    right:0;
    left:0;
    z-index:100;
  }
  ul {
    width:6rem;
    margin:0.6rem 0 0.2rem 0.8rem;
    li {
      label {
        font-size: 0.5rem;
      }
      input {
        display: block;
        height: 0.6rem;
        width: 4rem;
        font-size: 0.4rem;
        border: 1px solid #ccc;
        margin:0.2rem 0;
      }
      textarea {
        display: block;
        height:2rem;
        width:4rem;
        border: 1px solid #ccc;
        font-size: 0.4rem;
        margin:0.2rem 0;
      }
      button {
        display:block;
        width:2rem;
        height:0.7rem;
        font-size: 0.4rem;
        background:#2aadd2;
        color:white;
        border:none;
        border-radius:0.04rem;
        outline:none;
      }
    }
  }
   
</style>
