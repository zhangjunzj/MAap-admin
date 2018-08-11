<template>
    <div class="container">
        <el-container class="el-cont">
            <el-header>
                <div class="main-logo">
                    <span>官网后台管理系统</span>
                    <span class="eng">background management system</span>
                </div>
                <div class="main-rightside">
                    <span class="right-user">admin</span>
                    <div class="right-loginout" @click="loginoutHandle">退出</div>
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
        },
        loginoutHandle() {
            let params = {
                key: sessionStorage.getItem('nihao') || ''
            }
            this.$Http('loginout.php', 'POST', params)
                .then((res)=> {
                    if (res.code === 1) {
                        sessionStorage.setItem('nihao', '');
                        this.$router.push('/login');
                        this.$message.success('退出登录成功');
                    } else {
                        this.$message.error('退出登录失败');
                    }
                })
                .catch(()=> {
                    this.$message.error('退出登录失败');
                })
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
            background: rgb(34, 70, 125);
            position: relative;
        }
        .el-aside {
            background: rgb(68, 74, 81);
        }
        .el-main {
            background: #fff;
        }
        .main-logo {
            text-indent: 30px;
            float: left;
            color: #fff;
            padding-top: 6px;
            span {
                display: block;
                font-size: 20px;
                &.eng {
                    font-size: 14px;
                }
            }
        }
        .main-rightside {
            color: #fff;
            .right-user {
                height: 24;
                line-height: 24px;
                padding-left: 34px;
                position: absolute;
                right: 90px;
                bottom: 10px;
                font-size: 18px;
                cursor: pointer;
                &:before {
                    content: ' ';
                    display: block;
                    width: 24px;
                    height: 24px;
                    position: absolute;
                    left: 0px;
                    top: 0px;
                    background-image: url(../assets/default.jpg);
                    background-size: 24px;
                    border-radius: 100%;
                }
            }
            .right-loginout {
                height: 24px;
                line-height: 24px;
                font-size: 14px;
                position: absolute;
                right: 30px;
                bottom: 10px;
                cursor: pointer;
                &:hover {
                    opacity: 0.8;
                }
            }
        }
    }
</style>


