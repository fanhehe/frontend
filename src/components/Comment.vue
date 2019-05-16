<!--
	* 纯评论框组件
	**** Props
	* show [true | false] 是否显示评论框
	* handleClickSubmit [Function] 点击发送按钮的执行函数
	* handleClickCancel [Function] 点击取消按钮的执行函数
-->
<template>
	<div class = "comment-container" v-if="show">
		<textarea name="" id="" cols="30" rows="5" placeholder= "写下你的评论..." v-model = "text" v-ref = "comment"/>
		<div class = "comment-tools">
			<span class = "comment-express">○</span>
			<div>
				<span class = "comment-cancel" @click = "clickCancel">取消</span>
				<span class = "comment-submit" @click = "clickSubmit">发送</span>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data () {
			return { text: '' };
		},
		methods: {
			clickCancel () {
				this.text = "";
				if (this.handleClickCancel) return this.handleClickCancel();
			},
			clickSubmit () {
				const content = this.text.trim();
				if (!content.length) return null;
				this.text = '';
				if (this.handleClickSubmit) return this.handleClickSubmit({ content });
			}
		},
		props: ['show', 'handleClickCancel', 'handleClickSubmit'],
	};
</script>
<style lang = "sass">
	.comment-container {

		color: #969696;
		box-sizing: border-box;
		
		textarea {
			width: 100%;
			max-height: 80px;
			resize: none;
			outline: none;
			display: block;
			font-size: 13px;
			padding: 10px 15px;
			vertical-align: top;
			
			border: 1px solid #dcdcdc;
			border-radius: 4px;
			background-color: hsla(0,0%,71%,.1);
		}
		.comment-tools {
			display: flex;
			padding: 10px 3px;
			justify-content: space-between;
			& > span { padding: 0 8px; }

			.comment-cancel {
				font-size: 16px;
				font-weight: 500;
				white-space: nowrap;
				display: inline-block;
				padding: 0 5px;
				cursor: pointer;
			}
			.comment-submit {
				color: #ffffff;
				font-size: 16px;
				font-weight: 500;
				padding: 5px 10px;
				background: #42c02e;
				display: inline-block;
				border-radius: 4px;
				white-space: nowrap;
				cursor: pointer;
			}

			.comment-cancel:hover{ color: #000000; }
			.comment-submit:hover{ background: #3db922; }
			.comment-cancel:active{ color: #ea6f5a; }
			.comment-submit:active{ background: #34a91b; }
		}

	}

</style>