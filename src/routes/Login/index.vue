<template>
	<section class = "login-container">
		<div class = "login-header">
			<h1> Fan hehe </h1>
			<i class = "logo"></i>
		</div>
		<div class = "login-select">
			<div class = "login-select-container">
				<a v-for="item of navList"
					:class = "{active: curNav === item.name}"
					@click = "handleClickNav(item.name)"
				>{{ item.text }}</a>
			</div>
		</div>
		<div class = "login-form">
			<div v-for="item in inputList[curNav]" class = "login-form-item">
				<input v-if="item.type === 'password'"
					type="password"
					:data-name="item.name"
					:maxLength="item.maxLength"
					:placeholder="item.placeholder"
					v-model="item.value"
					@focus="handleInputFocus($event)"
					@keydown.13="handleClickSubmit"
					@keydown.9="handleTabChange($event)"
					>
				<input v-else
					type="text"
					:data-name="item.name"
					:maxLength="item.maxLength"
					:placeholder="item.placeholder"
					v-model="item.value"
					@focus="handleInputFocus($event)"
					@keydown.13="handleClickSubmit"
					@keydown.9="handleTabChange($event)"
					>
				<label :class = "item.status"> {{item.message[item.status]}} </label>
			</div>
			<button 
				class = "login-submit"
				:class = "{ isLoading: state.isLoading }"
				@click = "handleClickSubmit">{{ state.isLoading? '提交中': '提交' }}</button>
		</div>
		<div class = "login-control">
			<div class= "login-register" v-if="curNav === 'REGISTER'">
			</div>
			<div class = "login-login"v-else >
				<span>第三方登陆</span>
				<span>忘记密码</span>
			</div>
		</div>
		<div class = "login-footer">It's fanhehe · <a href="http://fanhehe.com" target="_black">fanhehe.com</a></div>
	</section>
</template>

<script>
	import { Inspect } from '../../utils/form';
	import { user as types } from '../../common/constants/request';
	export default {
		data () {
			return {
				curNav: 'REGISTER',
				navList: [{
					name: 'REGISTER',
					text: '注册'
				}, {
					name: 'LOGIN',
					text: '登陆'
				}],
				inputList: {
					REGISTER: [{
						type: 'text',
						name: 'username',
						placeholder: '用户名',
						status: '',
						message: {
							empty: '必填',
							success: '√',
							error: '用户名格式错误',
						},
						value: '',
						maxLength: 30,
					}, {
						type: 'text',
						name: 'nickname',
						placeholder: '昵称',
						status: '',
						message: {
							empty: '必填',
							success: '√',
							error: '昵称格式错误',
						},
						value: '',
						maxLength: 10,
					}, {
						type: 'password',
						name: 'password',
						placeholder: '密码',
						status: '',
						value: '',
						message: {
							empty: '必填',
							success: '√',
							error: '密码应在6-16位间',
						},
						maxLength: 16,
					}],
					LOGIN: [{
						type: 'text',
						name: 'username',
						maxLength: 30,
						status: '',
						value: '',
						message: {
							empty: '必填',
							success: '√',
							error: '',
						},
						placeholder: '账号',
					}, {
						type: 'password',
						name: 'password',
						placeholder: '密码',
						status: '',
						message: {
							empty: '必填',
							success: '√',
							error: '账号或密码错误',
						},
						value: '',
						maxLength: 16,
					}],
				},
				state: {
					isLoading: false,
				},
			};
		},
		methods: {
			handleClickNav (nav) {
				this.curNav = nav;
			},
			handleInputFocus (event) {
				const { curNav, inputList } = this;
				const { name } = event.target.dataset;
				const list = inputList[curNav].map(item => {
					if (item.name === name && item.status) {
						item.status = '';
					}
					return item;
				});
				this.inputList[curNav] = list;
			},
			handleTabChange ({ target }) {
				const value = target.value;
				const { name } = target.dataset;
				const data = { [name]: value };
				const result = Inspect.inspect(data);

				const { curNav, inputList } = this;
				this.inputList[curNav] = inputList[curNav].map(item => {
					if (item.name === name) {
						item.status = result[0].status;
					}
					return item;
				});
			},
			handleClickSubmit () {
				if (this.state.isLoading) return true;
				// 禁止连点
				this.state.isLoading = true;
				const { curNav, inputList } = this;
				// 获取表单数据
				const data = inputList[curNav].reduce((prev, next) => {
					prev[next.name] = next.value;
					return prev;
				}, {});

				const result = Inspect.inspect(data);
				const success = () => { this.$router.back(); };
				const final = () => { this.state.isLoading = false; };

				if (result.every(item => item.status === 'success')) {
					const type = types[`${curNav}_WITH_USERNAME`].name;
					this.$store.dispatch({ type, data, success, final });
				} else {
					// 重置input样式及信息
					this.state.isLoading = false;
					this.inputList[curNav] = inputList[curNav].map((item) => {
						const name = item.name;
						const state = result.filter(item => item.name === name);
						if (state.length) {
							item.status = state[0].status;
						}
						return item;
					});
				}
			},
		},
		components: {
		},
		mounted () {
			let { navList } = this;
			let { tab: current } = this.$router.currentRoute.query;
			navList = navList.map(item => item.name);

			current = current || '';
			current = current.toUpperCase();
			if (current && navList.some(item => item === current)) {
				this.curNav = current;
			}
		},
	};

