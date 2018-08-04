<template>
    <div class="addproject-container">
        <el-breadcrumb class="bread-menu" separator="/">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>新闻管理</el-breadcrumb-item>
            <el-breadcrumb-item>新增新闻</el-breadcrumb-item>
        </el-breadcrumb>
    
        <div  class="form-wrap">
            <el-form ref="form" :model="form" :rules="rules"  label-width="80px">
                <el-form-item label="新闻标题" prop="title">
                    <el-input
                    placeholder="请输入新闻标题" 
                    v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="标题图片">
                    <el-upload
                        action="https://jsonplaceholder.typicode.com/posts/"
                        list-type="picture-card"
                        size="mini"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove">
                        <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
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
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">发布新闻</el-button>
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
                form: {
                    title: '',
                    content: ''
                },
                rules: {
                    title: [
                        { required: true, message: '标题不能为空', trigger: 'blur'}
                    ],
                    introduce: [
                        { required: true, message: '项目介绍不能为空', trigger: 'blur'}
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
                }
            }
        },
        components: {
            quillEditor
        },
        methods: {
            onSubmit() {
                this.$refs.form.validate((valid)=>{
                    if (valid) {
                        this._fetch('http://192.168.1.102/admin/item.php?action=add', 'POST', this.form)
                            .then((res)=>{
                                if (res.code === 1) {
                                    this.$message.success('添加成功!');
                                } else {
                                    this.$message.error('修改失败!');
                                }
                            })
                            .catch((err)=> {
                                this.$message.error('修改失败!');
                            })
                    } else {
                        return false;
                    }
                });                
            },
            handlePictureCardPreview(){

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
</style>
