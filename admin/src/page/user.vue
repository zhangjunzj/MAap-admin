<template>
    <div>
        <el-breadcrumb class="bread-menu" separator="/">
            <el-breadcrumb-item>首页</el-breadcrumb-item>
            <el-breadcrumb-item>账号管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div  class="user-form-wrap">
            <el-form ref="form" :model="form" :rules="rules"  label-width="100px">
                <el-form-item label="原始密码" prop="pwd">
                    <el-input
                    type="password"
                    placeholder="请输入现在的密码" 
                    v-model="form.pwd"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newpwd">
                    <el-input
                    type="password"
                    placeholder="请输入新的密码" 
                    v-model="form.newpwd"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newpwd2">
                    <el-input
                    type="password"
                    placeholder="请再次输入新的密码" 
                    v-model="form.newpwd2"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"  :loading="loadingflag" @click="onSubmit">{{this.loadingflag ? '正在修改...': '修改密码'}}</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
    

</template>
<script>
export default {
    data() {
        return {
            loadingflag: false,
            form: {
                pwd: '',
                newpwd: '',
                newpwd2: ''
            },
            rules: {
                pwd: [
                    { required: true, message: '原始密码不能为空', trigger: 'blur'}
                ],
                newpwd: [
                    { required: true, message: '新密码不能为空', trigger: 'blur'}
                ],
                newpwd2: [
                    { required: true, message: '新密码不能为空', trigger: 'blur'}
                ],
            }
        }
    },
    methods: {
        onSubmit() {
            this.$refs.form.validate((valid)=>{
                    if (valid) {
                        let {pwd, newpwd, newpwd2} = this.form;
                        if (newpwd !== newpwd2) {
                            this.$message.warning('2次输入的密码不一致，请重新输入!');
                            return;
                        }
                        let params = {
                            pwd,
                            newpwd
                        }
                        this.loadingflag = true;
                        this.$Http('user.php', 'POST', params)
                            .then((res)=>{
                                if (res.code === 1) {
                                    sessionStorage.setItem('nihao', '');
                                    this.$message.success('密码修改成功，请返回重新登录!');
                                    setTimeout(()=> {
                                        this.$router.push('/login');
                                    }, 1000);
                                } else {
                                    this.$message.error(res.message || '密码修改失败!');
                                }
                                this.loadingflag = false;
                            })
                            .catch((err)=> {
                                this.loadingflag = false;
                                this.$message.error('密码修改失败!');
                            })
                    } else {
                        return false;
                    }
                });   
        }
    }
}
</script>
<style lang="scss">
    .user-form-wrap {
        width: 500px;
        margin-top: 30px;
    }
</style>


