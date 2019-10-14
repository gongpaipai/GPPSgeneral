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
                        <span :class="{active: showsCol == 0}" @click="btn(0)">工厂详情</span> 
                        <span :class="{active: showsCol == 1}" @click="btn(1)">工人列表</span>
                        <span v-if="this.showsCol === 0"><Button type="primary" @click="Toedit">编辑</Button></span>
                        <span v-if="this.showsCol === 1"><Button type="primary" @click="Remark">刷新</Button></span>
                        <a @click="back">
                            <div style="display:inline-block;float:left;width:20px;height:100%;padding-top:3px;margin-right:5px;">
                                <img src="../assets/img/back.png" alt="">
                            </div>
                            <span style="display:inline-block;float:left;">返回</span>
                        </a>
                    </div>
                    <Content :style="{ minHeight: '280px', background: '#f5f7f9',height:'100vh',marginTop:'10px',}">    
                        <div class="main_center animated fadeInRight" v-show="this.showsCol === 0">
                            <div class="main_left">
                                <div class="center_top">
                                    <span><img src="../assets/img/company.png" alt="" style="width:47px;margin-top:6px;"></span>
                                    <span>{{this.factoryDetails.factoryName}}</span>
                                </div>
                                <div class="center_bot">
                                    <div class="center_Detail">
                                        <div class="single">
                                            <span><img src="../assets/img/Education.png" alt=""></span>
                                            <span style="color:#8A93A6;">企业联系人：</span>
                                            <span style="color:#000;">{{this.factoryDetails.contact}}</span>
                                        </div>
                                        <div class="single">
                                            <span><img src="../assets/img/Education.png" alt=""></span>
                                            <span style="color:#8A93A6;">联系人电话：</span>
                                            <span style="color:#000;">{{this.factoryDetails.telphone}}</span>
                                        </div>
                                        <div class="single">
                                            <span><img src="../assets/img/Education.png" alt=""></span>
                                            <span style="color:#8A93A6;">区域：</span>
                                            <span style="color:#000;">{{this.factoryDetails.factoryProvince}} {{this.factoryDetails.factoryCity}} {{this.factoryDetails.factoryArea}}</span>
                                        </div>
                                        <div class="single">
                                            <span><img src="../assets/img/Education.png" alt=""></span>
                                            <span style="color:#8A93A6;">开发人：</span>
                                            <span style="color:#000;">{{this.factoryDetails.developer}}</span>
                                        </div>                                        
                                    </div>  
                                    <div class="center_Detail">
                                        <div class="single">
                                            <span><img src="../assets/img/Education.png" alt=""></span>
                                            <span style="color:#8A93A6;">企业类型：</span>
                                            <span style="color:#000;">{{this.factoryDetails.factoryPropertyUid}}</span>
                                        </div>
                                        <div class="single">
                                            <span><img src="../assets/img/Education.png" alt=""></span>
                                            <span style="color:#8A93A6;">行业类型：</span>
                                            <span style="color:#000;">{{this.factoryDetails.industry}}</span>
                                        </div>
                                        <div class="single">
                                            <span><img src="../assets/img/Education.png" alt=""></span>
                                            <span style="color:#8A93A6;">工厂规模：</span>
                                            <span style="color:#000;">{{this.factoryDetails.factoryRangeUid}}</span>
                                        </div>
                                        <div class="single">
                                            <span><img src="../assets/img/Education.png" alt=""></span>
                                            <span style="color:#8A93A6;">注册时间：</span>
                                            <span style="color:#000;">{{this.factoryDetails.createTime}}</span>
                                        </div>
                                    </div> 
                                    <div class="center_Detail">
                                        <div class="single" style="width:50%;">
                                            <span><img src="../assets/img/Education.png" alt=""></span>
                                            <span style="color:#8A93A6;">工厂地址：</span>
                                            <span style="color:#000;">{{this.factoryDetails.factoryAddr}}</span>
                                        </div>
                                    </div>                                                                           
                                </div>
                                <div style="width:100%;height:10px;background:#f5f7f9;"></div>
                                <div class="bot">
                                    <div class="bot_left">
                                        <span><span style="font-size:40px;color:#32363D;">{{this.factoryContractSigningNum}}</span>/次</span>
                                        <span>签约合同</span>
                                    </div>
                                    <div class="bot_right">
                                        <span><span style="font-size:40px;color:#32363D;">{{this.faceRecognitionNum}}</span>/次</span>
                                        <span>人脸识别</span>
                                    </div>
                                </div>
                                <div style="width:100%;height:10px;background:#f5f7f9;"></div>
                                <div class="profile">
                                    <div class="profile_top">
                                        工厂简介
                                    </div>
                                    <div class="profile_bot">
                                        {{this.factoryDetails.factoryDescription}}
                                    </div>
                                </div>
                            </div>
                            <div class="main_right">
                                <div class="right_top">
                                    <div style="width:100%;height:59px;line-height:59px;font-size:16px;color:#19233C;border-bottom:1px solid #DEE2ED;text-align:left;padding-left:20px;">工厂二维码</div>
                                    <div style="width:100%;height:280px;text-align:center;">
                                        <img src="../assets/img/wx.png" alt="" style="width:180px;margin-top:50px;">
                                    </div>
                                    <div>
                                        <Button type="primary" size="large" style="width:196px;height:40px;">点击自动生成</Button>
                                    </div>
                                </div>
                                <div class="right_bot">
                                    <div style="width:100%;height:59px;line-height:59px;font-size:16px;color:#19233C;border-bottom:1px solid #DEE2ED;text-align:left;padding-left:20px;">上传营业执照</div>
                                    <div style="width:100%;height:280px;text-align:center;">
                                        <img src="../assets/img/select.png" alt="" style="width:240px;margin-top:50px;" v-if="showimg">
                                        <img :src="updateimg" alt="" style="width:240px;height:220px;margin-top:50px;" v-else>
                                        <input type="file" name="file" id="file" @change="changepic($event)" accept="image/*" style="display:none;">
                                    </div>
                                    <div>
                                        <Button type="primary" size="large" style="width:196px;height:40px;" @click="openimg" v-if="showselect">选取文件</Button>
                                        <Button type="primary" size="large" style="width:196px;height:40px;" @click="openimg" v-else>重新上传</Button>
                                    </div>
                                </div> 
                            </div>
                        </div>
                        <div class="main_center animated fadeInRight" v-show="this.showsCol === 1">
                            <div class="List_top">
                                <div class="List_left">
                                    <Input prefix="ios-search" placeholder="请输入工人名称或地区" style="width: 300px;" v-model="search" />
                                    <Button type="primary" @click="searchSelect">搜索</Button>
                                    <span style="margin-left:30px;">员工状态：</span>
                                    <Select v-model='UserStatus' style="width:150px">
                                        <Option v-for="item in StatusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                </div>
                                <div class="List_right">
                                    <!-- <Button class="butt" type="primary">批量管理</Button> -->
                                </div>
                            </div>
                            <div class="List_center">
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
                userUid:'',
                factoryUid:'',
                showsCol:0,
                JudgeButton:true,

                Nodata:'',
                UserStatus:'',
                StatusList:[
                    {
                        value: '1',
                        label: '在职'
                    },
                    {
                        value: '2',
                        label: '离职'
                    },
                ],
                columns:[
                    {
                        type: 'index',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '工人名称',
                        ellipsis:true,
                        width:150,
                        key: 'userName',
                    },
                    {
                        title: '工号',
                        key: 'workerId'
                    },
                    {
                        title: '身份证号',
                        ellipsis:true,
                        key: 'cardUid'
                    },
                    {
                        title: '电话',
                        ellipsis:true,
                        key: 'userPhone'
                    },
                    {
                        title: '地区',
                        key: 'address'
                    },
                    {
                        title: '工种',
                        key: 'worker'
                    },
                    {
                        title: '入职时间',
                        ellipsis:true,
                        key: 'createTime'
                    },
                    // {
                    //     title: '是否签约合同',
                    //     ellipsis:true,
                    //     key: ''
                    // },
                    // {
                    //     title: '是否人脸识别',
                    //     ellipsis:true,
                    //     key: ''
                    // },
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
                showNo:false,   
                content:'',    
                factoryDetails:'', 
                limit:10,
                page:1,
                queries:'',
                search:'',
                factoryContractSigningNum:'',
                faceRecognitionNum:'',
                showimg:true,
                showselect:true,
                updateimg:'',

                sureDelete:false,
                deleteUser:{
                    factoryWorkerUid:'',
                    userName:'',
                },
            }
        },
        created () {
            this.userUid = window.localStorage.getItem('userUid')
            this.factoryUid = this.$route.query.fid        
        },     
        watch:{
            
        },   
        components:{
            TopHeader
        },
        mounted () {
            this.getDetails();
            this.getData();
            this.getfactoryCount();
            this.getfaceCount();
            this.JudgeFile();
        },
        methods:{  
            JudgeFile () {
                request.get("/managementUser/selectFactoryLicense", {
                   factoryUid:this.factoryUid
                })
                .then(response => {
                    if(response.data.code === 200){
                        this.updateimg = response.data.data
                        this.showimg = false
                        this.showselect = false
                    }else{
                        return
                    }
                })
                .catch(ex => {
                console.log(ex,"rex")
                });                 
            },
            openimg () {
                document.getElementById('file').click()
            },
            changepic (event) {  
                if(this.factoryUid === '' || this.factoryUid === null){
                    this.$Message.error('请先添加工厂');
                    return
                }else{
                    let file = event.target.files[0]
                    let param = new FormData();
                    param.append('file',file);
                    param.append('factoryUid',this.factoryUid);
                    request.upload('/managementUser/uploadImage',param).then((response) => {
                        if(response.data.code === 200){
                            this.updateimg = response.data.data.urlPath
                            this.showimg = false
                            this.showselect = false
                            this.$Message.success('上传营业执照成功');
                        }
                        }).catch((ex) => {
                    console.log(ex)
                    })
                }
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
            getDetails () {
                request.get("/managementUser/selectFactoryInfoDetail", {
                   factoryUid:this.factoryUid
                })
                .then(response => {
                    if(response.data.code === 200){
                       this.factoryDetails = response.data.data.factoryResult
                    }
                })
                .catch(ex => {
                     console.log(ex,"rex")
                });                 
            },
            getData () {
                request.get("/factoryUser/selectFactoryWorkerList", {
                   factoryUid:this.factoryUid,
                   queries:this.queries,
                   pageNumStr:this.limit,
                   pageIntStr:this.page,
                })
                .then(response => {
                    if(response.data.code === 200){
                       this.content = response.data.data
                       this.tableData  = response.data.data.factoryWorkerList
                       if(this.tableData.length === 0){
                           this.showNo = true
                           let Nobody =document.getElementsByTagName('tbody')[1];
                           Nobody.remove();
                       }
                    }
                })
                .catch(ex => {
                console.log(ex,"rex")
                this.showNo = true
                });                 
            },   
            getfactoryCount () {
                request.get("/managementUser/selectFactoryContractSigningNum", {
                   factoryUid:this.factoryUid,
                })
                .then(response => {
                    if(response.data.code === 200){
                       this.factoryContractSigningNum = response.data.data.factoryContractSigningNum
                    }
                })
                .catch(ex => {
                    console.log(ex,"rex")
                });                 
            },  
            getfaceCount () {
                request.get("/managementUser/selectFaceRecognitionNum", {
                   factoryUid:this.factoryUid,
                })
                .then(response => {
                    if(response.data.code === 200){
                       this.faceRecognitionNum = response.data.data.faceRecognitionNum
                    }
                })
                .catch(ex => {
                    console.log(ex,"rex")
                });                 
            },                 
            back () {
                this.$router.go(-1)
            },
            btn (index) {
                this.showsCol = index
            },
            Remark () {
                this.getData();
            },
            Toedit () {
                this.$router.push({path:'/editFactory?fid='+this.factoryUid})
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
.active{
    color:#4C83FF;
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
    min-width: 1350px;
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
    margin-top: 10px;
    line-height: 50px;
    font-size: 16px;
    color:#19233C;
    position: relative;
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
    position: absolute;
    left:0;
}
.main_top>a>img{
    width: 17px;
    height:17px;
}
.main_top>span:nth-child(1){
    display: inline-block;
    width: 100px;
    font-size: 15px;
    cursor: pointer;
}
.main_top>span:nth-child(2){
    display: inline-block;
    width: 100px;
    font-size: 15px;
    cursor: pointer;
}
.main_top>span:nth-child(3){
    display: inline-block;
    width: 100px;
    font-size: 15px;
    cursor: pointer;
    position: absolute;
    right: 0;
}
.main_center{
    width: 100%;
    height:100vh;
    background: #f5f7f9;
}
.main_left{
    width:80%;
    height:100%;
    background: #fff;
    float: left;
    margin-right: 10px;
}
.main_right{
    width: 19%;
    height:100%;
    background: #fff;
    float: left;
}
.right_top{
    width: 100%;
    height:400px;
    background: #fff;
}
.right_bot{
    width: 100%;
    height:400px;
    margin-top:10px;
    background: #fff;
}
.center_top{
    width: 100%;
    height:80px;
    padding:10px 20px;
}
.center_top>span:nth-child(1){
    display: inline-block;
    width: 50px;
    height:100%;
    float: left;
    margin-right:20px;
}
.center_top>span:nth-child(2){
    display: inline-block;
    width: 300px;
    height:100%;
    line-height: 60px;
    font-size: 16px;
    color:#19233C;
    float: left;
    overflow: hidden;
    text-align: left;
    text-overflow:ellipsis;
    white-space: nowrap;
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
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.bot{
    width: 100%;
    height:120px;
}
.bot_left{
    width: 50%;
    height:80px;
    line-height: 40px;
    float: left;
    font-size: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin:20px 0;
    border-right:1px solid #f5f5f5;
}
.bot_right{
    width: 50%;
    height:80px;
    line-height: 40px;
    float: left;
    font-size: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin:20px 0;
}
.profile{
    width: 100%;
    height:400px;
}
.profile_top{
    width: 100%;
    height:59px;
    line-height: 59px;
    padding-left:30px;
    font-size: 16px;
    color:#19233C;
    text-align: left;
    border-bottom:1px solid #f5f5f5;
}
.profile_bot{
    width: 100%;
    height:340px;
    text-align: left;
    font-size: 14px;
    padding:30px;
}
.List_top{
    width: 100%;
    height:70px;
    background: #fff;
}
.List_left{
    width: 70%;
    height:70px;
    line-height: 70px;
    padding-left:30px;
    float: left;
    text-align: left;
}
.List_right{
    width: 30%;
    height:70px;
    line-height: 70px;
    text-align: right;
    padding-right: 30px;
    float: left;
}
.List_center{
    padding:24px;
    min-height: 280px;
    background: #fff;
    height:90vh;
    margin-top: 10px;
}
.showNothing{
    width: 100%;
    height: 400px;
    background: #fff;
    text-align: center;
    padding-top: 20px;
}
.showNothing>span{
    display: block;
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 15px;
    text-align: center;
}
</style>