</script>
<style lang = "sass" scoped>
	.login-container {
		max-width: 300px;
		margin: auto;
		padding: 50px 0 0;
		font-size: 18px;
		font-weight: 400;
		min-height: 100%;
		box-sizing: border-box;

		&:after {
			content: '.';
			font-size: 0;
			position: absolute;
			top:0;
			left:0;
			right:0;
			bottom:0;
			background: linear-gradient(right, #b8c4cb,#f6f6f8);
			z-index: -1;
		}
		.login-header {
			text-align: center;
		}
		.login-select {
			display: flex;
			justify-content: center;
			color: #eee;
		}
		.login-form {
			width: 100%;
		}
		.login-footer {
			text-align: center;
			color: #bbbbbb;
			font-size: 12px;
		}
	}
	.login-header {
		h1 {
			color: #0F88EB;
			font-size: 40px;
			clip-path: polygon(0 0, 10% 0, 70% 70%, 20% 0, 100% 0, 100% 100%, 0 100%);
		}
		.logo {
			display: block;
			height: 64px;
			width: 64px;
			margin: 10px auto;
			background: url('../../assets/fanhehe.png') no-repeat;
			background-size: cover;
			border-radius: 4px;
		}
	}
	.login-select-container {
		position: relative;

		.active {
			color: #0F88EB;
			border-bottom: 2px solid #0F88EB;
		}
		a {
			box-sizing: border-box;
			margin: 0px 10px;
			color: #999999;
			font-size: 20px;
			text-align: center;
			font-weight: 800;
		}
		a:hover {
			color: #55ABED;
		}
	}
	.login-form {
		.login-submit {
			width: 100%;
			height: 40px;
			border: none;
			outline: none;
			color: #ffffff;
			font-size: 110%;
			background: #0F88EB;
			border-radius: 2px;

			margin: 15px 0;
			padding: 5px 10px;
			box-sizing: border-box;
			
			cursor: pointer;

			&:hover {
				background: #66A9E2;
			}
			&:active {
				background: #66A9E2;
			};
		}
		.isLoading {
			background: #999999;
		}
	}
	.login-form-item {
		position: relative;
		margin: 15px 0;
		&:before{
			content: '.';
			font-size: 0;
			width: 100%;
			position: absolute;
			bottom: 0;
			height: 2px;
			background: #bbbbbb;
		};
		&:after{
			content: '.';
			font-size: 0;
			width: 0;
			position: absolute;
			bottom: 0;
			height: 2px;
			background: #0F88EB;
			transition: width .2s ease-in-out;
		}

		&:hover:after, &:focus:after{
			width: 100%;
			z-index: 1;
			outline: none;
		}

		& >input {
			width: 100%;
			outline: none;
			display: block;
			margin: 0 auto;
			padding: 10px 14px;
			border: none;
			box-sizing: border-box;
			background: transparent;
		}
		& >label {
			z-index: 1;
			bottom: 0;
			right: 0;
			color: #bbbbbb;
			position: absolute;
			align-items: center;
			font-size: 12px;
			height: 100%;
			display: none;
		}
		.normal {
			display: flex;
			color: #bbbbbb;
		}
		.success {
			display: flex;
			color: green;
		}   
		.error {
			display: flex;
			color: red;
		}
		.empty {
			display: flex;
			color: red;
		}
	}
	.login-control {
		margin: 10px 0;
		&> div {
			font-size: 14px;
			color: #aaaaaa;
			display: flex;
			justify-content: space-between;
			padding: 0 20px;
		}
		.login-login {
			&>span:hover {
				color: #55ABED;
				cursor: pointer;
			}
		}
		.login-register {}
	}
</style>
