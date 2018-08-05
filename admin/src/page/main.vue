<template>
    <div class="container">
        <el-container class="el-cont">
            <el-header>
                <div class="main-logo">
                    <span>MAap</span>
                </div>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu
                    default-active="1-1"
                    class=""
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#409EFF">
                    <el-submenu index="1">
                        <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>项目管理</span>
                        </template>
                        <el-menu-item-group>
                        <el-menu-item @click="toProjectList" index="1-1">项目列表</el-menu-item>
                        <el-menu-item  @click="toAddProject" index="1-2">新增项目</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>新闻管理</span>
                        </template>
                        <el-menu-item-group>
                        <el-menu-item @click="toNewsList" index="2-1">新闻列表</el-menu-item>
                        <el-menu-item  @click="toAddNews" index="2-2">新增新闻</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item index="3">
                        <i class="el-icon-setting"></i>
                        <span slot="title">账号管理</span>
                    </el-menu-item>
                    <el-menu-item index="4" @click="toIntroduce">
                        <i class="el-icon-document"></i>
                        <span slot="title">使用说明</span>
                    </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        toProjectList() {
            this.$router.push('/main/projectlist')
        },
        toNewsList() {
            this.$router.push('/main/newslist')
        },
        toAddProject() {
            this.$router.push('/main/addproject')
        },
        toAddNews() {
            this.$router.push('/main/addnews')
        },
        toIntroduce() {
            this.$router.push('/main/introduce')
        }
    }
}
</script>
<style lang="scss" scoped>
    .container {
        position: absolute;
		left: 0;
		top: 0;
		right: 0;
        bottom: 0;
        //background-image: url(../assets/bg.jpg);
        .el-cont {
            width: 100%;
            height: 100%;
        }
        .el-header {
            padding: 0;
            background: rgb(55,98, 167);
        }
        .el-aside {
            background: rgb(68, 74, 81);
        }
        .el-main {
            background: #fff;
        }
        .main-logo {
            width: 200px;
            height: 100%;
            line-height: 60px;
            font-size: 20px;
            text-indent: 30px;
            float: left;
            background: rgb(34, 70, 125);
            color: #fff;
            
        }
    }
</style>


