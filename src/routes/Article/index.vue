<template>
	<div class = "article-wrap">
		<Navigator />
		<div class = "article-container">
			<div class = "article-main">
				<h1 class = "article-title"> {{ article.title }} </h1>
				<!--文章详细信息-->
				<div class = "article-information">
					<router-link class = "information-preview" :to = "{ path: '/u/11' }">
						<img :src = " article.up.preview || defaults.preview" alt = "头像" />
					</router-link>
					<div class = "information-details">
						<router-link class = "information-author" :to="{path: '#'}"> 
							{{ article.up.nickname || article.up.username }}
						</router-link>
						<div class = "information-line">
							<span> {{ article.createTime | DateFormater }} </span>
							<span> 字数 {{ article.characters }} </span>
							<span> 阅读 {{ article.visitCounts }} </span>
							<span> 评论 {{ article.replyCounts }} </span>
							<span> 喜欢 {{ article.likes }} </span>
						</div>
					</div>
				</div>
				<!--文章内容-->
				<div class = "article-content" v-html = "article.content"></div>
				<!--控制按钮-->
				<div class = "article-controls">
					<div class = "article-button-like" :class = "{ like: state.isLiking }"  @click = "clickLike">
						<span>喜欢</span>
						<span> {{ article.likes }} </span>
					</div>
					<div class = "article-button-shares">
						<span></span>
					</div>
				</div>
				<!--评论区-->
				<div class = "comment-wrap">
					<div class = "comment-let">
						<img :src = " userInfo.preview || defaults.preview" alt="我的头像" />
						<Comment :show = "true"
							:handleClickSubmit = "createComment" />
					</div>
					<div class = "comment-filter">
						<div> {{ comments.count }}条评论 </div>
						<div>
							<span>按时间正序</span>
							<span>按时间倒序</span>
						</div>
					</div>
					<div class = "article-comments">
						<CommentItem
							v-for = "(comment, index) in comments.rows"
							:key = "index"
							:floor = "index + 1"
							:comment = "comment"
							:subComments = "comment.subComments || { rows: [] }"
							:handleClickReply  = "clickReply"
							:handleClickSubmit = "replyToComment"
							:handleClickCancel = "clickCancel"
							/>
					</div>
					<div class = "comment-page">
						<Page
							:maxPage = "comments.pageCount"
							:pageLimit = "7"
							:curPage = "state.curPage"
							:handleClickPageItem = "clickPageItem"/>
					</div>
				</div>
			</div>
			<div class = "article-side">
			</div>	
		</div>
		<div class = "article-sidebar">
			<a class="sidebar-backtotop" href="#">top</a>
			<span class="sidebar-share">tool</span>
		</div>
		<Copyright />
		<Message />
	</div>
</template>
<script>
	import { mapState } from 'vuex';

	import Page from '../../components/Page';
	import Comment from '../../components/Comment';
	import Navigator from '../../components/Navigator';
	import Copyright from '../../components/Copyright';
	import Message from '../../components/window/Message';
	import CommentItem from '../../components/CommentItem';

	import DateFormater from '../../utils/DateFormater';
	import { article as types } from '../../common/constants/request';

	export default {
		data () {
			return {
				state: {
					isLiking: false,
					isLoading: false,
					curPage: 1,
				},
				reply: {
					replyTo: null,
					parentId: null,
				},
				defaults: {
					preview: require('../../assets/preview-default.png'),
				}
			};
		},
		components: {
			Page,
			Navigator,
			Copyright,
			Comment,
			CommentItem,
			Message,
		},
		computed: {
			...mapState(['userInfo', 'article']),
			hasLogined () {
				const { username } = this.userInfo;
				if (!(typeof username === 'string' && username.trim().length)) return false;
				return true;
			},
			comments () {
				const { comments } = this.article;
				const initComments = { rows: [], count: 0, pageCount: 0 };
				if (comments instanceof Object && comments.rows instanceof Array) return comments;
				return initComments;
			},
		},
		mounted () {
			this.resetComments();
			const { dispatch } = this.$store;
			const { articleId } = this.$route.params;
			dispatch(types.GET_ARTICLE_BY_ID.name, { query: { articleId }});
			dispatch(types.GET_COMMENTS.name, { query: { articleId, pageId: 1 }});
		},
		filters: { DateFormater },
		methods: {

			clickLike () {
				// 预处理
				if (this.state.isLoading) return;
				if (!this.userInfo.id) return this.$store.dispatch('warn', '请先登录');
				this.state.isLoading = true;
				// main
				const { likes } = this.article;
				const { isLiking } = this.state;
				this.article.likes = isLiking ? likes - 1 : likes + 1;
				this.state.isLiking = !this.state.isLiking;
				// 后处理
				this.state.isLoading = false;
			},
			createComment (value) {
				// 预处理
				if (this.state.isLoading) return;
				if (!this.userInfo.id) return this.$store.dispatch('warn', '请先登录');
				this.state.isLoading = true;
				// main
				const { content } = value;
				const { dispatch } = this.$store;
				const { articleId } = this.$route.params;
				const { username, nickname, preview } = this.userInfo;
				// 发送的数据
				const data = { username, articleId, content };
				const mutations = { username, nickname, preview };
				// 函数
				const final = () => { this.state.isLoading = false; };
				const success = () => { console.log('评论成功'); this.resetReply(); };
				// 发送
				dispatch(types.CREATE_COMMENT.name, { success, final, data, mutations });
			},
			replyToComment (value) {
				// 预处理
				if (this.state.isLoading) return;
				if (!this.userInfo.id) return this.$store.dispatch('warn', '请先登录');
				this.state.isLoading = true;
				// 获取数据
				const { content } = value;
				const { dispatch } = this.$store;
				const { parentId, replyTo } = this.reply;
				const { articleId } = this.$route.params;
				const { username, nickname, preview } = this.userInfo;
				// 发送的数据
				const mutations = { username, nickname, preview };
				const data = { username, articleId, content, parentId, replyTo };
				// 函数
				const final = () => { this.state.isLoading = false; };
				const success = () => { console.log('回复成功'); this.resetReply(); };
				// 发送
				dispatch(types.CREATE_COMMENT.name, { success, final, data, mutations });
			},
			clickReply (reply) { this.reply = reply; },
			clickCancel () {},
			clickPageItem (pageId) {
				const { dispatch } = this.$store;
				const { articleId } = this.$route.params;
				const success = () => { this.state.curPage = pageId; };
				dispatch(types.GET_COMMENTS.name, { success, query: { articleId, pageId }});
			},
			resetReply () {
				this.reply.replyTo = null;
				this.reply.parentId = null;
			},
			resetComments () {
				this.article.comments = {};
			},
		},
	};
