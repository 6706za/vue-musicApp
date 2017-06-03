<template>
    <div class="topListBox"  :style="{'background-image': 'url('+topList.img+')'}">
        <ul class="topList">
            <div  class="topListTitle">
                <p :style="{'background-color':topList.color}"></p>
                <h1 :style="{'color':'#fff'}"> {{topList.title}}</h1>
            </div>
            <li class="topListInfo" v-for="val in topList.list" >
                <h1 :style="{'color':'#fff'}">{{$index+1}}</h1>
                <P>
                    <b :style="{'color':'#fff'}" @click="getAudioPath(val.songid)">{{val.name}}</b>
                    <span :style="{'color':'#fff'}">{{val.singer}}</span>
                </P>
            </li>
        </ul>
    </div>
    <div class="audio"><audio :src="audioPath" controls="controls" autoplay="autoplay"></audio></div>
</template>
<script>
    export default{
        data(){
            return{
                topList:{color:'',img:'',list:[]},
                listId:this.$route.params.id,
                audioPath:''
            }
        },
        methods:{
            getTopList(){
                this.$http.jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?', {
                    topid:this.listId
                },{
                    jsonp: 'jsonpCallback'
                }).then(function(res) {
                    console.log(res)
                    this.topList.title=res.data.topinfo.ListName;
                    this.topList.img=res.data.topinfo.pic_album;
                    var that = this;
                    res.data.songlist.forEach(val => {
                        that.topList.list.push({
                            name:val.data.songname,
                            img:"https://y.gtimg.cn/music/photo_new/T002R150x150M000"+val.data.albummid+".jpg?max_age=2592000",
                            songid:val.data.songid,
                            singer:val.data.singer[0].name
                            })
                    });
                })
            },
            getAudioPath(id){
                this.audioPath = 'http://ws.stream.qqmusic.qq.com/'+id+'.m4a?fromtag=46'
            }
        },
        created : function(){
            this.getTopList();
        }
    }
</script>
<style>
    .topListBox{
        height:74vh;
        overflow: auto;
        background-size: contain;
        background-repeat: no-repeat;
    }
    .topListTitle{
        position:relative;
        height:8vh;
    }
    .topListTitle p{
        height:100%;
        width:100%;
        position: absolute;
        left: 0;
        top:0;
        opacity: .4;
    }
    .topListTitle h1{
        position: relative;
        z-index: 1;
        line-height: 8vh;
        padding-left: 6%;
        font-size: 1.8rem;
    }
    .topList{
        padding-top: 46vh;
    }
    .topListInfo{
        display: flex;
        margin: 0;
        align-content: center;
        height: 8vh;
        background-color:rgba(51,51,51,0.3);
    }
    .topListInfo h1{
        height:8vh;
        line-height: 8vh;
        padding: 0;
        margin: 0;
        font-size: 1.6rem;
        width:14%;
        color: #fff;
        text-align: center;
    }
    .topListInfo p{
        border-bottom: 1px #eee solid;
        flex: 1;
        height:8vh;
        width:66%;
    }
    .topListInfo p b,.topListInfo p span{
        display: block;
        height:4vh;
        line-height: 4vh;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        width:80%;
        color: #fff;
    }
    .topListInfo p b{
        font-weight: normal;
        font-size: 1.4rem;
    }
    .topListInfo p span{
        font-size: 1.2rem;

        color: #eee;
    }
    .audio{height:14vh; background-color:#fafafa;}
    audio{
        width:100%;
        height:70px;
    }
</style>