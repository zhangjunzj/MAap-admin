<template>
    <div class="addproject-container">
        <el-breadcrumb class="bread-menu" separator="/">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>项目管理</el-breadcrumb-item>
            <el-breadcrumb-item>新增项目</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 新增项目表单 -->
        <div  class="form-wrap">
            <el-form ref="form" :model="form" :rules="rules"  label-width="80px">
                <el-form-item label="项目名称" prop="title">
                    <el-input
                    placeholder="请输入项目名称" 
                    v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="项目介绍" prop="introduce">
                    <el-input
                    type="textarea"
                    :rows="8"
                    placeholder="请输入内容"
                    v-model="form.introduce">
                    </el-input>
                </el-form-item>
                <el-form-item label="项目图片" prop="fileList">
                    <el-upload
                        :action="imgUpoadUrl"
                        list-type="picture-card"
                        size="mini"
                        ref="upload"
                        :data="payload"
                        :file-list="form.fileList"
                        :auto-upload="false"
                        :limit="5"
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
                <el-form-item>
                    <el-button type="primary"  :loading="loadingflag" @click="onSubmit">{{this.loadingflag ? '正在新增...': '新增项目'}}</el-button>
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
                form: {
                    title: '',
                    introduce: '',
                    fileList: []
                },
                rules: {
                    title: [
                        { required: true, message: '标题不能为空', trigger: 'blur'}
                    ],
                    introduce: [
                        { required: true, message: '项目介绍不能为空', trigger: 'blur'}
                    ],
                    fileList: [
                        { required: true, message: '请至少上传一张项目图片', trigger: 'change'}
                    ]
                },
                payload: { // 图片上传参数
                    targetId: null
                }
            }
        },
        computed: {
            imgUpoadUrl () {
                return (baseUrl + 'item.php?action=imgadd');
            }
        },
        methods: {
            onSubmit() {
                this.$refs.form.validate((valid)=>{
                    if (valid) {
                        this.loadingflag = true;
                        this.$Http('item.php?action=add', 'POST', this.form)
                            .then((res)=>{
                                if (res.code === 1) {
                                    this.payload.targetId = res.id;
                                    this.$refs.upload.submit();
                                    
                                } else {
                                    this.loadingflag = false;
                                    this.$message.error('修改添加项目失败!');
                                }
                            })
                            .catch((err)=> {
                                this.loadingflag = false;
                                this.$message.error('添加项目失败!');
                            })
                    } else {
                        return false;
                    }
                });                
            },
            
            handleRemove(){

            },
            onExceed(files, fileList) {
                this.$message.warning('图片数量超过限制，最多上传5张呢');
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
                    this.$message.success('添加项目成功!');
                    window.setTimeout(()=>{
                        this.loadingflag = false;
                        this.$router.push('/main/projectlist');
                    }, 500);
                }
            },
            imgUploadErrorHandle(err, file, fileList) {
                this.$message.warning('添加项目成功,图片上传异常，请到项目列表页查看');
                window.setTimeout(()=>{
                    this.loadingflag = false;
                    this.$router.push('/main/projectlist');
                }, 500);
            }
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
