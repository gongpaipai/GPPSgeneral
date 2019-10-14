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
                        <a>用户列表({{this.content.total}})</a>
                    </div>
                    <div class="main_Center">
                        <div class="center_left">
                            <div style="width:350px;float:left;">
                                <Input prefix="ios-search" placeholder="请输入姓名或电话" style="width: 250px" v-model="search" />
                                <Button type="primary" @click="searchSelect">搜索</Button>
                            </div>
                        </div>
                    </div>
                    <Content :style="{padding: '24px', minHeight: '280px', background: '#fff',height:'100vh',marginTop:'10px',}">
                        <div style="max-height:535px;overflow-y:scroll;">
                            <Table ellipsis :columns="columns" :data="tableData" :no-data-text="Nodata" style="border:none;"></Table> 
                            <div class="showNothing" v-if="showNo">
                                    <img src="../assets/img/without.png" alt="" style="width:400px;">
                                    <span>暂无记录</span>
                            </div> 
                            <Modal v-model="sureDelete" width="360">
                                    <p slot="header" style="color:#57a3f3;text-align:center;font-size:15px;">
                                        <Icon type="ios-information-circle"></Icon>
                                        <span>用户删除</span>
                                    </p>
                                    <div style="text-align:center;font-size:13px;">
                                        <p>此操作会删除<span style="color:red;">【{{this.deleteUser.userName}}】</span></p>
                                        <p>确定删除吗？</p>
                                    </div>
                                    <div slot="footer">
                                        <Button type="primary" size="large" long @click="SuretoDelete">确定删除</Button>
                                    </div>
                            </Modal>                                                         
                        </div>
                        <Page :total="this.content.total"
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
                        title: '姓名',
                        ellipsis:true,
                        width:170,
                        key: 'userName',
                    },
                    {
                        title: '地区',
                        key: 'address'
                    },
                    {
                        title: '电话',
                        ellipsis:true,
                        key: 'userPhone'
                    },
                    {
                        title: '身份证',
                        ellipsis:true,
                        key: 'cardUid'
                    },
                    {
                        title: '性别',
                        key: 'sex',
                        render:(h,params) =>{
                            let sexstatus = params.row.sex
                            if(sexstatus === 1){
                                sexstatus = '男'
                            }else{
                                sexstatus = '女'
                            }
                            return h('span',sexstatus)
                        }
                    },
                    {
                        title: '年龄',
                        key: 'age'
                    },
                    {
                        title: '注册时间',
                        ellipsis:true,
                        key: 'createTime'
                    },
                    {
                        title: '求职次数',
                        ellipsis:true,
                        key: 'jobNumber'
                    },
                    {
                        title: '状态',
                        ellipsis:true,
                        key: 'workStatus',
                        render:(h,params) =>{
                                let work = params.row.workStatus
                                if(work === 0){
                                    work = '未入职'
                                }else if(work === 1){
                                    work = '入职'
                                }else if (work === 2) {
                                    work = '工厂离职通过'
                                }else{
                                    work = '离职'
                                }
                                return h('span',work)
                            }
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
                                            this.$router.push({path:'/userDetails?uid='+params.row.factoryWorkerUid})
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    'class':{mouseOn2:true},
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
                                            this.remove(params.row.factoryWorkerUid,params.row.userName)
                                        }
                                    }
                                }, '删除'),
                            ]);
                        }
                    }                    
                ],
                tableData:[
               
                ],
                cityList:[],
                selectCity:'',
                page:1,
                limit:10,
                queries:'',
                Nodata:'',
                showNo:false,
                content:'',
                search:'',


                sureDelete:false,
                deleteUser:{
                    factoryWorkerUid:'',
                    userName:'',
                },
              
            }
        },
        created () {
            if(this.showNo === true){
               let Nobody =document.getElementsByTagName('tbody')[1];
               Nobody .remove();
            }           
        },        
        components:{
            TopHeader
        },
        mounted () {
            this.getData();
        },
        methods:{   
            getData () {
                request.get("/managementUser/selectAllFactoryWork", {
                   queries:this.queries,
                   pageNumStr:this.limit,
                   pageIntStr:this.page,
                })
                .then(response => {
                    if(response.data.code === 200){
                       this.content = response.data.data
                       this.tableData  = response.data.data.workersList
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
            remove (factoryWorkerUid,userName) {
                this.deleteUser.factoryWorkerUid = factoryWorkerUid
                this.deleteUser.userName = userName
                this.sureDelete = true
            }, 
            SuretoDelete () {
                request.get("/factoryUser/deleteFactoryWorker", {
                   factoryWorkerUid:this.deleteUser.factoryWorkerUid
                })
                .then(response => {
                    if(response.data.code === 200){
                       this.sureDelete = false
                       this.$Message.success('删除成功');
                       this.getData();
                    }
                })
                .catch(ex => {
                     console.log(ex,"rex")
                });                   
            },             
            searchSelect () {
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
.ivu-table-cell{
    text-align: center !important;
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
.main_top>a{
    display: block;
    width: 100%;
    height:69px;
    line-height: 69px;
    text-align: left;
    color:#000;
    font-size: 16px;
    padding-left:57px;
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
.selectCity{
    width: 310px;
    height:70px;
    line-height: 70px;
    float: left;
    padding-left: 20px;
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