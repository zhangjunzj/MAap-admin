<template>
    <div>
        <el-breadcrumb class="bread-menu" separator="/">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>项目管理</el-breadcrumb-item>
            <el-breadcrumb-item>新增项目</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 新增项目表单 -->
        <div  class="form-wrap">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="项目名称">
                    <el-input
                    placeholder="请输入项目名称" 
                    v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="项目介绍">
                    <el-input
                    type="textarea"
                    :rows="8"
                    placeholder="请输入内容"
                    v-model="textarea">
                    </el-input>
                </el-form-item>
                <el-form-item label="项目图片">
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
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">新增项目</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                form: {
                    title: ''
                }
            }
        },
        methods: {
            onSubmit() {
                console.log('submit');
            }
        }
    };
</script>
<style lang="scss" scoped>
    .form-wrap {
        padding: 30px 100px 0px 0px;
    }
</style>
