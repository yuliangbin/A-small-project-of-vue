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
    <router-link to='/collect'>
        <i class='iconfont icon-shoucang1'></i>
        <span>收藏</span>
    </router-link>
    <router-link to='/add'>
        <i class='iconfont icon-tianjia'></i>
        <span>添加</span>
    </router-link>
  </footer>
</template>
<style scoped lang="less">

    footer {
        display:flex;
        justify-content: space-around;
        flex: 1;
        margin: 0 auto;
        position: fixed;
        bottom: 0px;
        height: 1rem;
        width: 9.12rem;
        border-top: 0.1rem solid rgb(250, 235, 235);
        background:#fff;
        z-index: 99;
        a {
            display: flex;  
            flex-direction: column; 
            align-items: center;
            justify-content: center;
            flex: 1;
            color:orange;
            i {
                font-size: 0.4rem;
            }
            span {
                font-size: 0.4rem;
            }
        }
    }
   
</style>


