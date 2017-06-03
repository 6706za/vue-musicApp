<template>
    <div class="searchPage">
        <p class="searchBox">
            <b class="glyphicon glyphicon-search"></b>
            <input type="text" placeholder="歌手/歌名/专辑名/歌词" v-model="searchKey" @keyup.enter="search(searchKey)">
            <span class="glyphicon glyphicon-search" @click="search(searchKey)"></span>
        </p>
        <h1 class="hotTitle" v-show="hotListState">热门搜索</h1>
        <div class="hot">
        <ul class="hotList" v-show="hotListState">
            <li v-for="val in seedSearch" @click="search(val.k)">{{val.k}}</li>
        </ul>
        </div>
    </div>
    <div class="searchListBox" v-show="searchListState">
        <ul class="searchList">
            <li v-for="val in searchList"  @click="getAudioPath(val.songid)">
                <div><img :src="val.img" alt=""></div>
                <div>
                <h1>{{val.name}}</h1>
                <p>{{val.singer}}</p>
                </div>
            </li>
        </ul>
    </div>
    <div class="notFound" v-show="notFound">
        <h1>抱歉找不到了QAQ</h1>
    </div>
    <div class="audio"><audio :src="audioPath" controls="controls" autoplay="autoplay"></audio></div>

</template>
<script>
    export default{
        data(){
            return{
                seedSearch:[],
                hotListState:true,
                searchListState:false,
                notFound:false,
                searchKey:'',
                searchList:[],
                audioPath:''
            }
        },
        methods:{
            search(key){
                this.$http.jsonp("https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?w="+key+"",{
                    
                },{
                    jsonp:"jsonpCallback"
                }).then(res => {
                    if (res.data.data.song.list !=[]){
                        this.hotListState=false;
                        this.searchListState=true;
                        this.searchList=[];
                        var that=this;
                        res.data.data.song.list.forEach(val => {
                            that.searchList.push({name:val.songname,
                                img:"https://y.gtimg.cn/music/photo_new/T002R150x150M000"+val.albummid+".jpg?max_age=2592000",
                                songid:val.songid,
                                singer:val.singer[0].name})
                        });
                    }else {
                        this.notFound=true
                    }
                })
            },
            getHotKey(){
                this.$http.jsonp('https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg?format=jsonp',
                    {
                        
                    },{
                        jsonp:"jsonpCallback"
                    }).then(res => {
                        var that=this;
                    res.data.data.hotkey.forEach((val,index) => {
                        if(index<10){
                            that.seedSearch.push(res.data.data.hotkey[index])
                        }
                    });
                })
            },
            getAudioPath(id){
                this.audioPath = 'http://ws.stream.qqmusic.qq.com/'+id+'.m4a?fromtag=46'
            }
        },
        created : function(){
            this. getHotKey();
        }
    }
</script>

<style>
    .searchPage{
        width: 80%;
        min-width:80%;
        margin: 0 auto;
        overflow: hidden;
    }
    .searchBox{

        margin: 1rem auto 0 auto;
        height:5vh;
        border:1px #ccc solid;
        border-radius: 2.5vh;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .searchBox input{
        border: none;
        flex: 1;
    }
    .searchBox b,.searchBox span{
        margin: 0 1rem;
    }
    .searchBox span{
        font-size:2.6vh;
        font-weight:normal;
    }
    .hotTitle{
        margin:1.2rem .3rem;
        font-size: 1.2rem;
        color: #999;
    }
    .hotList{
        display: flex;
        flex-wrap: wrap;
    }
    .hotList li{
        padding: .5rem 1rem;
        border:1px #ccc solid;
        margin:.4rem .3rem;
        font-size: 1rem;
    }
    .searchListBox{
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        width:80%;
        margin: 4vh auto 0;
    }
    .searchListBox>button{
        font-size: 2rem;
        margin-right: 10px;
    }
    .searchList{
        overflow: auto;
        height: 62vh;
        flex: 1;
    }
    .searchList li{
        border-bottom: 1px #ccc solid;
        display: flex;
        overflow: hidden;
    }
    .searchList li img{
        width:50px;
        margin: 2px 0;
    }
    .searchList li h1,.searchList li p{
        margin: .5rem 0;
        padding-left: 1rem;
    }
    .searchList li h1{
        font-size: 1.2rem;
    }
    .notFound{
        position: relative;
        height: 62vh;
    }
    .notFound button{
        font-size: 2rem;
        margin-right: 10px;
        margin-top: 10px;
    }
    .notFound h1{
        position: absolute;
        top:0;
        left:0;
        right:0;
        bottom: 0;
        margin: auto;
        text-align: center;
        height:5vh;
        font-size: 1.2rem;
    }
    .audio{
        height:14vh;
         background-color:#fafafa;
         position:fixed;
         bottom:0;
         left:0;
         right:0;
    }
    audio{
        width:100%;
        height:70px;
    }
</style>