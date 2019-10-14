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
                        <a>全部工厂({{this.content.total}})</a>
                        <a>
                            <Button type="primary" @click="jumpTo('/addFactory')">添加工厂</Button>
                        </a>
                    </div>
                    <div class="main_Center">
                        <div class="center_left">
                            <div style="width:310px;float:left;">
                                <Input prefix="ios-search" placeholder="请输入搜索工厂名称或地区" style="width: 300px" v-model="search" />
                            </div>
                            <Button type="primary" @click="searchclick">搜索</Button>
                        </div>
                        <div class="center_right">
                            <Button type="primary" style="background:#FF8C64;border:1px solid #FF8C64;margin-right:20px;" @click="MoreSelect">导出数据</Button>
                            <Button type="primary" @click="jumpTo('/Batchimport')">批量导入</Button>
                        </div>
                    </div>
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff',height:'100vh',marginTop:'10px',}">
                        <div style="max-height:535px;overflow-y:scroll;">
                            <Table ellipsis :columns="columns" :data="tableData" :no-data-text="Nodata" style="border:none;"></Table> 
                            <div class="showNothing" v-if="showNo">
                                    <img src="../assets/img/without.png" alt="" style="width:400px;">
                                    <span>暂无记录</span>
                            </div>                              
                        </div>
                        <Page :total="this.content.total"
                            :current="1"
                            show-total show-sizer show-elevator
                            @on-change="pageChange"
                            @on-page-size-change="pageSizeChange"
                            style="margin-top:30px;"
                        />                                                
                    </Content> 
                    <Modal v-model="factoryExport" width="360">
                            <p slot="header" style="color:#57a3f3;text-align:center;font-size:15px;">
                                <Icon type="ios-information-circle"></Icon>
                                <span>工厂导出</span>
                            </p>
                            <div style="text-align:center;font-size:13px;">
                                <p>请确保已做好工厂的筛选</p>
                                <p>确定导出吗？</p>
                            </div>
                            <div slot="footer">
                                <Button type="primary" size="large" long @click="Exportdata">确定导出</Button>
                            </div>
                    </Modal>
                </Layout>
            </Layout>
            
        </Layout>
    </div>
