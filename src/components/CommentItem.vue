<!--
	* 纯评论项组件
	**** Props
	* 
	* comment [Object] 评论的信息
	* floor [Number] 当前评论为第几楼
	* subComments [Object] 子评论的信息
	* 
	* 
	* handleClickReply [Function] 点击回复按钮的处理函数
	* handleClickSubmit [Function] 点击提交评论
	* handleClickCancel [Function] 点击取消评论
	* handleClickPraise [Funtion] 暂时没实现
	* 
-->
<template>
	<div class = "comment-item-container" v-if = "comment.id">
		<div class = "up-information">
			<router-link class = "up-preview" :to = "{ path: '/u/11' }">
				<img :src=" comment.up.preview || null" alt="头像" />
			</router-link>
			<div class = "comment-item-details">
				<router-link class = "details-name" :to = "{ path: '#' }" >
					{{ comment.up.username }}
				</router-link>
				<div class = "details-line">
					<span>  {{ floor + '楼' }} </span>
					<span> {{ comment.createTime | DateFormater }} </span>
				</div>
			</div>
		</div>
		<div class = "comment-item-content" v-html = "comment.content"></div>
		<div class = "comment-tool">
			<span>赞</span>
			<span @click = "clickReply(comment.id, comment.up.username)">回复</span>
		</div>
		<div class = "sub-wrap">
			<!-- 引用自身莫名失败<CommentItem v-for = "item in subComments" :comment="item" /> -->
			<div class = "sub-container" v-for = " (sub, index) in subComments.rows" :key = "index">
				<router-link class = "sub-up-preview" :to = "{ path: `/u/${sub.username}` }">
					<img :src = " sub.up.preview || null" alt = "头像" />
				</router-link>
				<div class = "sub-item-details">
					<router-link class = "sub-details-name from" :to="{ path: '#' }">{{ sub.up.username }}</router-link>
					: 
					<router-link v-if = "sub.replyTo" class = "sub-details-name to" :to="{ path: '#' }"> @{{ sub.replyTo }}</router-link>
					{{ sub.content }}
					<div class = "sub-details-line">
						{{ sub.createTime | DateFormater }}
						<span @click = "clickReply(sub.parentId, sub.up.username)">回复</span>
					</div>
				</div>
			</div>
			<div class = "sub-tool">
				<span class = "sub-create" @click = "clickReply(comment.id, null)" >添加新评论</span>
				<span v-if = "restChildComments > 0">
					还有 {{ restChildComments }}条评论
					<span class = "sub-spread">展开查看</span>
				</span>
			</div>
			<Comment 
				:show = "state.showComment"
				:handleClickSubmit = "clickSubmit"
				:handleClickCancel = "clickCancel"
				/>
		</div>
	</div>
</template>
<script>
	import Comment from './Comment';
	import DateFormater from '../utils/DateFormater';

	export default {
		data () {
			return {
				state: {
					showComment: false,
				},
			};
		},
		props: ['comment', 'subComments', 'handleClickReply', 'handleClickSubmit', 'handleClickCancel', 'floor'],
		filters: { DateFormater },
		components: { Comment },
		computed: {
			restChildComments () {
				const childComments = this.comment.subComments;
				if (!(childComments && childComments.rows && childComments.rows.length)) return 0;
				return childComments.count - childComments.limit;
			},
		},
		methods: {
			clickReply (parentId, replyTo) {
				// 执行点击评论组件的【回复按钮】默认函数
				this.state.showComment = true;
				if (this.handleClickReply) return this.handleClickReply({ parentId, replyTo });
			},
			clickSubmit (value) {
				// 执行点击评论组件的【提交按钮】默认函数
				this.state.showComment = false;
				if (this.handleClickSubmit) return this.handleClickSubmit(value);
			},
			clickCancel () {
				// 执行点击评论组件的【取消按钮】默认函数
				this.state.showComment = false;
				if (this.handleClickCancel) return this.handleClickCancel();
			},
		},
	};
</script>

<style lang = "sass">
	.comment-item-container {
		border-bottom: 1px solid  #dcdcdc;
		padding: 20px 0 30px;
	}
	.up-information {
		color: #969696;
		font-size: 12px;
		padding: 7.5px 0;
		box-sizing: border-box;

		.up-preview {
			width: 38px;
			height: 38px;
			vertical-align: middle;
			
			display: inline-block;

			& > img {
				width: 100%;
				max-width: 100%;
				border-radius: 50%;
			}
		}

		.comment-item-details {
			padding-left: 10px;
			display: inline-block;
			vertical-align: middle;

			.details-name { color: #3e3e3e; font-size: 14px; font-weight: 700; }
			.details-line { padding-top: 5px; }
		}
	}
	.comment-item-content {
		color: #000000;
		margin: 5px 0;
		font-size: 16px;
		line-height: 1.5;
		word-break: break-all;
	}
	.comment-tool {
		color: #969696;
		font-size: 14px;

		& > span {
			cursor: pointer;
			padding: 2px 5px;
			display: inline-block;
			&:hover { color: #000000; }
			&:active { color: #ea6f5a; }
		}
		& > span:hover { color: #454545; }
		& > span:active { color: #00a1d6; }
	}
	.sub-wrap {
		width: 100%;
		margin-top: 20px;
		padding: 5px 0 5px 20px;
		box-sizing: border-box;
		border-left: 2px solid #d9d9d9;
	}
	.sub-container {
		width: 100%;
		font-size: 14px;
		margin-bottom: 15px;
		padding-bottom: 15px;
		position: relative;
		box-sizing: border-box;
		border-bottom: 1px dashed #dcdcdc;

		.sub-up-preview {
			width: 24px;
			height: 24px;
			margin-top: 5px;
			position: absolute;
			vertical-align: top;
			display: inline-block;

			& > img {
				width: 100%;
				height: auto;
				max-width: 100%;
				border-radius: 50%;
			}
		}
		.sub-item-details {
			display: inline-block;
			box-sizing: border-box;
			padding-left: 34px;
			/*width: calc(100% - 34px);*/


			.sub-details-name {
				color: #3e3e3e;
				font-size: 14px;
				font-weight: 700;
				cursor: pointer;
			}
			.to {
				color: #00a1d6;
			}

			.sub-content {
				display: inline-block;
				white-space: initial;
				word-wrap: break-word;
				& > div { display: inline-block; }
			}

			.sub-details-line {
				color: #969696;
				font-size: 12px;
				padding: 4px 0 0 0;

				& > span {
					padding: 0 3px;
					display: inline-block;
					cursor: pointer;

					&:hover { color: #000000; }
					&:active { color: #ea6f5a; }
				}
			}
		}
	}
	.sub-tool {
		color: #969696;
		cursor: default;
		font-size: 14px;
		margin-bottom: 15px;
		padding-bottom: 15px;
		
		& > span { padding-right: 5px; }
		
		.sub-create {
			cursor: pointer;
			&:hover { color: #454545; }
			&:active { color: #00a1d6; }
		}
		.sub-spread {
			color: #00a1d6;
			cursor: pointer;
			&:hover {}
			&:active {}
		}
	}
</style>