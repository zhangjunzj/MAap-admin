<template>
    <div class="container">
        <el-container class="el-cont">
            <el-header>Header</el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu
                    default-active="2"
                    class="el-menu-vertical-demo"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                    <el-submenu index="1">
                        <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>项目管理</span>
                        </template>
                        <el-menu-item-group>
                        <el-menu-item @click="toProjectList" index="1-1">项目列表</el-menu-item>
                        <el-menu-item  @click="toAddProject" index="1-1">新增项目</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>新闻管理</span>
                        </template>
                        <el-menu-item-group>
                        <el-menu-item @click="toNewsList" index="1-1">新闻列表</el-menu-item>
                        <el-menu-item  @click="toAddProject" index="1-1">新增新闻</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item index="4">
                        <i class="el-icon-setting"></i>
                        <span slot="title">账号管理</span>
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
        .el-cont {
            width: 100%;
            height: 100%;
        }
        .el-header {
            background: #ddd;
        }
        .el-aside {
            background: #ccc;
        }
    }
</style>


