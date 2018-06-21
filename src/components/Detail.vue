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
<style scoped>
  .detail {
    position:absolute;
    top:0;
    bottom:0;
    background:#fff;
    right:0;
    left:0;
    z-index:100;
  }
  ul {
    width:200px;
    margin:30px 0 20px 20px;
  }
  ul li label{
    display:block;
    font-size:25px;
  }
  ul li input {
    height:25px;
    width:200px;
    margin:10px 0;
  }
  ul li textarea {
    height:100px;
    width:200px;
    margin:10px 0;
  }
   button {
    display:block;
    width:60px;
    height:35px;
    background:#2aadd2;
    color:white;
    border:none;
    border-radius:2px;
    outline:none;
  }
</style>
