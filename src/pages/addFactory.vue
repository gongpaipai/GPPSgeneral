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
                        添加工厂
                        <a @click="back">
                            <div style="display:inline-block;float:left;width:20px;height:100%;padding-top:3px;margin-right:5px;">
                                <img src="../assets/img/back.png" alt="">
                            </div>
                            <span>返回</span>
                        </a>
                    </div>
                    <Content :style="{ minHeight: '280px', background: '#f5f7f9',height:'100vh',marginTop:'10px',}">    
                        <div class="main">
                            <div class="main_left" v-show="showFinish">
                                <div class="addMessage">请填写工厂信息</div>
                                <div class="main_Center">
                                    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="130">
                                        <div class="Center_left">
                                            <div class="details">
                                                <FormItem label="工厂全称：" prop="factoryName">
                                                    <Input v-model="formValidate.factoryName" placeholder="请输入工厂全称" style="width:300px;"></Input>
                                                    <p style="color:#FF8C64;font-size:12px;height:15px;line-height:15px;">请填写营业执照上完整的公司名称</p>
                                                </FormItem>
                                            </div>
                                            <div class="details">
                                                <FormItem label="企业类型：" prop="factoryPropertyUid">
                                                    <Select v-model="formValidate.factoryPropertyUid" placeholder="请选择企业类型" style="width:300px;">
                                                        <Option v-for="item in factoryPropertyList" :value="item.factoryPropertyName" :key="item.factoryPropertyName">{{item.factoryPropertyName}}</Option>
                                                    </Select>
                                                </FormItem>
                                            </div>
                                            <div class="details">
                                                <FormItem label="企业联系人：" prop="contact">
                                                    <Input v-model="formValidate.contact" placeholder="请填写名字" style="width:300px;"></Input>
                                                </FormItem>
                                            </div>
                                            <div class="details">
                                                <FormItem label="地址选择：" prop="factoryProvince">
                                                    <Select v-model="formValidate.factoryProvince" placeholder="选择省份" style="width:100px;" @on-change="selectProvince">
                                                        <Option v-for="item in provinceList" :value="item.provinceid" :key="item.provinceid">{{item.province}}</Option>
                                                    </Select>
                                                    <Select v-model="formValidate.factoryCity" placeholder="选择城市" style="width:100px;" @on-change="selectCity">
                                                        <Option v-for="item in CityList" :value="item.cityid" :key="item.cityid">{{item.city}}</Option>
                                                    </Select>
                                                    <Select v-model="formValidate.factoryArea" placeholder="选择区域" style="width:100px;" @on-change="selectArea">
                                                        <Option v-for="item in AreaList" :value="item.areaid" :key="item.areaid">{{item.area}}</Option>
                                                    </Select>
                                                </FormItem>
                                            </div>
                                            <div class="details">
                                                <FormItem label="开发人(选填)：">
                                                    <Input  v-model="formValidate.developer" placeholder="请填写开发人的姓名" style="width:300px;"></Input>
                                                </FormItem>
                                            </div>
                                            <div class="details">
                                                <FormItem label="是否开启人脸识别：" prop="faceFuntion">
                                                    <RadioGroup v-model="formValidate.faceFuntion" @on-change="selectFace">
                                                        <Radio label="1">开启</Radio>
                                                        <Radio label="0">禁用</Radio>
                                                    </RadioGroup>
                                                </FormItem>
                                            </div>
                                            <div class="details">
                                                <FormItem label="是否开启合同签署：" prop="contractFunction">
                                                    <RadioGroup v-model="formValidate.contractFunction" @on-change="selectContracion">
                                                        <Radio label="1">开启</Radio>
                                                        <Radio label="0">禁用</Radio>
                                                    </RadioGroup>
                                                </FormItem>
                                            </div>
                                        </div>
                                        <div class="Center_right">
                                            <div class="details">
                                                <FormItem label="规模人数：" prop="factoryRangeUid">
                                                    <Select v-model="formValidate.factoryRangeUid" placeholder="请选择" style="width:300px;">
                                                        <Option v-for="item in factoryRangeList" :value="item.factoryRange" :key="item.factoryRange">{{item.factoryRange}}</Option>
                                                    </Select>
                                                </FormItem>
                                            </div>
                                            <div class="details">
                                                <FormItem label="行业类型：" prop="industry">
                                                    <Select v-model="formValidate.industry" placeholder="请选择行业类型" style="width:300px;">
                                                        <Option v-for="item in industryList" :value="item.industryName" :key="item.industryName">{{item.industryName}}</Option>
                                                    </Select>
                                                </FormItem>
                                            </div>
                                            <div class="details">
                                                <FormItem label="联系人电话：" prop="telphone">
                                                    <Input type="number" v-model="formValidate.telphone" placeholder="请输入电话" style="width:300px;"></Input>
                                                </FormItem>
                                            </div>
                                            <div class="details">
                                                <FormItem label="详细地址：" prop="factoryAddr">
                                                    <Input v-model="formValidate.factoryAddr" placeholder="请填写工厂详细地址" style="width:300px;"></Input>
                                                </FormItem>
                                            </div>
                                            <div class="details">
                                                <FormItem label="工厂简介:" prop="factoryDescription">
                                                    <Input v-model="formValidate.factoryDescription" type="textarea" :autosize="{minRows: 4,maxRows: 8}" placeholder="请填写简介" style="width:300px;"></Input>
                                                </FormItem>
                                            </div>
                                        </div>
                                    </Form>
                                </div>
                                <div class="main_bot">
                                    <Button size="large" style="width:96px;height:40px;margin-right:30px;" @click="reset('formValidate')">重置</Button>
                                    <Button type="primary" size="large" style="width:96px;height:40px;" @click="submit('formValidate')" v-show="Suresubmit">提交</Button>
                                    <Button type="primary" size="large" style="width:96px;height:40px;" @click="changeSubmit('formValidate')" v-show="!Suresubmit">确定更改</Button>
                                </div>
                            </div>    
                            <div class="main_left"  v-show="!showFinish" style="width:100%;height:100vh;background:#fff;">
                                <div class="showNothing">
                                        <img src="../assets/img/success.png" alt="" style="width:100px;">
                                        <span style="color:#19233C;font-size:24px;">客户资料提交成功</span>
                                        <span style="color:red;font-size:14px;">注：填完工厂资料后，记得添加工厂营业执照哦</span>
                                        <span style="margin-top:30px;">
                                            <Button style="width:150px;height:42px;margin-right:30px;" @click="reverse">重新修改</Button>
                                            <Button style="width:150px;height:42px;" type="primary" @click="jumpTo('/FactoryManager')">返回列表</Button>
                                        </span>
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
                formValidate:{
                    factoryName:'',
                    contact:'',
                    user:'',
                    factoryRangeUid:'',
                    factoryAddr:'',
                    industry:'',
                    factoryPropertyUid:'',
                    developer:'',
                    factoryProvince:'',
                    factoryCity:'',
                    factoryArea:'',
                    telphone:'',
                    contractFunction:'',
                    faceFuntion:'',
                    factoryDescription:'',
                },
                ruleValidate:{
                    factoryName:[
                        { required: true, message: '工厂全称不能为空', trigger: 'blur' }
                    ],
                    factoryPropertyUid:[
                        { required: true, message: '企业类型不能为空', trigger: 'blur' }
                    ],
                    contact:[
                        { required: true, message: '企业联系人不能为空', trigger: 'blur' }
                    ],
                    factoryRangeUid:[
                        { required: true, message: '工厂规模不能为空', trigger: 'blur' }
                    ],
                    factoryAddr:[
                        { required: true, message: '工厂详细地址不能为空', trigger: 'blur' }
                    ],
                    industry:[
                        { required: true, message: '行业类型不能为空', trigger: 'blur' }
                    ],
                    factoryProvince:[
                            { required: true, message: '省份/城市/区域不能为空', trigger: 'blur' }
                        ],
                    factoryCity:[
                            { required: true, message: '省份/城市/区域不能为空', trigger: 'blur' }
                        ],
                    factoryArea:[
                            { required: true, message: '省份/城市/区域不能为空', trigger: 'blur' }
                        ],
                    telphone:[
                        { required: true, message: '联系人电话不能为空', trigger: 'blur' }
                    ],
                    contractFunction:[
                        { required: true, message: '请选择是否开启人脸识别', trigger: 'change' }
                    ],
                    faceFuntion:[
                        { required: true, message: '请选择是否开启合同签署', trigger: 'change' }
                    ],
                    factoryDescription:[
                        { required: true, message: '工厂简介不能为空', trigger: 'blur' }
                    ],
                },


                factoryPropertyList:'',
                factoryRangeList:'',
                industryList:'',
                provinceList:'',
                CityList:'',
                AreaList:'',
                Provincechange:'',
                Citychange:'',
                Areachange:'',
                showFinish:true,
                Suresubmit:true,
                showimg:true,
                showselect:true,
                updateimg:'',
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
            this.getDetails();
            this.getProvince();
        },
        methods:{  
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
            openimg () {
                document.getElementById('file').click()
            },      
            selectFace (index) {
                this.formValidate.faceFuntion = index
            },
            selectContracion (index) {
                this.formValidate.contractFunction = index
            },  
            selectProvince (index) {
                this.getCity(index);
                this.formValidate.factoryArea = ''
                this.changeName(index)
            },
            selectCity (index) {
                this.getArea(index);
                this.changeName(index)
            },
            selectArea (index) {
                this.changeName(index)
            },
            getProvince () {
                request.get("/location/province", {
                   
                })
                .then(response => {
                    if(response.data.code === 200){
                        this.provinceList = response.data.data
                    }
                })
                .catch(ex => {
                console.log(ex,"rex")
                });                  
            },
            changeName (index) {
                request.get("/location/address", {
                   AddressId:index,
                })
                .then(response => {
                    if(response.data.code === 200){
                        if(response.data.data.id === 1){
                            this.Provincechange = response.data.data.name
                        }else if (response.data.data.id === 2) {
                            this.Citychange = response.data.data.name
                        }else{
                            this.Areachange = response.data.data.name 
                        }
                        
                    }
                })
                .catch(ex => {
                console.log(ex,"rex")
                });                 
            },
            getCity (index) {
                request.get("/location/city", {
                    provinceid:index
                })
                .then(response => {
                    if(response.data.code === 200){
                        this.CityList = response.data.data
                    }
                })
                .catch(ex => {
                console.log(ex,"rex")
                });                  
            },  
            getArea (index) {
                request.get("/location/area", {
                    cityId:index
                })
                .then(response => {
                    if(response.data.code === 200){
                        this.AreaList = response.data.data
                    }
                })
                .catch(ex => {
                console.log(ex,"rex")
                });                  
            },                       
            getDetails () {
                request.get("/industry/option", {
                   
                })
                .then(response => {
                    if(response.data.code === 200){
                        this.factoryPropertyList = response.data.data.factoryPropertyList
                        this.factoryRangeList = response.data.data.factoryRangeList
                        this.industryList = response.data.data.industryList
                    }
                })
                .catch(ex => {
                console.log(ex,"rex")
                });                 
            },
            submit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        request.post("/managementUser/addFactoryInfo", {
                            operateUid:this.userUid,
                            factoryName:this.formValidate.factoryName,
                            factoryAddr:this.formValidate.factoryAddr,
                            factoryRangeUid:this.formValidate.factoryRangeUid,
                            industry:this.formValidate.industry,
                            factoryPropertyUid:this.formValidate.factoryPropertyUid,
                            factoryProvince:this.Provincechange,
                            factoryCity:this.Citychange,
                            factoryArea:this.Areachange,
                            contact:this.formValidate.contact,
                            telphone:this.formValidate.telphone,
                            contractFunction:this.formValidate.contractFunction,
                            faceFuntion:this.formValidate.faceFuntion,
                            factoryDescription:this.formValidate.factoryDescription,
                            developer:this.formValidate.developer
                        })
                        .then(response => {
                            if(response.data.code === 200){
                                this.factoryUid = response.data.data.factoryUid
                                this.$Message.success('添加成功!');
                                setTimeout(()=>{
                                    this.showFinish = false
                                },1000)
                            }else{
                                this.$Message.error(response.data.data.msg);
                            }
                        })
                        .catch(ex => {
                            this.$Message.error(ex.data.data.msg);
                        });                          
                    } else {
                        return
                    }
                })
            },
            changeSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        request.post("/managementUser/updateFactoryFunction", {
                            factoryUid:this.factoryUid,
                            operateUid:this.userUid,
                            factoryName:this.formValidate.factoryName,
                            factoryAddr:this.formValidate.factoryAddr,
                            factoryRangeUid:this.formValidate.factoryRangeUid,
                            industry:this.formValidate.industry,
                            factoryPropertyUid:this.formValidate.factoryPropertyUid,
                            factoryProvince:this.formValidate.factoryProvince,
                            factoryCity:this.formValidate.factoryCity,
                            factoryArea:this.formValidate.factoryArea,
                            contact:this.formValidate.contact,
                            telphone:this.formValidate.telphone,
                            contractFunction:this.formValidate.contractFunction,
                            faceFuntion:this.formValidate.faceFuntion,
                            factoryDescription:this.formValidate.factoryDescription,
                            developer:this.formValidate.developer
                        })
                        .then(response => {
                            if(response.data.code === 200){
                                this.$Message.success('编辑成功!');
                                setTimeout(()=>{
                                    this.showFinish = false
                                },1000)
                            }else{
                                this.$Message.error(response.data.data.msg);
                            }
                        })
                        .catch(ex => {
                            this.$Message.error(ex.data.data.msg);
                        });                          
                    } else {
                        return
                    }
                })                
            },
            reset (name) {
                this.$refs[name].resetFields();
            },
            back () {
                this.$router.go(-1)
            },
            reverse () {
                this.showFinish = true
                this.Suresubmit = false
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
.main{
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: space-between;
}
.main_left{
    width: 80%;
    height:100%;
    background: #fff;
    float: left;
    margin-right: 10px;
}
.main_right{
    width: 19%;
    height:100%;
    background: #f5f7f9;
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
.addMessage{
    width: 100%;
    height:50px;
    line-height: 50px;
    font-size: 16px;
    color:#32363D;
    padding-left: 30px;
    text-align: left;
}
.main_Center{
    width: 100%;
    height:650px;
}
.Center_left,.Center_right{
    width: 50%;
    height:650px;
    padding:10px 20px;
    float: left;
}
.details{
    width:100%;
    height:80px;
    line-height:80px;
    padding:0 20px;
    text-align:left;
}
.showNothing{
    width: 100%;
    height: 800px;
    background: #fff;
    text-align: center;
    padding-top: 200px;
}
.showNothing>span{
    display: block;
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 20px;
    text-align: center;
}
</style>