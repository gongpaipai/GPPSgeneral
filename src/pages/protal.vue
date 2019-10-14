<template>
    <div class="layout">
        <Layout>
            <TopHeader></TopHeader>
            <Layout>
                <Sider hide-trigger>
                        <Menu :theme="theme3" :active-name="activeTitle" accordion  :open-names="openList" @on-select="gotoPage" style="width:240px;text-align:left;color:#8F98AA;">
                                <MenuItem v-for="(menu,j) in menu" :name="menu.menuUrl" :key="j">
                                    <Icon :type="menu.icon" />
                                    {{menu.menuName}}
                                </MenuItem>
                        </Menu>
                </Sider>
                <Layout :style="{padding: '0 24px 24px'}">
                    <Content :style="{height:'100vh',marginTop:'10px',padding:'0 0 90px 0',}">
                        <div class="main_top">
                            <div class="top_detail">
                                <div class="top_left">
                                    <img src="../assets/img/img1.png" alt="" style="width:100px;margin-top:20px;">
                                </div>
                                <div class="top_right">
                                    <span>今日注册工厂</span>
                                    <span><span style="font-size:32px;">{{this.FactoryStatic.dayCount}}&nbsp</span><span>/家</span></span>
                                </div>
                            </div>
                            <div class="top_detail">
                                <div class="top_left">
                                    <img src="../assets/img/img2.png" alt="" style="width:100px;margin-top:20px;">
                                </div>
                                <div class="top_right">
                                    <span>今日注册工人</span>
                                    <span><span style="font-size:32px;">{{this.UserStatic.dayCount}}&nbsp</span><span>/人</span></span>
                                </div>
                            </div>
                            <div class="top_detail">
                                <div class="top_left">
                                    <img src="../assets/img/img3.png" alt="" style="width:100px;margin-top:20px;">
                                </div>
                                <div class="top_right">
                                    <span>人脸用户识别</span>
                                    <span><span style="font-size:32px;">{{this.FaceTotal.faceRecognitionHeadcount}}&nbsp</span><span>/人</span></span>
                                </div>
                            </div>
                            <div class="top_detail">
                                <div class="top_left">
                                    <img src="../assets/img/img4.png" alt="" style="width:100px;margin-top:20px;">
                                </div>
                                <div class="top_right">
                                    <span>身份验证用户</span>
                                    <span><span style="font-size:32px;">{{this.UserTotal.IdentificationHeadcount}}&nbsp</span><span>/人</span></span>
                                </div>
                            </div>
                        </div>
                        <div class="center">
                            <div class="center_left">
                                <div  class="Cheader">工厂总览</div>
                                <div class="Cmain">
                                    <div class="Cdetail" style="border-right:1px solid #ccc;">
                                        <span>{{this.FactoryStatic.dayCount}}</span>
                                        <span>今日新增</span>
                                    </div>
                                    <div class="Cdetail" style="border-right:1px solid #ccc;">
                                        <span>{{this.FactoryStatic.weekCount}}</span>
                                        <span>本周新增</span>
                                    </div>
                                    <div class="Cdetail" style="border-right:1px solid #ccc;">
                                        <span>{{this.FactoryStatic.monthCount}}</span>
                                        <span>本月新增</span>
                                    </div>
                                    <div class="Cdetail">
                                        <span>{{this.FactoryStatic.allCount}}</span>
                                        <span>厂家总数</span>
                                    </div>
                                </div>
                            </div>
                            <div class="center_right">
                                <div  class="Cheader">用户总览</div>
                                <div class="Cmain">
                                    <div class="Cdetail1" style="border-right:1px solid #ccc;">
                                        <span>{{this.UserStatic.dayCount}}</span>
                                        <span>今日新增</span>
                                    </div>
                                    <div class="Cdetail1" style="border-right:1px solid #ccc;">
                                        <span>{{this.UserStatic.weekCount}}</span>
                                        <span>本周新增</span>
                                    </div>
                                    <div class="Cdetail1" style="border-right:1px solid #ccc;">
                                        <span>{{this.UserStatic.monthCount}}</span>
                                        <span>本月新增</span>
                                    </div>
                                    <div class="Cdetail1">
                                        <span>{{this.UserStatic.allCount}}</span>
                                        <span>用户总数</span>
                                    </div>
                                </div>
                            </div>
                        </div>                        
                        <div class="Linedata">
                            <div class="Linedata_top">
                                <div class="Ltop_left">工厂数据走势</div>
                                <div class="Ltop_right">
                                    <span :class="{active: showsCol == 0}" @click="btn(0)">今日</span>
                                    <span :class="{active: showsCol == 1}" @click="btn(1)">本周</span>
                                    <span :class="{active: showsCol == 2}" @click="btn(2)">本月</span>
                                    <span :class="{active: showsCol == 3}" @click="btn(3)">全年</span>
                                    <span>
                                        <DatePicker :value="Selecttime" format="yyyy/MM/dd" type="daterange" placement="bottom-end" placeholder="请选择起始日期..." style="width: 200px"></DatePicker>
                                    </span>
                                </div>
                            </div>  
                            <div class="Linedata_body">
                                <img src="../assets/img/data.png" alt="">
                                <img src="../assets/img/data.png" alt="">
                                <div id="main"></div>
                                <div id="mainUser"></div>
                            </div>
                        </div>                                             
                    </Content> 
                </Layout>
            </Layout>
            
        </Layout>
    </div>
