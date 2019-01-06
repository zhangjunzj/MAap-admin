<template>
    <div class="addproject-container">
        <el-breadcrumb class="bread-menu" separator="/">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>关于我们</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 新增项目表单 -->
        <div  class="form-wrap">
            <el-form ref="form" :model="form" :rules="rules" :disabled="formDisable"  label-width="80px">
                
                <el-form-item label="公司简介" prop="introduce">
                    <el-input
                    type="textarea"
                    :rows="8"
                    placeholder="请输入公司简介"
                    v-model="form.introduce">
                    </el-input>
                </el-form-item>
                <el-form-item label="联系地址" prop="address">
                    <el-input
                    placeholder="请输入联系地址" 
                    v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="phone">
                    <el-input
                    placeholder="请输入联系电话" 
                    v-model="form.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱地址" prop="email">
                    <el-input
                    placeholder="请输入邮箱地址" 
                    v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="关键字" prop="keyword">
                    <el-input
                    placeholder="请输入网站关键字,以英文逗号隔开" 
                    v-model="form.keyword"></el-input>
                </el-form-item>
                <el-form-item label="网站描述" prop="description">
                    <el-input
                    placeholder="请输入网站描述"
                    v-model="form.description"></el-input>
                </el-form-item>
                <el-form-item label="背景图片" prop="fileList">
                    <el-upload
                        :action="imgUpoadUrl"
                        list-type="picture-card"
                        size="mini"
                        ref="upload"
                        :data="payload"
                        :file-list="form.fileList"
                        :auto-upload="false"
                        :limit="2"
                        :on-exceed="onExceed"
                        :on-change="imgBeforeUpHandle"
                        :on-success="imgUploadSuccessHandle"
                        :on-error="imgUploadErrorHandle"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>  
            </el-form>
            <el-form label-width="80px">
                <el-form-item>
                    <el-button type="primary"  :loading="loadingflag" @click="onSubmit">{{btnText}}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                dialogVisible: false,
                dialogImageUrl: '',
                loadingflag: false,
                formDisable: true,
                imgChangeFlag: false, // 图片是否被改动，未改动则不上传图片
                form: {
                    introduce: '',
                    address: '',
                    phone: '',
                    email: '',
                    keyword: '',
                    description: '',
                    fileList: []
                },
                rules: {
                    introduce: [
                        { required: true, message: '公司简介不能为空', trigger: 'blur'}
                    ],
                    address: [
                        { required: true, message: '联系地址不能为空', trigger: 'blur'}
                    ],
                    phone: [
                        { required: true, message: '联系电话不能为空', trigger: 'blur'}
                    ],
                    email: [
                        { required: true, message: '联系邮箱不能为空', trigger: 'blur'}
                    ],
                    keyword: [
                        { required: true, message: '关键字不能为空', trigger: 'blur'}
                    ],
                    description: [
                        { required: true, message: '网站描述不能为空', trigger: 'blur'}
                    ],
                    fileList: [
                        { required: true, message: '请至少上传一张项目图片（建议图片压缩后上传，每张不大于500kb）', trigger: 'change'}
                    ]
                },
                payload: { // 图片上传参数
                    targetId: null,
                    key: sessionStorage.getItem('nihao') || ''
                }
            }
        },
        computed: {
            imgUpoadUrl () {
                return (baseUrl + 'about.php?action=imgupdate');
            },
            btnText () {
                let text = '';
                if (this.formDisable) {
                    text = '修改信息';
                } else {
                    text = this.loadingflag ? '正在保存' : '保存信息';
                }
                return text;
            }
        },
        methods: {
            queryAbout() {
                this.$Http('about.php?action=query', 'POST', {})
                    .then((res)=> {
                        if (res.code === 1) {
                            let data = res.data[0];
                            if (data && data.imgurl) {
                                data.fileList = [{
                                    name: '',
                                    url: baseUrl + data.imgurl
                                }];
                            }
                            data.introduce = data.introduce.replace(/\<br\>/g, '\n');
                            this.form = data
                        } else {
                            this.loadingflag = false;
                            this.$message.error('更新失败!');
                        }
                    })
                    .catch((err)=> {
                        this.loadingflag = false;
                        this.$message.error('更新失败!');
                    })
            },
            onSubmit() {
                if (this.formDisable) {
                    this.formDisable = false;
                    return false;
                }
                this.$refs.form.validate((valid)=>{
                    if (valid) {
                        this.loadingflag = true;
                        this.form.introduce = this.form.introduce.replace(/[\n\r]/gm, '<br>');
                        this.form.time = new Date().getTime();
                        this.$Http('about.php?action=edit', 'POST', this.form)
                            .then((res)=>{
                                this.form.introduce = this.form.introduce.replace(/\<br\>/g, '\n');
                                if (res.code === 1) {
                                    if (this.imgChangeFlag) {
                                        this.payload.targetId = res.id;
                                        this.$refs.upload.submit();
                                    } else {
                                        this.$message.success('信息更新成功!');
                                        this.loadingflag = false;
                                        this.formDisable = true;
                                    }
                                } else {
                                    this.loadingflag = false;
                                    this.$message.error('信息更新失败!');
                                }
                            })
                            .catch((err)=> {
                                this.loadingflag = false;
                                this.$message.error('信息更新失败!');
                            })
                    } else {
                        return false;
                    }
                });                
            },
            
            handleRemove(){
                this.imgChangeFlag = true;
                this.form.fileList = [];
            },
            onExceed(files, fileList) {
                this.$message.warning('图片数量超过限制，最多上传1张呢');
            },
            imgBeforeUpHandle(file, fileList) {
                if (file && file.status === 'ready') {
                    if (file.size/1024/1024 < 2.5) {
                        this.form.fileList = fileList;
                    } else {
                        this.$message.warning('图片大小超过限制，最大2.4M');
                        return false;
                    }
                    
                }
            },
            imgUploadSuccessHandle(response, file, fileList) {
                // 所有图片都成功上传后
                // console.log(JSON.stringify(fileList));
                let flag = true;
                fileList.forEach(val => {
                    if (val.status !== 'success') {
                        flag = false;
                    }
                });
                if (flag) {
                    this.imgChangeFlag = false;
                    this.$message.success('信息更新成功!');
                    window.setTimeout(()=>{
                        this.loadingflag = false;
                        this.formDisable = true;
                    }, 100);
                }
            },
            imgUploadErrorHandle(err, file, fileList) {
                this.$message.warning('信息更新成功,图片上传异常,请到关于我们查看');
                window.setTimeout(()=>{
                    this.loadingflag = false;
                    this.formDisable = true;
                }, 100);
            }
        },
        mounted () {
                this.queryAbout();
        }
    };
</script>
<style lang="scss">
    .addproject-container {
        .form-wrap {
            padding: 30px 100px 0px 0px;
        }
        .el-form-item.is-success {
            border-color: #dcdfe6;
        }
    }
</style>
