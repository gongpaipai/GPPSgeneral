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
                    <div class="main_top">
                        <a @click="back">
                            <div style="display:inline-block;float:left;width:20px;height:100%;padding-top:3px;margin-right:5px;">
                                <img src="../assets/img/back.png" alt="">
                            </div>
                            <span>返回</span>
                        </a>
                    </div>
                    <div class="main_center">
                        <div class="center_top">
                            <div class="center_left">
                                <span><img src="../assets/img/person.png" alt="" style="width:47px;"></span>
                                <span>{{this.content.userName}}</span>
                                <span><Button style="color:#4C83FF;background:#F3F6FD;border:1px solid #F3F6FD;">{{this.content.worker}}</Button></span>
                            </div>
                            <div class="center_right">
                                <Button style="width:80px;margin-right:20px;" type="primary" @click="Reset">刷新</Button>
                            </div>
                        </div>
                        <div class="center_bot">
                            <div class="center_Detail">
                                <div class="single">
                                    <span><img src="../assets/img/Education.png" alt=""></span>
                                    <span style="color:#8A93A6;">工号：</span>
                                    <span style="color:#000;">{{this.content.workerId}}</span>
                                </div>
                                <div class="single">
                                    <span><img src="../assets/img/Education.png" alt=""></span>
                                    <span style="color:#8A93A6;">身份证号：</span>
                                    <span style="color:#000;">{{this.content.cardUid}}</span>
                                </div>
                                <div class="single">
                                    <span><img src="../assets/img/Education.png" alt=""></span>
                                    <span style="color:#8A93A6;">电话：</span>
                                    <span style="color:#000;">{{this.content.userPhone}}</span>
                                </div>
                                <div class="single">
                                    <span><img src="../assets/img/Education.png" alt=""></span>
                                    <span style="color:#8A93A6;">城市：</span>
                                    <span style="color:#000;">{{this.content.address}}</span>
                                </div>
                            </div>
                            <div class="center_Detail">
                                <div class="single">
                                    <span><img src="../assets/img/Education.png" alt=""></span>
                                    <span style="color:#8A93A6;">性别：</span>
                                    <span style="color:#000;" v-if="this.content.sex === 1">男</span>
                                    <span style="color:#000;" v-if="this.content.sex === 2">女</span>
                                </div>
                                <div class="single">
                                    <span><img src="../assets/img/Education.png" alt=""></span>
                                    <span style="color:#8A93A6;">年龄：</span>
                                    <span style="color:#000;">{{this.content.age}}</span>
                                </div>
                                <div class="single">
                                    <span><img src="../assets/img/Education.png" alt=""></span>
                                    <span style="color:#8A93A6;">创建时间：</span>
                                    <span style="color:#000;">{{this.content.createTime}}</span>
                                </div>
                                
                            </div>                          
                        </div>
                    </div>
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff',height:'100vh',marginTop:'10px',}">
                        <div style="max-height:450px;overflow-y:scroll;">
                            <Table ellipsis :columns="columns" :data="tableData" :no-data-text="Nodata" style="border:none;"></Table> 
                            <div class="showNothing" v-if="showNo">
                                    <img src="../assets/img/without.png" alt="" style="width:400px;">
                                    <span>暂无记录</span>
                            </div>                              
                        </div>
                        <Page :total="this.total.total"
                            :current="1"
                            show-total show-sizer show-elevator
                            @on-change="pageChange"
                            @on-page-size-change="pageSizeChange"
                            style="margin-top:30px;"
                        />                         
                    </Content> 
                </Layout>
            </Layout>
            
        </Layout>
    </div>
</template>
<script>
import TopHeader from "@/components/TopHeader";
import request from "@/units/request";
    export default {
        data () {
            return {
                openList:[],
                activeTitle:'UserManager',
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


                columns:[
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '工厂名称',
                        ellipsis:true,
                        width:150,
                        key: 'factoryName',
                    },
                    {
                        title: '负责人',
                        ellipsis:true,
                        key: 'contact'
                    },
                    {
                        title: '工厂规模',
                        key: 'factoryRangeUid'
                    },
                    {
                        title: '企业类型',
                        ellipsis:true,
                        key: 'factoryProperty'
                    },
                    {
                        title: '入职时间',
                        ellipsis:true,
                        key: 'entryTime'
                    },
                    {
                        title: '离职时间',
                        key: 'resignationTime'
                    },
                    {
                        title: '人脸识别',
                        ellipsis:true,
                        key: ''
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 250,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    }, 
                                    'class':{mouseOn:true},
                                    style: {
                                        marginRight: '5px',
                                        background:'#F8F8FA',
                                        width:'50px',
                                        height:'32px',
                                        color:'#8A93A6',
                                        border:'1px solid #F8F8FA',
                                    },
                                    on: {
                                        click: () => {
                                            this.$router.push({path:'/factoryDetails?fid='+params.row.factoryUid})
                                        }
                                    }
                                }, '查看'),
                            ]);
                        }
                    }                    
                ],
                tableData:[
            
                ],
                page:1,
                limit:10,
                queries:'',
                Nodata:'',
                showNo:false,
                content:'',
                factoryWorkerUid:'',
                total:'',
              
            }
        },
        created () {
            this.factoryWorkerUid = this.$route.query.uid
        },
        components:{
            TopHeader,
        },
        mounted () {
            this.getUserDetails();
            this.getData();
        },
        methods:{
            getUserDetails(){
                request.get("/factoryUser/selectFactoryWorker", {
                   factoryWorkerUid:this.factoryWorkerUid
                })
                .then(response => {
                    if(response.data.code === 200){
                       this.content = response.data.data.factoryWorker
                    }
                })
                .catch(ex => {
                    console.log(ex,"rex")
                });                 
            },
            getData () {
                request.get("/factoryUser/selectJobLoggingList", {
                   factoryWorkerUid:this.factoryWorkerUid,
                   pageNumStr:this.limit,
                   pageIntStr:this.page,
                })
                .then(response => {
                    if(response.data.code === 200){
                        this.total = response.data.data
                        this.tableData = response.data.data.jobLoggingList
                        if(this.tableData.length === 0){
                           this.showNo = true
                           let Nobody =document.getElementsByTagName('tbody')[1];
                           Nobody.remove();
                       }
                    }
                })
                .catch(ex => {
                    console.log(ex,"rex")
                });                    
            },
            pageChange (current) {//分页
                this.page = current
                this.getData();
            },    
            pageSizeChange (pageSize) {
                this.limit = pageSize
                this.getData()
            },  
            Reset () {
                this.getData();
            },          
            back () {
                this.$router.go(-1)
            },
            gotoPage (val) {
                this.$router.push({path: val})
            },
        },
    }