</template>
<script>
import TopHeader from "@/components/TopHeader";
import request from "@/units/request";
import echarts from 'echarts'
const baseURL =  require('../units/request').HOST
    export default {
        data () {
            return {
                openList:[],
                activeTitle:'/',
                theme3:'light',
                value:2,
                menu: [
                {
                    menuName: '系统首页',
                    menuUrl: '/',
                    childMenu: [],
                    icon:'md-person',
                },
                {
                    menuName: '工厂管理',
                    menuUrl: 'FactoryManager',
                    childMenu: [],
                    icon:'ios-square',
                },
                {
                    menuName: '用户管理',
                    menuUrl: 'UserManager',
                    childMenu: [],
                    icon:'md-albums',
                },
                {
                    menuName: '系统管理',
                    menuUrl: 'SystermManager',
                    childMenu: [],
                    icon:'logo-hackernews',
                },
                ],  
                Selecttime:[],
                showsCol: 0,
                LineData:{
                    xdata:[],
                    sdata:[],
                },
                UserData:{
                    xdata:[],
                    sdata:[],
                },

                UserStatic:'',
                FactoryStatic:'',
                FaceTotal:'',
                UserTotal:'',
            }
        },
        created () {
            
        },
        components:{
            TopHeader,
        },
        mounted () {
            this.getTodayF();//获取今日工厂
            this.getTodayUser();//获取今日用户
            this.getUserStatics();
            this.getFactoryStatics();
            this.getFaceProve();
            this.getUserTotal();
        },
        methods:{
            getFactoryStatics () {
                request.get("/user/statistics/register", {
                    role:0,
                })
                .then(response => {
                    if(response.data.code === 200){
                        this.FactoryStatic = response.data.data
                    }
                })
                .catch(ex => {
                console.log(ex,"rex")
                });                  
            },
            getUserStatics () {
                request.get("/user/statistics/register", {
                    role:1,
                })
                .then(response => {
                    if(response.data.code === 200){
                        this.UserStatic = response.data.data
                    }
                })
                .catch(ex => {
                console.log(ex,"rex")
                });                
            },
            getFaceProve () {
                request.get("/managementUser/selectFaceRecognitionHeadcount", {
                    
                })
                .then(response => {
                    if(response.data.code === 200){
                        this.FaceTotal = response.data.data
                    }
                })
                .catch(ex => {
                console.log(ex,"rex")
                });                   
            },
            getUserTotal () {
                request.get("/managementUser/selectIdentificationHeadcount", {
                   
                })
                .then(response => {
                    if(response.data.code === 200){
                        this.UserTotal = response.data.data
                    }
                })
                .catch(ex => {
                console.log(ex,"rex")
                });                   
            },   
            getTodayF () {
                request.get("/user/today/hour/count/factory", {
                   
                })
                .then(response => {
                    if(response.data.code === 200){
                        let Tresponse = response.data.data
                        this.LineData.xdata = []
                        this.LineData.sdata = []
                        for (let i = 0; i < Tresponse.rows.length; i++) {
                            this.LineData.xdata.push(Tresponse.rows[i].Time)
                            this.LineData.sdata.push(Tresponse.rows[i].Count)
                        }
                        this.getLinedata();
                    }
                })
                .catch(ex => {
                console.log(ex,"rex")
                });                 
            },      
            getTodayUser () {
                request.get("/user/today/hour/count", {
                   
                })
                .then(response => {
                    if(response.data.code === 200){
                        let Tresponse = response.data.data
                        this.UserData.xdata = []
                        this.UserData.sdata = []
                        for (let i = 0; i < Tresponse.rows.length; i++) {
                            this.UserData.xdata.push(Tresponse.rows[i].Time)
                            this.UserData.sdata.push(Tresponse.rows[i].Count)
                        }
                        this.getLineUser();
                    }
                })
                .catch(ex => {
                console.log(ex,"rex")
                });                 
            },    
            getFcount (index) { //获取工厂年月周数据统计
                request.get("/user/factory/count", {
                   value:index,
                })
                .then(response => {
                    if(response.data.code === 200){
                        let Tresponse = response.data.data
                        this.LineData.xdata = []
                        this.LineData.sdata = []
                        for (let i = 0; i < Tresponse.rows.length; i++) {
                            this.LineData.xdata.push(Tresponse.rows[i].Time)
                            this.LineData.sdata.push(Tresponse.rows[i].Count)
                        }
                        this.getLinedata();
                    }
                })
                .catch(ex => {
                console.log(ex,"rex")
                });  
            },  
            getUcount (index) { //获取工人年月周数据统计
                request.get("/user/worker/count", {
                   value:index,
                })
                .then(response => {
                    if(response.data.code === 200){
                        let Tresponse = response.data.data
                        this.UserData.xdata = []
                        this.UserData.sdata = []
                        for (let i = 0; i < Tresponse.rows.length; i++) {
                            this.UserData.xdata.push(Tresponse.rows[i].Time)
                            this.UserData.sdata.push(Tresponse.rows[i].Count)
                        }
                        this.getLineUser();
                    }
                })
                .catch(ex => {
                console.log(ex,"rex")
                });  
            },                      
            getLinedata () {
                var myChart = echarts.init(document.getElementById('main'));
                // 绘制图表
                myChart.setOption({
                    title: {
                        x:'left',
                        text: '工厂数据统计',
                        padding:[10,0,0,100],
                        textStyle:{
                            fontSize:16,
                            color:'#32363D',
                        }
                    },
                    tooltip: {},
                    xAxis: {
                        type: 'category',
                        data: this.LineData.xdata,
                    },
                    yAxis: {
                        type: 'value',
                    },
                    series: [{
                        data: this.LineData.sdata,
                        type: 'line',
                        color:'#4C83FF',
                        smooth: true
                    }]
                });
            },
            getLineUser () {
                var myChart = echarts.init(document.getElementById('mainUser'));
                // 绘制图表
                myChart.setOption({
                    title: {
                        x:'left',
                        text: '用户数据统计',
                        padding:[10,0,0,100],
                        textStyle:{
                            fontSize:16,
                            color:'#32363D',
                        }
                    },
                    tooltip: {},
                    xAxis: {
                        type: 'category',
                        data: this.UserData.xdata,
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: this.UserData.sdata,
                        type: 'line',
                        color:'#FFAC2D',
                        smooth: true
                    }]
                });
            },     
            btn(index) {
                this.showsCol = index;
                switch (index) {
                    case 0:
                        this.getTodayF();//获取今日工厂
                        this.getTodayUser();//获取今日用户
                        break;
                    case 1:
                        this.getFcount(index);
                        this.getUcount(index);
                        break;
                    case 2:
                        this.getFcount(index);
                        this.getUcount(index);
                        break;
                    case 3:
                        this.getFcount(index);
                        this.getUcount(index);
                        break;
                    default:
                        break;
                }                
            },                   
            gotoPage (val) {
                this.$router.push({path: val})
            },
        },
    }
