<template>
    <div class="introduce">
        <el-breadcrumb class="bread-menu" separator="/">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>使用说明</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row>
            <el-col :span="24">
                <span>请使用chrome、火狐、360浏览器、qq浏览器、uc浏览器打开本网站，以获得更好的体验。</span>
            </el-col>
            <el-col :span="24">
                <span>功能介绍</span>
                <span>项目列表的增、删、改、查，项目图片的上传、更新、删除；新闻列表的增、删</span>
            </el-col>
            <el-col :span="24">
                <span>注意事项</span>
                <span>图片：项目图片限制每个项目最多上传5张，用于官网banner轮播图展示，项目图片每张限制大小2.4M，尽量将图片无损压缩后上传，大小500K以内最好；新闻内容图片支持直接粘贴，新闻图片尽量小，太大可能会出现新闻发布不成功的情况</span>
            </el-col>
        </el-row>
        
        
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss">
    .introduce {
        .el-col {
            padding: 8px 0px;
            font-size: 14px;
            color: #606266;
            span {
                display: block;
                line-height: 24px;
            }
        }
        .bread-menu {
            padding-bottom: 30px;
        }
    }
</style>


