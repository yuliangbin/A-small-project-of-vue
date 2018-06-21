<template>
  <footer>
    <router-link to="/home">
        <i class='iconfont icon-shouye1'></i>
        <span>首页</span>
    </router-link>
    <router-link to='/list'>
        <i class='iconfont icon-liebiao'></i>
        <span>列表</span>
    </router-link>
    <router-link to='collect'>
        <i class='iconfont icon-shoucang1'></i>
        <span>收藏</span>
    </router-link>
    <router-link to='add'>
        <i class='iconfont icon-tianjia'></i>
        <span>添加</span>
    </router-link>
  </footer>
</template>
<style>

    footer {
        display:flex;
        position:fixed;
        left:0;
        bottom:0;
        height:50px;
        width:100%;
        border-top:1px solid #ccc;
      background:#fff;

    }
    a {
        display:flex;
        flex-direction:column;
        flex:1;
        align-items:center;
        justify-content:center;
        color:orange;
    }
    a.router-link-active {
        color:red;
    }
</style>


