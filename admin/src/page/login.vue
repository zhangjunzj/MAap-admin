<template>
	<div class="container">
		<h2>网站后台管理系统</h2>
		<div class="content">
			<el-row class="row">
  				<el-col :span="6"><div class="grid-content label">用户名：</div></el-col>
  				<el-col :span="18">
					  <div class="grid-content">
							<el-input
								placeholder="请输入用户名"
								v-model="username"
								clearable>
							</el-input>
						</div>
				</el-col>
			</el-row>
			<el-row class="row">
  				<el-col :span="6"><div class="grid-content label">密&nbsp;&nbsp;&nbsp;&nbsp;码：</div></el-col>
  				<el-col :span="18">
					  <div class="grid-content">
							<el-input
								placeholder="请输入密码"
								v-model="password"
								clearable>
							</el-input>
						</div>
				</el-col>
			</el-row>
			<el-row class="row btn-wrap">
				<el-button type="primary" class="button" @click="submit">登 录</el-button>
			</el-row>
		</div>
		
	</div>
</template>
<script>
export default {
    data() {
		return {
			username: '',
			password: ''
		}
	},
	methods: {
		submit () {
			this.$router.push('/main');
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
			margin-bottom: 20px;
			color: #fff;
			text-align: center;
			font-size: 22px;
			
		}
		.content {
			box-sizing: border-box;
			width: 500px;
			padding: 60px 80px 50px;
			background: #fff;
			margin: 0 auto;
			.label {
				height: 40px;
				line-height: 40px;
			}
			.row {
				margin-bottom: 10px;
			}
			.button {
				width: 100%;
				font-size: 16px;
			}
		}
		.btn-wrap {
			margin-top: 30px;
		}
	}

</style>


