<template>
    <div class="home">
    <!--<img :src="imgPath" class="banner">-->
    <v-carousel></v-carousel>
        <div class="homeTitle"><p>小简推荐</p></div>
        <ul>
            <li v-for="val in arr">
            <a href="javascript:;" @click="getAudioPath(val.songid)">
                <img :src="val.img" :alt="val.name">
                <p class="songName">{{val.name}}</p>
                <p class="singer">{{val.singer}}</p>
             </a>   
            </li>
        </ul>
    </div> 
    <div class="audio"><audio :src="audioPath" controls="controls" autoplay="autoplay"></audio></div>
</template>
<script>
import Carousel from './carousel.vue';
    export default{
        data(){
            return{
                arr:[],
                imgPath:'../img/2.jpg',
                audioPath:''
            }
        },
        methods:{
            getMusicList(){
                this.$http.get('../json/recommend.json').then((res) =>{
                    this.arr= res.data.data;
                },(res) =>{
                    console.log( 'error' );
                });
            },
            getAudioPath(id){
                this.audioPath = 'http://ws.stream.qqmusic.qq.com/'+id+'.m4a?fromtag=46'
            }
        },
        components:{
            'v-carousel':Carousel
        },
        created : function(){
            this. getMusicList();
        }
    }

</script>
<style>
    .home{
        height:74vh;
        overflow: auto;
    }
    .homeTitle{
        display: flex;
        margin: 8px 0;
        justify-content: space-between;
    }
    .homeTitle p{
        padding:0 10px;
        height:4vh;
        line-height: 4vh;
        background:#3de1ad;
        font-size: 1.2rem;
        color: #fff;
        border-radius: 0 2vh 2vh 0;
    }
    .homeTitle a{
        display: block;
        padding:0 10px;
        margin-right: 20px;
        height:4vh;
        line-height: 4vh;
        font-size: 1rem;
        color: #4c221b;
        background: #edd1d8;
        border-radius: 2vh;
    }
    .home ul{
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
    }
    .home ul li{
        margin-bottom: 10px;
    }
    .songName{
        color: #666;
        font-size: 1.2rem;
        margin: 5px 0;
    }
    .singer{
        color: #00e09e;
        font-size: 1rem;
    }
    .goToSeniority{
        margin-top: 20px;
        display: block;
        text-align: center;
        color: #999;
    }
    .banner{
        width:100%; 
        min-height:150px;
    }
    .audio{
        height:14vh;
         background-color:#fafafa;
}
    audio{
        width:100%;
        height:70px;
    }
</style>