</template>
<script>
import TopHeader from "@/components/TopHeader";
import request from "@/units/request";
const baseURL =  require('../units/request').HOST
    export default {
        data () {
            return {
                openList:[],
                activeTitle:'FactoryManager',
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
                        title: '工厂名称',
                        ellipsis:true,
                        width:170,
                        key: 'factoryName',
                    },
                    {
                        title: '地区',
                        key: 'factoryCity'
                    },
                    {
                        title: '联系人',
                        key: 'contact'
                    },
                    {
                        title: '电话',
                        key: 'telphone'
                    },
                    {
                        title: '工厂规模',
                        key: 'factoryRangeUid'
                    },
                    {
                        title: '开发人',
                        key: 'developer'
                    },
                    {
                        title: '注册时间',
                        ellipsis:true,
                        key: 'createTime'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 250,
                        align: 'center',
                        render: (h, params) => {
                            let arr = []
                            arr.push(
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
                                            this.$router.push({path:'/editFactory?fid='+params.row.factoryUid})
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    'class':{mouseOn3:true},
                                    style: {
                                        background:'#F8F8FA',
                                        marginRight: '5px',
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
                                }, '查看')                               
                            )
                            if(params.row.forbiddenStsatus === 1){
                                arr.push(
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    'class':{mouseOn2:true},
                                    style: {
                                        background:'#F8F8FA',
                                        width:'50px',
                                        height:'32px',
                                        color:'#8A93A6',
                                        border:'1px solid #F8F8FA',
                                    },
                                    on: {
                                        click: () => {
                                            this.Disabling(params.row.factoryUid)
                                        }
                                    }
                                }, '禁用')                                 
                                )
                            }
                            if(params.row.forbiddenStsatus === 0){
                                arr.push(
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    'class':{mouseOn2:true},
                                    style: {
                                        background:'#FF6868',
                                        width:'50px',
                                        height:'32px',
                                        color:'#fff',
                                        border:'1px solid #F8F8FA',
                                    },
                                    on: {
                                        click: () => {
                                            this.Enabling(params.row.factoryUid)
                                        }
                                    }
                                }, '启用')                                 
                                )
                            }
                        return h('div',arr)
                        }
                    }                    
                ],
                tableData:[
                                 
                ],

                userUid:'',
                page:1,
                limit:10,
                queries:'',
                Nodata:'',
                showNo:false,
                content:'',
                search:'',
                factoryExport:false,
            }
        },
        created () {
            this.userUid = window.localStorage.getItem('userUid')
        },     
        watch:{
            
        },   
        components:{
            TopHeader
        },
        mounted () {
            this.getData();
        },
        methods:{    
            getData () {
                request.get("/managementUser/selectFactoryInfoList", {
                   queries:this.queries,
                   pageNumStr:this.limit,
                   pageIntStr:this.page,
                })
                .then(response => {
                    if(response.data.code === 200){
                       this.content = response.data.data
                       this.tableData  = response.data.data.factoryResultList
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
            MoreSelect () {
                this.factoryExport = true
            },  
            Exportdata () {   //原生导出用户，可优化
                this.factoryExport = false
                var oReq = new XMLHttpRequest();
                oReq.open("GET", baseURL+'/managementUser/exportFactoryList?queries='+this.queries);
                oReq.responseType = "blob";//！！设置回执类型
                oReq.onload = function (oEvent) {
                    var content = oReq.response;
                    var elink = document.createElement('a');
                    elink.download = "工厂信息表.xls";
                    elink.style.display = 'none';
                    var blob = new Blob([content]);
                    elink.href = URL.createObjectURL(blob);
                    document.body.appendChild(elink);
                    elink.click();
                    document.body.removeChild(elink);
                };
                oReq.send();         
            },  
            Disabling (index) {
                request.get("/managementUser/setFactoryForbidden", {
                   opreateUid:this.userUid,
                   factoryUid:index
                })
                .then(response => {
                    if(response.data.code === 200){
                        this.$Message.success("禁用成功")
                        this.getData();
                    }
                })
                .catch(ex => {
                    console.log(ex,"rex")
                });                  
            },   
            Enabling (index) {
                request.get("/managementUser/updateFactoryForbidden", {
                   opreateUid:this.userUid,
                   factoryUid:index
                })
                .then(response => {
                    if(response.data.code === 200){
                        this.$Message.success("启用成功")
                        this.getData();
                    }
                })
                .catch(ex => {
                    console.log(ex,"rex")
                });                 
            },       
            searchclick () {
                this.queries = this.search
                this.getData();
            }, 
            pageChange (current) {//分页
                this.page = current
                this.getData();
            },    
            pageSizeChange (pageSize) {
                this.limit = pageSize
                this.getData()
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
    height:70px;
    background: #fff;
    margin-top: 10px;
}
.main_top>a:nth-child(1){
    display: inline-block;
    width: 50%;
    height:70px;
    line-height: 70px;
    text-align: left;
    color:#000;
    float: left;
    font-size: 16px;
    padding-left: 57px;
}
.main_top>a:nth-child(2){
    display: inline-block;
    width: 50%;
    height:70px;
    line-height: 70px;
    text-align: right;
    color:#000;
    float: left;
    font-size: 16px;
    padding-right: 30px;
}
.main_Center{
    width: 100%;
    height:70px;
    line-height: 70px;
    background: #fff;
    margin-top: 10px;
}
.center_left{
    width: 70%;
    height:70px;
    line-height: 70px;
    text-align: left;
    padding-left:60px;
    float: left;
}
.center_right{
    width: 30%;
    height:70px;
    line-height: 70px;
    text-align: right;
    float: left;
    padding-right: 30px;
}
.showNothing{
    width: 100%;
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