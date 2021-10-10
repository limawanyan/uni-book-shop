<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎注册图书商城</view>
			<input class="u-border-bottom" v-model="name"  placeholder="昵称" />
			<input class="u-border-bottom" v-model="email" placeholder="请输入邮箱" />
			<input class="u-border-bottom" type="password" v-model="password" placeholder="请输入密码" />
			<input class="u-border-bottom" type="password" v-model="password_confirmation" placeholder="请输入确认密码" />
			<button @click="submit" :style="[inputStyle]" class="getCaptcha">注册</button>
			<view class="alternative">
				<view class="password">已有账号？前往登录</view>
		<!-- 		<view class="issue">登录</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:'',
				email: '',
				password: '',
				password_confirmation:''
			}
		},
		computed: {
			inputStyle() {
				let style = {};
				if (this.$u.test.email(this.email) && this.password && this.name && this.password_confirmation) {
					style.color = "#fff";
					style.backgroundColor = this.$u.color['warning'];
				}
				return style;
			}
		},
		methods: {
			async submit() {
				if (!this.$u.test.email(this.email) && !this.password && !this.name) return
				if (!this.$u.test.rangeLength(this.password,[6,15])) {
					uni.$u.toast('密码6-15字符')
					return
				}
				if (this.password !== this.password_confirmation) {
					uni.$u.toast('两次密码输入不一致')
					return
				}
				// 处理登录使用参数
				const params = {
					name:this.name,
					email:this.email,
					password:this.password,
					password_confirmation:this.password_confirmation
				}
				const loginRes = await this.$u.api.authRegister(params)
				this.$u.toast('注册成功')
				// 注册之后，重定向到登录
				setTimeout(() => {
					this.$u.route({
						type:'redirect',
						url:'/pages/auth/login'
					})
				},1500)
			}
		}
	};
</script>

<style lang="scss" scoped>
	.u-border-bottom {
		margin-bottom: 40rpx !important;
	}

	.wrap {
		font-size: 28rpx;

		.content {
			width: 600rpx;
			margin: 80rpx auto 0;

			.title {
				text-align: left;
				font-size: 60rpx;
				font-weight: 500;
				margin-bottom: 100rpx;
			}

			input {
				text-align: left;
				margin-bottom: 10rpx;
				padding-bottom: 6rpx;
			}

			.tips {
				color: $u-type-info;
				margin-bottom: 60rpx;
				margin-top: 8rpx;
			}

			.getCaptcha {
				background-color: rgb(253, 243, 208);
				color: $u-tips-color;
				border: none;
				font-size: 30rpx;
				padding: 12rpx 0;

				&::after {
					border: none;
				}
			}

			.alternative {
				color: $u-tips-color;
				display: flex;
				justify-content: space-between;
				margin-top: 30rpx;
			}
		}

		.buttom {
			.loginType {
				display: flex;
				padding: 350rpx 150rpx 150rpx 150rpx;
				justify-content: space-between;

				.item {
					display: flex;
					flex-direction: column;
					align-items: center;
					color: $u-content-color;
					font-size: 28rpx;
				}
			}

			.hint {
				padding: 20rpx 40rpx;
				font-size: 20rpx;
				color: $u-tips-color;

				.link {
					color: $u-type-warning;
				}
			}
		}
	}
</style>