</script>
<style scoped>
::-webkit-input-placeholder { /* WebKit browsers */
  color: #D8DBE1;
  font-size: 12px;
}

::-moz-placeholder { /* Mozilla Firefox 19+ */
  color: #D8DBE1;
  font-size: 12px;
}

:-ms-input-placeholder { /* Internet Explorer 10+ */
  color: #D8DBE1;
  font-size: 12px;
} 
.ivu-icon{
    font-size:20px;
}
.ivu-layout-sider{
    width: 240px !important;
    flex: none !important;
    min-width: 240px !important;
    max-width: 240px !important;
    background: #fff !important;
}
.ivu-menu-item{
    text-align: left;
    padding-left: 50px;
}
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    min-width: 1400px;
    height:100vh;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
.main_top{
    width: 100%;
    height:150px;
    display: flex;
    justify-content: space-between;    
}
.top_detail{
    width: 24%;
    height:150px;
    float: left;
    background: #fff;
}
.top_left{
    width: 50%;
    height:150px;
    line-height: 150px;
    float: left;
    text-align: right;
    padding-right: 15px;
}
.top_right{
    width: 50%;
    height:150px;
    float: left;
    text-align: left;
    padding-left: 10px;
}
.top_right>span:nth-child(1){
    display: inline-block;
    width: 100%;
    height:30px;
    line-height: 30px;
    margin-top: 30px;
    font-size: 16px;
}
.top_right>span:nth-child(2){
    display: inline-block;
    width: 100%;
    height:30px;
    line-height: 30px;
    font-size: 14px;
    margin-top: 10px;
}
.center{
    width: 100%;
    height:250px;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;  
}
.center_left{
    width: 49.3%;
    height:250px;
    float: left;
    background: #fff;
}
.center_right{
    width: 49.3%;
    height:250px;
    float: left;
    background: #fff;
}
.Cheader{
    width:100%;
    height:59px;
    line-height: 59px;
    border-bottom:1px solid #f5f5f5;
    font-size: 18px;
    text-align: left;
    font-weight: bold;
    padding-left: 30px;
}
.Cmain{
    width: 100%;
    height:190px;
    padding:45px 0;
    display: flex;
    justify-content: space-between;
}
.Cdetail{
    width: 24%;
    height:100px;
    line-height: 50px;
    float: left;
    display: flex;
    flex-direction: column;
}
.Cdetail>span:nth-child(1){
    font-size:40px;
    color:#4C83FF;
}
.Cdetail>span:nth-child(2){
    font-size:16px;
    color:#606775;
}
.Cdetail1{
    width: 24%;
    height:100px;
    line-height: 50px;
    float: left;
    display: flex;
    flex-direction: column;
}
.Cdetail1>span:nth-child(1){
    font-size:40px;
    color:#FFAC2D;
}
.Cdetail1>span:nth-child(2){
    font-size:16px;
    color:#606775;
}
.Linedata{
    width: 100%;
    height:450px;
    margin-top: 10px;
    background: #fff;
}
.Linedata_top{
    width: 100%;
    height:59px;
    border-bottom: 1px solid #f5f5f5;
}
.Ltop_left{
    width: 50%;
    height:59px;
    line-height: 59px;
    padding-left: 30px;
    font-size: 18px;
    font-weight: bold;
    text-align: left;
    float: left;
}
.Ltop_right{
    width: 50%;
    height:59px;
    line-height: 59px;
    text-align: left;
    float: left;
    padding:0 30px 0 10%;
}
.Ltop_right>span:nth-child(1){
    display: inline-block;
    width: 46px;
    height:31px;
    line-height: 31px;
    margin:14px;
    float: left;
    text-align: center;
}
.active{
    display: inline-block;
    width: 46px;
    height:31px;
    line-height: 31px;
    margin:14px;
    float: left;
    text-align: center;
    background: #4C83FF;
    color:#fff;
    border:1px solid #4C83FF;
    border-radius: 3px;    
}
.Ltop_right>span:nth-child(2){
    display: inline-block;
    width: 46px;
    height:31px;
    line-height: 31px;
    float: left;
    margin:14px;
    text-align: center;
}
.Ltop_right>span:nth-child(3){
    display: inline-block;
    width: 46px;
    height:31px;
    line-height: 31px;
    float: left;
    margin:14px;
    text-align: center;
}
.Ltop_right>span:nth-child(4){
    display: inline-block;
    width: 46px;
    height:31px;
    line-height: 31px;
    float: left;
    margin:14px;
    text-align: center;
}
.Ltop_right>span:nth-child(5){
    display: inline-block;
    float: right;
    width: 200px;
    margin-left: 30px;
}
.Linedata_body{
    width: 100%;
    height: 490px;
    position: relative;
}
.Linedata_body>img:nth-child(1){
    width: 22px;
    position: absolute;
    left:70px;
    top:25px;
}
.Linedata_body>img:nth-child(2){
    width: 22px;
    position: absolute;
    left:850px;
    top:25px;
}
#main{
    display: inline-block;
    width: 48%;
    height:400px;
    padding:20px 20px 20px 0;
    float: left;
}
#mainUser{
    display: inline-block;
    width: 48%;
    height:400px;
    padding:20px 20px 20px 0;
    float: left;
}
</style>