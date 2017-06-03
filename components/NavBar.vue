<template>
    <div class="header">简单音乐盒</div>
    <div class="navBar">
        <ul>
            <li><a v-link="{path: '/navbar/home'}">推荐</a></li>
            <li><a v-link="{path: '/navbar/raking'}">排行榜</a></li>
            <li><a v-link="{path: '/navbar/search'}">搜索</a></li>
        </ul>
    </div>
    <div><router-view></router-view></div>
</template>
<style>
    .header{
        width:100%;
        height:6vh;
        line-height:6vh;
        text-align:center;
        color: #000;
        font-size: 1.8rem;
        
    }
    .navBar ul{
        display: flex;
        justify-content: space-around;
        height:6vh;
    }
    .navBar ul li{
        line-height: 6vh;
        font-size: 1.4rem;
        flex: 1;
        text-align: center;
        cursor: pointer
    }
    .navBar ul li a{
        text-decoration: none;
        color:#000;
         font-size: 1.4rem;
    }
</style>