</script>
<style>
::-webkit-scrollbar  
{  
    width: 6px;    
    border-radius: 10px;  
    background: #f5f7f9;
}
::-webkit-scrollbar-track  
{  
    -webkit-box-shadow: inset 0 0 6px #f5f7f9;  
    border-radius: 10px;  
    background-color: #f5f7f9;  
}
::-webkit-scrollbar-thumb  
{  
    border-radius: 10px;  
    /* -webkit-box-shadow: inset 0 0 6px #f5f5f5;   */
    background-color: #d8d8d8;  
} 

.ivu-table-header th{
    background-color: #fff;
    height:50px;
    line-height: 50px;
}
.ivu-table-row-hover td{
    background: #f0faff !important;
}
.ivu-table-row-highlight td{
    background-color: #fff;
}
.mouseOn:hover{
    background: #FF8C64 !important;
    border:1px solid #FF8C64 !important;
    color:#fff !important;
}
.mouseOn2:hover{
    background: #F96F6F !important;
    border:1px solid #F96F6F !important;
    color:#fff !important;
}
.mouseOn3:hover{
    background: #57a3f3 !important;
    border:1px solid #57a3f3 !important;
    color:#fff !important;
}
</style>
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
.addname{
    width: 100%;
    height:40px;
    margin-top: 10px;
}
.addname>span:nth-child(1){
    display: inline-block;
    width: 100px;
    height:40px;
    line-height: 40px;
    font-size: 12px;
    color:#8A93A6;
    text-align: center;
    float: left;
}
.addname>span:nth-child(2){
    display: inline-block;
    width: 250px;
    height:40px;
    float: left;
}
.addname>span:nth-child(2)>input{
    width: 100%;
    height:30px;
    margin:5px 0;
    padding-left: 10px;
    border:1px solid #DDE2EB;
    border-radius: 3px;
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
.ivu-layout{
    min-width: 1200px;
}
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    min-width: 900px;
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
    height:50px;
    background: #fff;
    border-bottom:1px solid #f5f5f5;
}
.main_top>a{
    display: inline-block;
    width: 100px;
    height:50px;
    line-height: 50px;
    text-align: left;
    color:#8A93A6;
    font-size: 12px;
    padding-left: 20px;
    float: left;
}
.main_top>a>img{
    width: 17px;
    height:17px;
}
.main_center{
    width: 100%;
    height:220px;
    background: #fff;
}
.center_top{
    width: 100%;
    height:80px;
    margin-top: 20px;
}
.center_left{
    width: 50%;
    height:60px;
    float: left;
    padding-left:60px;
    padding-top: 20px;
}
.center_left>span:nth-child(1){
    display: inline-block;
    width: 50px;
    height:100%;
    float: left;
}
.center_left>span:nth-child(2){
    display: inline-block;
    width: 100px;
    height:100%;
    font-size: 16px;
    color:#19233C;
    float: left;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.center_left>span:nth-child(3){
    display: inline-block;
    width: 80px;
    height:100%;
    font-size: 16px;
    color:#19233C;
    float: left;
}
.center_right{
    width: 50%;
    height:60px;
    float: left;
    padding-top: 10px;
    text-align: right;
    padding-right:50px;
}
.center_Detail{
    width: 100%;
    height:60px;
    line-height: 60px;
}
.single{
    width: 25%;
    height:60px;
    line-height: 60px;
    text-align: left;
    font-size: 14px;
    float: left;
    padding-left: 50px;
}
.table{
    width: 100%;
    max-height:520px;
    border-collapse:collapse;
    font-size: 13px;
}
.table>tr>th{
    height: 50px;
    white-space: nowrap;
    overflow: hidden;
    text-align: left;
    padding-left:50px;
}
.table>tr{
    border-bottom:1px solid #DEE2ED;
}
.table>tr>td{
    height:55px;
    text-align: left;
    padding-left:50px;
}
.trow:hover{
    background: #ebf7ff;
    box-shadow: 1px 1px 10px #ccc;
}
.showNothing{
    width: 100%;
    height:100%;
    margin-top: 40px;
    text-align: center;
}
.showNothing>span{
    display: block;
    width: 100%;
    height: 30px;
    line-height: 30px;
    text-align: center;
}
</style>