<template>
	<div class = "basis-container">
		<div class = "basis-preview">
			<div >
				<img src = "https://baidu.com/favicon.ico" alt = "头像" />
			</div>
			<div @click = "clickChangePreview">
				更换头像
				<input type = "file" unselectable = "on" class = "hide" ref = "preview" />
			</div>
		</div>
		<div class = "basis-username row">
			<span>用户名</span>
			<span>{{'fanhehe'}}</span>
		</div>
		<div class = "basis-nickname row">
			<span >昵称</span>
			<input type = "text" placeholder = "请输入昵称" />
		</div>
		<div class = "basis-email row">
			<span>邮箱</span>
			<input type = "text" placeholder = "邮箱" />
		</div>
		<div class = "basis-phone row">
			<span>手机</span>
			<input type = "text" placeholder = "请输入手机" />
		</div>
		<div class = "basis-control">
			<div class = "basis-submit">保存</div>
			<div class = "basis-cancel">取消</div>
		</div>
	</div>
</template>
<script>
	export default {
		data () {
			return {};
		},
		methods: {
			clickChangePreview (event) {
				const { preview } = this.$refs;
				preview.click();
			},
		},
	};
</script>
<style lang = "sass">
	.basis-container {
		max-width: 100%;
		max-width: 500px;
		padding: 0 40px;
		font-size: 15px;
		input {
			outline: none;
			padding: 5px 10px;
			font-size: 15px;
			border: 1px solid #c8c8c8;
			border-radius: 4px;
			background-color: hsla(0,0%,71%,.1);
		}

		& > div:not(:first-child):not(:last-child) {
			border-bottom: 1px solid #d0caca;
		}
		.row {
			padding: 10px 0;
			white-space: nowrap;
			& > span:first-child {
				width: 100px;
				color: #969696;
				display: inline-block;
				box-sizing: border-box;
				padding: 10px 10px 10px 0 ;
			}
		}
	}
	.basis-preview {
		display: flex;
		align-items: center;
		padding: 0 0 10px 0;
		margin-bottom: 10px;
		& > div:first-child {
			width: 48px;
			height: 48px;
			margin-right: 52px;
			border: 1px solid #dddddd;
			border-radius: 50%; overflow: hidden;
			& > img {
				height: 100%;
				max-width: 100%;
			}
		}
		& > div:last-child {
			color: #42c02e;
			cursor: pointer;
			padding: 5px 15px;
			border-radius: 20px;
			border: 1px solid #42c02e;
			
			&:hover { border: 1px solid #299817; color: #299817; }
			&:active { background: #299817; color: #ffffff; }
		}
		.hide { display: none; }
	}
	.basis-username {}
	.basis-nickname {}
	.basis-email {}
	.basis-phone {}
	.basis-control {
		display: flex;
		margin: 20px 0 0 0;
		justify-content: flex-end;
		& > div { background: #299817; padding: 5px 10px; border-radius: 5px; color: #ffffff; }
		& > div:not(:last-child) { margin-right: 5px; }
	}
	@media all and (max-width: 512px) {
		
	}
</style>