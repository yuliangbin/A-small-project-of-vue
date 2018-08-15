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
            <label for="bookCover">书的封面地址</label>
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
      if (!this.book.bookInfo && !this.bookName && !this.bookPrice && this.bookCover) {
        await addBook(this.book);
        this.$router.push('/list');
        console.log(2);
      }
    }
  },
  components:{
    mheader:MHeader,
  }
}
</script>
<style scoped lang="less">
  .container {
    margin-left: 0.5rem;
    margin-bottom: 1.2rem;
    margin-top: 1rem;
    ul {
      display: flex;
      flex-direction: column;
      li {
        label {
          font-size: 0.5rem;
        }
        input {
          display: block;
          width: 5rem;
          height: 0.8rem;
          line-height: 0.8rem;
          border: 0.02rem solid rgb(179, 171, 171);
          margin: 0.1rem 0;
          font-size: 0.4rem;
        }
        textarea {
          display: block;
          width: 5rem;
          min-height: 2rem;
          border: 0.02rem solid rgb(179, 171, 171);
          margin: 0.1rem 0;
          font-size: 0.4rem;
          line-height: 0.4rem;
        }
        button {
          margin-top: 0.2rem;
          display:block;
          font-size: 0.4rem;
          width: 2rem;
          height:0.6rem;
          background:#2aadd2;
          color:white;
          border:none;
          border-radius:0.02rem;
          outline:none;
        }
      }
    }
  }


/*
  ul {
    width:4rem;
    margin:0.6rem 0 0.4rem 0.4rem;
  }
  ul li label{
    font-size:0.5rem;
  }
  ul li input {
    height: 0.5rem;
    width: 4rem;
    margin:0.1rem 0;
    border: 0.02rem solid rgb(131, 126, 126);
  }
  
  button {
    
  }
  */
</style>
