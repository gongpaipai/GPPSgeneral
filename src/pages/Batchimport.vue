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
                        批量导入
                        <a @click="back">
                            <div style="display:inline-block;float:left;width:20px;height:100%;padding-top:3px;margin-right:5px;">
                                <img src="../assets/img/back.png" alt="">
                            </div>
                            <span>返回</span>
                        </a>
                    </div>
                    <Content :style="{ minHeight: '280px', background: '#f5f7f9',height:'100vh',marginTop:'10px',}">    
                        <div class="center animated bounceInRight" v-show="this.current === 0">
                            <div class="center_top animated bounceInUp">
                                <Steps :current="this.current">
                                    <Step title="上传文件"></Step>
                                    <Step title="执行导入"></Step>
                                    <Step title="导入完成"></Step>
                                </Steps>
                            </div>
                            <div class="center_main">
                                <div class="detail">
                                    <div class="detail_left">
                                        <img src="../assets/img/img6.png" alt="" style="width:90px;margin-top:30px;">
                                    </div>
                                    <div class="detail_right">
                                        <span>填写导入客户的信息</span>
                                        <span>请按照数据模板的格式准备导入数据，模板中的表头名称不可更改，表头行不能删除。</span>
                                        <span><a href="../../static/工厂导入模板.xls" download="工厂导入模板.xls" style="color:#4C83FF;">下载模板</a></span>
                                    </div>
                                </div>
                                <div class="detail">
                                    <div class="detail_left">
                                        <img src="../assets/img/img5.png" alt="" style="width:90px;margin-top:30px;">
                                    </div>
                                    <div class="detail_right">
                                        <span>客户初始密码（8-20位字符。不允许有空格）</span>
                                        <Input v-model="Initialpassword" placeholder="登录后系统会提示修改密码" style="width: 400px;margin-top:20px;" />
                                    </div>
                                </div>                                
                                <div class="detail">
                                    <div class="detail_left">
                                        <img src="../assets/img/img7.png" alt="" style="width:90px;margin-top:30px;">
                                    </div>
                                    <div class="detail_right">
                                        <span>上传填好的客户信息</span>
                                        <span>文件后缀名必须为xls或xlsx（即Excel格式），文件大小不得大于10M。</span>
                                        <span @click="openFile">上传文件</span>
                                        <span v-show="JudgeExport">已上传 {{this.FileName}}</span>
                                        <input type="file" accept="application/vnd.ms-excel" @change="changepic($event)" id="importFile" style="display:none;">
                                    </div>
                                </div>
                            </div>
                            <div class="center_bot">
                                <Button type="primary" style="width:150px;height:42px;" @click="nextSeconds">下一步</Button>
                            </div>
                        </div>
                        <div class="center animated fadeInRight" v-show="this.current === 1">
                            <div class="center_top animated bounceInUp">
                                <Steps :current="this.current">
                                    <Step title="上传文件"></Step>
                                    <Step title="执行导入"></Step>
                                    <Step title="导入完成"></Step>
                                </Steps>
                            </div>
                            <div class="Second">
                                <div class="Second_left">
                                    <div class="successIn">
                                        <div class="success_left">
                                            <img src="../assets/img/success.png" alt="" style="width:80px;margin-top:27px;">
                                        </div>
                                        <div class="success_right">
                                            <span>本次可导入客户数量</span>
                                            <span>{{this.content.successRow}}条</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="Second_right">
                                    <div class="errorIn">
                                        <div class="error_left">
                                            <img src="../assets/img/error.png" alt="" style="width:80px;margin-top:27px;">
                                        </div>
                                        <div class="error_right">
                                            <span>本次不可导入客户数量</span>
                                            <span>{{this.content.failRow}}条</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="Second_bot">
                                    <Button style="width:150px;height:42px;margin-right:20px;" @click="checkStep">重新上传</Button>
                                    <Button type="primary" style="width:150px;height:42px;" @click="finish">下一步</Button>
                                </div>
                            </div>
                            <div style="width:100%;height:10px;background:#f5f7f9;"></div>
                            <div style="width:100%;height:49px;line-height:49px;border-bottom:1px solid #f5f5f5;text-align:left;padding-left:30px;font-size:16px;color:#19233C;">导入异常列表</div>
                            <div style="margin:2px 20px;height:250px;background:#fff;max-height:300px;overflow-y:scroll;">
                                <table class="table">
                                    <tr>
                                        <th>错误位置</th>
                                        <th>错误提示</th>
                                    </tr>
                                    <tr v-show="this.content.error != ''">
                                        <td>{{this.content.error}}</td>
                                        <td style="color:red;">{{this.content.errorMessage}}</td>
                                    </tr>
                                    <tr v-show="this.content.repetition != ''">
                                        <td>{{this.content.repetition}}</td>
                                        <td style="color:red;">{{this.content.repetitionMessage}}</td>
                                    </tr>
                                </table>
                            </div>
                        </div>   
                        <div class="center animated bounceInRight" v-show="this.current === 2">
                            <div class="center_top animated bounceInUp">
                                <Steps :current="this.current">
                                    <Step title="上传文件"></Step>
                                    <Step title="执行导入"></Step>
                                    <Step title="导入完成"></Step>
                                </Steps>
                            </div>
                            <div class="goal">
                                <span><img src="../assets/img/success.png" alt=""></span>
                                <span>批量导入完成</span>
                                <span>成功导入客户数量{{this.content.successRow}}条，默认密码<span style="color:red;">{{this.Initialpassword}}</span></span>
                                <span><Button type="primary" style="width:150px;height:42px;font-size:14px;" @click="complete">完成</Button></span>
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
                current:0,
                Initialpassword:'',//初始密码
   
                operateUid:'',
                FileName:'',//存放文件名称
                JudgeExport:false,//判断是否上传文件     
                content:'',       
            }
        },
        created () {
           this.operateUid = window.localStorage.getItem('userUid')
        },     
        watch:{
            
        },   
        components:{
            TopHeader
        },
        mounted () {

        },
        methods:{  
            back () {
                this.$router.go(-1)
            },
            nextSeconds () {
                if(this.JudgeExport === false){
                    this.$Message.error("请先上传文件");
                    return
                }else{
                    this.current = 1
                }
            },
            checkStep () {
                this.current = 0
            },
            finish () {
                this.current = 2
            },
            openFile () {
                document.getElementById('importFile').click();
            },
            changepic (event) {  
                if(this.Initialpassword === '' || this.Initialpassword === null){
                    this.$Message.error("请先输入初始密码");
                    return
                }else if(this.Initialpassword.length > 20 || this.Initialpassword.length < 8){
                    this.$Message.error("初始密码长度需在8-20位");
                    return
                }else{
                    window.localStorage.setItem('Initialpassword',this.Initialpassword)
                    let file = event.target.files[0]
                    let param = new FormData();
                    param.append('factoryUp',file);
                    param.append('operateUid',this.operateUid);
                    param.append('password',this.Initialpassword);
                    this.FileName = param.get('factoryUp').name
                    if(this.FileName === '' || this.FileName === undefined){
                        this.$Message.error("请先上传文件");
                        return
                    }else{
                        request.upload('/managementUser/addFactoryUserComePoi',param).then((response) => {
                            if(response.data.code === 200){
                                this.content = response.data.data
                                this.JudgeExport = true
                                this.$Message.success("导入成功");
                            }
                            }).catch((ex) => {
                                console.log(ex,"ex")
                                this.$Message.error(ex.data.msg);
                        })   
                    }                   
                }              
                
            },                          
            complete () {
                setTimeout(() =>{
                    this.$router.push({path:'/FactoryManager'})
                },500)
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
.wrong{
    color:red !important;
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
.table{
    width: 100%;
    max-height:520px;
    border-collapse:collapse;
}
.table>tr>th{
    height: 50px;
    white-space: nowrap;
    overflow: hidden;
    background-color: #fff;
}
.table>tr{
    border-bottom:1px solid #DEE2ED;
}
.table>tr>td{
    height:55px;
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
.main_top>a:nth-child(1){
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
.main_top>a:nth-child(1)>img{
    width: 17px;
    height:17px;
}
.center{
    width: 100%;
    height:100%;
    text-align: center;
    background: #fff;
}
.center_top{
    width: 100%;
    height:100px;
    padding:50px 0px 0 20%;
    text-align: start;
}
.center_main{
    width: 100%;
    height:580px;
    padding:0 100px;
}
.detail{
    width: 100%;
    height:160px;
    border:1px solid #E3E6EF;
    border-radius: 20px;
    margin-top: 30px;
}
.detail:hover{
    border:1px solid #4C83FF;
}
.detail_left{
    width: 15%;
    height:160px;
    text-align: center;
    float: left;
}
.detail_right{
    width: 75%;
    height:160px;
    text-align: left;
    float: left;
    padding:30px 0 0 20px;
}
.detail_right>span:nth-child(1){
    display: block;
    width:100%;
    height:30px;
    line-height: 30px;
    font-size: 18px;
    color:#19233C;
}
.detail_right>span:nth-child(2){
    display: block;
    width:100%;
    height:30px;
    line-height: 30px;
    font-size: 14px;
    color:#949CAE;
}
.detail_right>span:nth-child(3){
    display: block;
    width:100px;
    height:30px;
    line-height: 30px;
    font-size: 14px;
    color:#4C83FF;
    cursor: pointer;
}
.detail_right>span:nth-child(4){
    display: block;
    width:300px;
    height:30px;
    line-height: 30px;
    font-size: 14px;
    cursor: pointer;
}
.center_bot{
    width: 100%;
    height:50px;
    line-height: 50px;
    text-align: center;
}
.Second{
    width: 100%;
    height:350px;
}
.Second_left{
    width: 50%;
    height:250px;
    float: left;
}
.successIn{
    width: 60%;
    margin:58px 5% 0 35%;
    height:134px;
    border:1px solid #E3E6EF;
    border-radius: 20px;
}
.success_left{
    width: 35%;
    height:134px;
    float: left;
}
.success_right{
    width:65%;
    height:134px;
    float: left;
    padding-top: 27px;
    text-align: left;
}
.success_right>span:nth-child(1){
    display: block;
    height:40px;
    line-height: 40px;
    font-size: 18px;
    color:#19233C;
}
.success_right>span:nth-child(2){
    display: block;
    height:40px;
    line-height: 40px;
    font-size: 18px;
    color:#4C83FF;
}
.Second_right{
    width: 50%;
    height: 250px;
    float: left;
}
.errorIn{
    width: 60%;
    margin:58px 35% 0 5%;
    height:134px;
    border:1px solid #E3E6EF;
    border-radius: 20px;
}
.error_left{
    width: 35%;
    height:134px;
    float: left;
}
.error_right{
    width:65%;
    height:134px;
    float: left;
    padding-top: 27px;
    text-align: left;
}
.error_right>span:nth-child(1){
    display: block;
    height:40px;
    line-height: 40px;
    font-size: 18px;
    color:#19233C;
}
.error_right>span:nth-child(2){
    display: block;
    height:40px;
    line-height: 40px;
    font-size: 18px;
    color:#4C83FF;
}
.Second_bot{
    width: 100%;
    height:50px;
    text-align: center;
}
.goal{
    width: 100%;
    height:600px;
    padding:20px;
    text-align: center;
}
.goal>span:nth-child(1){
    display: block;
    width: 100%;
    height:110px;
}
.goal>span:nth-child(2){
    display: block;
    width: 100%;
    height:80px;
    line-height: 80px;
    font-size: 24px;
    color:#19233C;
}
.goal>span:nth-child(3){
    display: block;
    width: 100%;
    height:80px;
    line-height: 80px;
    font-size: 15px;
    color:#949CAE;
}
.goal>span:nth-child(4){
    display: block;
    width: 100%;
    height:80px;
    line-height: 80px;
}
</style>