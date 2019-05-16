<template>
	<div class = "login-wrap">
		<div class = "login-container">
			<div class = "login-side">
				<div class = "side-title">Welcome</div>
				<div class = "side-description">
					<p></p>
				</div>
			</div>
			<div class = "login-main">
				<div class = "login-title">
					<span :class = "{ active: state.curNav == 0 }"
						@click = "handleClickNav(0, $event)">登陆</span> /
					<span :class = "{ active: state.curNav == 1 }"
						@click = "handleClickNav(1, $event)">注册</span>
				</div>
				<div class = "login-form">
					<label class = "fa fa-user fa-fw" for="f-email"></label>
					<input id = "f-email" type="text" /></div>
				<div class = "login-form">
					<label class = "fa fa-lock fa-fw" for="f-password"></label>
					<input id = "f-password" type="text" />
				</div>
				<div class = "login-submit">提交</div>
				<div class = "login-tips">
					<span>忘记密码</span>
				</div>
				<div class = "login-more"></div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				email: '',
				password: '',
				state: {
					curNav: 0,
				},
			};
		},
		methods: {
			handleClickNav (nav, event) {
				this.state = { ...this.state, curNav: nav };
			}
		},
	};
</script>
<style lang = "sass">
	.login-wrap {
		z-index: 3;
		position: fixed;
		box-sizing: border-box;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(0, 0, 0, 0.5);
	}
	.login-container {
		display: flex;
		padding: 25px;
		position: relative;
		flex-direction: row;
		border-radius: 4px;
		overflow: hidden;
		/*box-shadow: 0px 0px 1px 1px #000000;*/

		&:before {
			content: '.';
			font-size: 0;
			z-index: -1;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			position: absolute;
			background: #ffffff;
			filter: blur(15px);
		}

		&:after {
			content: '.';
			font-size: 0;
			position: absolute;
			bottom: -1px;
			display: inline-block;
			width: 80%;
			/*border: 1px solid #000000;*/
		}
	}
	.login-side {
		flex: 1 1 auto;
		padding-right: 10px;
		margin-right: 10px;
		box-shadow: 1px 0px 0px 0px #666666;

		.side-title {
			color: #666;
			font-size: 18px;
			font-weight: 900;
		}
		.side-description {}
	}
	.login-main {
		flex: 1 1 auto;
	}
	.login-title {
		color: #ff0000;

		& > span {
			color: #666;
			font-size: 16px;
			font-weight: 900;
			cursor: pointer;

			&:hover {
				color: lighten(#499EF3, 10%);
			}
		}

		.active {
			color: #499EF3;
		}
	}
	.login-form {
		box-sizing: border-box;
		margin: 10px 0;
		label {

		}
		input {
			border: none;
			border-bottom: 1px solid #000000;
			outline: none;
			background: inherit;
			position: relative;
		}
	}
	.login-submit {
		color: green;
		font-size: 14px;
		cursor: pointer;
		text-align: right;
	}
	.login-tips {
		text-align: right;
		font-size: 12px;
		cursor: pointer;
		&:hover { color: lighten(#499EF3, 10%); text-decoration: underline;}
	}
	.login-more {
		font-size: 12px;
	}
	@media all and (min-width: 769px) {
		.login-container {
			width: 384px;
		}
	}
	@media all and (max-width: 768px) {
		.login-container {
			width: 70%;
		}
	}
</style>