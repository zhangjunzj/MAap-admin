<template>
	<div class="container">
		<h2>网站后台管理系统</h2>
		<div class="content">
			<el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="80px" class="loginForm">
				<el-form-item label="用户名：" prop="username">
					<el-input type="text" placeholder="请输入用户名" v-model="loginForm.username" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="密 码：" prop="pwd">
					<el-input type="password" placeholder="请输入密码" v-model="loginForm.pwd" auto-complete="off"></el-input>
				</el-form-item>
			</el-form>
			<el-row class="row btn-wrap">
				<el-button type="primary" class="button" :loading="loadingflag" @click="submit">{{this.loadingflag ? '正在登陆...': '登录'}}</el-button>
			</el-row>
		</div>
		
	</div>
</template>
<script>
export default {
    data() {
		return {
			loginForm: {
				username: '',
				pwd: '',
			},
			rules: {
				username: [
					{ required: true, message: '请输入用户名', trigger: 'blur'}
				],
				pwd: [
					{ required: true, message: '请输入密码', trigger: 'blur'}
				]
			},
			loadingflag: false
		}
	},
	methods: {
		submit () {
			this.$refs.loginForm.validate((valid)=>{
				if (valid) {
					this.loadingflag = true;

					this.$Http('login.php', 'POST', this.loginForm)
					.then((res)=>{
						if (res.code === 1) {
							sessionStorage.setItem('nihao', res.data);
							this.$message({
								message: '登录成功',
								type: 'success'
							});
							setTimeout(()=>{
								this.$router.push('/main/projectlist');
							}, 1500)
							
						} else {
							this.$message.error(res.message || '用户名或密码错误');
							this.loadingflag = false;
						}
					})
					.catch((err)=> {
						this.$message.error('登录失败');
					})
				} else {
					return false;
				}
			})
		}
	}
}
</script>
<style  lang='scss' scoped>
	.container {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background: #123456;
		
		h2 {
			margin-top: 10%;
			margin-bottom: 70px;
			color: #fff;
			text-align: center;
			font-size: 32px;
			
		}
		.content {
			box-sizing: border-box;
			width: 500px;
			padding: 60px 80px 50px;
			background: #fff;
			margin: 0 auto;
			border-radius: 8px;
			.button {
				width: 100%;
				font-size: 20px;
			}
		}
		.btn-wrap {
			margin-top: 50px;
		}
	}
	.el-form-item {
		margin-bottom: 26px;
		label {
			color: #000;
		}
	}
	.el-form-item__label {
		color: red;
		&:before {
			display: none;
		}
	}

</style>


