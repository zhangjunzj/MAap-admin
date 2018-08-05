<template>
    <div class="addproject-container">
        <el-breadcrumb class="bread-menu" separator="/">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>新闻管理</el-breadcrumb-item>
            <el-breadcrumb-item>新增新闻</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 新增新闻表单 -->
        <div  class="form-wrap">
            <el-form ref="form" :model="form" :rules="rules"  label-width="80px">
                <el-form-item label="新闻标题" prop="title">
                    <el-input
                    placeholder="请输入新闻标题" 
                    v-model="form.title"></el-input>
                </el-form-item>
                
                <el-form-item label="新闻内容" prop="content">
                    <quill-editor 
                        v-model="form.content" 
                        ref="myQuillEditor" 
                        :options="editorOption" 
                        @blur="onEditorBlur($event)" 
                        @focus="onEditorFocus($event)"
                        @change="onEditorChange($event)">
                    </quill-editor>
                </el-form-item>
                <el-form-item label="标题图片" prop="fileList">
                    <el-upload
                        action="http://192.168.1.102/admin/news.php?action=imgadd"
                        list-type="picture-card"
                        size="mini"
                        ref="upload"
                        :limit="1"
                        :data="payload"
                        :file-list="form.fileList"
                        :auto-upload="false"
                        :show-file-list="true"
                        :on-success="imgUploadSuccessHandle"
                        :on-change="imgBeforeUpHandle"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"  :loading="loadingflag" @click="onSubmit">{{this.loadingflag ? '正在发布...': '发布新闻'}}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    import { quillEditor } from 'vue-quill-editor'
    export default {
        data() {
            return {
                dialogVisible: false,
                dialogImageUrl: '',
                loadingflag: false,
                form: {
                    title: '',
                    content: '',
                    fileList:[]
                },
                rules: {
                    title: [
                        { required: true, message: '标题不能为空', trigger: 'blur'}
                    ],
                    content: [
                        { required: true, message: '新闻内容不能为空', trigger: 'blur'}
                    ],
                    fileList: [
                        { required: true, message: '请上传标题图标', trigger: 'change'}
                    ]
                },
                editorOption:{
                    placeholder: '请编辑新闻内容',
                    modules:{
                        toolbar:[
                            ['bold', 'italic', 'underline', 'strike'],
                            ['blockquote'],
                            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                            [{ 'indent': '-1'}, { 'indent': '+1' }],
                            ['link', 'image']
                        ]
                    }
                },
                payload: { // 图片上传参数
                    targetId: null
                }
            }
        },
        components: {
            quillEditor
        },
        methods: {
            // 发布新闻
            onSubmit() {
                this.$refs.form.validate((valid)=>{
                    if (valid) {
                        this.loadingflag = true;
                        this._fetch('http://192.168.1.102/admin/news.php?action=add', 'POST', this.form)
                            .then((res)=>{
                                if (res.code === 1) {
                                    this.payload.targetId = res.id;
                                    this.$refs.upload.submit();
                                    
                                } else {
                                    this.loadingflag = false;
                                    this.$message.error('新闻发布失败!');
                                }
                            })
                            .catch((err)=> {
                                this.loadingflag = false;
                                this.$message.error('新闻发布失败!');
                            })
                    } else {
                        return false;
                    }
                });                
            },
            imgUploadSuccessHandle() {
                this.$message.success('新闻发布成功!');
                window.setTimeout(()=>{
                    this.loadingflag = false;
                    this.$router.push('/main/newslist');
                }, 500);
                
            },
            imgBeforeUpHandle(file, fileList) {
                if (file && file.status === 'ready') {
                    this.form.fileList = fileList;
                }
            },
            handleRemove(){

            },
            onEditorBlur() {
                console.log(this.content)
            },
            onEditorFocus() {

            },
            onEditorChange() {

            },
            _fetch(url, method = 'POST', params) {
                return new Promise((resolve, reject)=> {
                    fetch(url, {
                        method: method,
                        body: new URLSearchParams(params).toString(),
                        headers: new Headers({
                            'Accept': 'application/json',
                            'Content-Type': 'application/x-www-form-urlencoded'
                        })
                    })
                    .then((res)=>{
                        return res.text();
                    })
                    .then((res)=> {
                        resolve(JSON.parse(res));
                        return res;
                    })
                    .catch((err)=> {
                        reject(err);
                    })
                });
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
    .ql-editor.ql-blank::before {
        font-style: normal;
        color: #ccc;
        font-size: 14px;
    }
    .ql-editor {
        min-height: 200px;
    }
</style>