</script>
<style lang = "sass">
	.article-wrap {}
	.article-container {
		
		margin: 0 auto;
		position: relative;
		padding: 50px 0 60px 0;
		box-sizing: border-box;
		font-family: -apple-system, SF UI Display, Arial, PingFang SC, Hiragino Sans GB, Microsoft YaHei, sans-serif;
	}
	.article-main {
		margin: 0 auto;
		padding: 0 30px;
		box-sizing: border-box;
		box-shadow: 1px 0px 0px 0px #d3d3d3, -1px 0px 0px 0px #d3d3d3;
		.article-title { font-size: 34px; font-weight: 700; padding: 20px 0 10px; line-height: 1.3; }
	}

	.article-information {

		margin: 10px 0;
		overflow: hidden;
		white-space: nowrap;

		.information-preview {
			width: 48px;
			height: 48px;
			display: inline-block;
			vertical-align: middle;

			img {
				width: 100%;
			    height: 100%;
			    border-radius: 50%;
			    border: 1px solid #ddd;
			}
		}
		.information-details {
			display: inline-block;
			vertical-align: middle;
			padding-left: 10px;

			.information-author {
				display: flex;
				align-items: center;
				font-size: 18px;
				padding: 2px 0;

				&:before {
					color: #ea6f5a;
					content: "作者";
					font-size: 12px;
					font-weight: 900;
					padding: 2px 5px;
					border-radius: 4px;
					margin-right: 10px;
					display: inline-block;
					box-shadow: 0px 0px 0px 1px #ea6f5a;
				}
			}

			.information-line { color: #969696; font-size: 12px; margin-top: 5px;}
			.information-line > span { display: inline-block; padding: 0 3px; }
		}
	}
	.article-content {
		font-size: 16px;
		font-weight: 400;
		line-height: 30px;
		margin: 40px 0;

		& > img { cursor: zoom-in; max-width: 100%; height: auto;}
	}
	.article-controls {
		display: flex;
		padding: 30px 0;
		margin: 20px 0;
		justify-content: space-between;
		border-top: 1px solid  #dcdcdc;
		border-bottom: 1px solid  #dcdcdc;
		
		.article-button-like {
			color: #ea6f5a;
			font-size: 0px;
			cursor: pointer;
			border-radius: 50px;
			display: inline-block;
			border: 1px solid #ea6f5a;
			padding: 10px 20px 10px 20px;

			&:hover { background: rgba(236,97,73,.05); }
			&:active { background: rgba(236,97,73,.05); }

			&.like { color: #ffffff; background: #ea6f5a; }
			& > span { font-size: 20px; padding: 0 10px; }
			& > span:first-child { border-right: 1px solid #ea6f5a; }
			&.like > span:first-child { border-right: 1px solid #ffffff; }
		}
		.article-button-shares {

			& > span {
				width: 50px;
				height: 50px;
				border-radius: 50%;
				display: inline-block;
				border: 1px solid #dcdcdc;
			}
		}
	}
	.comment-wrap {
		padding: 10px 0;

		.comment-let {
			display: flex;
			& > img { width: 38px; height: 38px; border-radius: 50%;  margin-right: 20px; }
			& > div { flex-grow: 1; flex-shrink: 1; }
		}
		.comment-filter {
			display: flex;
			align-items: flex-end;
			justify-content: space-between;

			padding: 10px 0 20px 0;
			border-bottom: 1px solid #d9d9d9;

			& > div { color: #969696; font-size: 12px; vertical-align: middle; }
			& > div:first-child { font-size: 17px; font-weight: 700; color: #000000; }
			& > div:last-child > span { display: inline-block; cursor: pointer; }
			& > div:last-child > span:hover { color: #000000; }
			& > div:last-child > span:active { color: #ea6f5a; }

			.active { color: #000000; }
		}
	}
	.article-side {}
	.article-sidebar {
		position: fixed;
		right: 40px;
		bottom: 40px;

		& > span, & > a {
			color: #333;
			width: 50px;
			height: 50px;
			display: flex;
			cursor: pointer;
			align-items: center;
			justify-content: center;
			border: 1px solid #dcdcdc;

			&:first-child { border-bottom: none; border-radius: 4px 4px 0 0; }
			&:last-child { border-radius: 0 0 4px 4px; }
			&:hover { color: #337ab7; background-color: hsla(0,0%,71%,.1); transition: .1s ease-in; }
			&:active { color: #ffffff; background-color: #337ab7; }
		}
	}

	
	@media all and (max-width: 768px) {
		.article-main {
			width: 100%;
		}
	}
	@media all and (min-width: 768px) {
		.article-main {
			width: 768px;
		}
	}
</style>