<template>
    <div>
      <mheader>添加</mheader>
      <div class="container">
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
          <li>
            <label for="bookCover">书的封面</label>
            <input type="text" v-model="book.bookCover" id="bookCover">
          </li>
          <li><button @click="add">确定添加</button></li>
        </ul>
      </div>
    </div>
</template>
<script>
import MHeader from '../base/MHeader.vue';
import {addBook} from '../api';
export default {
  data(){
    return {
      book:{},
    }
  },
  methods:{
    async add(){
      await addBook(this.book);
      this.$router.push('/list');
    }
  },
  components:{
    mheader:MHeader,
  }
}
</script>
<style scoped>

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
    height:50px;
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
