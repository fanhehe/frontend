<template>
	<div class = "blog-item-container">
		<a class = "blog-item-preview" href="#"><img :src="data.author.avatar_url || previewDefault" alt="这是一个头像" /></a>
		<div class = "blog-item-main">
			<h4 class = "blog-item-title"><a href="#">{{ data.title }}</a></h4>
			<div class = "blog-item-details">
				<span class = "blog-item-classify">
					<span class = "classify-item" 
						v-for = "classifyItem of data.classify">
						{{ classifyItem }}
					</span>
				</span>
				<span class = "blog-item-username">来自 <a href= "#">{{ data.author.loginname }}</a></span>
				<span class = "blog-item-commentCounts">{{ data.reply_count}}个评论</span>
				<span class = "blog-item-time">{{ data.create_at | convertTimestampToDate }}</span>
			</div>
			<div class = "blog-item-content" v-html = "data.content"></div>
		</div>
	</div>
</template>
<script>
	import convertTimestampToDate from '../utils/DateFormater';
	export default {
		data () {
			return {
				previewDefault: require('./assets/preview-default.png'),
			};
		},
		props: ['data'],
		filters: {
			convertTimestampToDate,
			converTimeFromString (value) {
			},
		},
	};
</script>
<style lang = "sass">
	.blog-item-container {
		display: flex;
		flex-direction: row;
		padding: 14px 0;
		position: relative;
		background: #ffffff;
		box-sizing: border-box;
		border-bottom: 1px solid #e6e6e6;
		overflow: hidden;

		&:last-child {
			border-bottom: none;
		}

		.blog-item-preview {
			height: 40px;
			flex: 40px 0 0;
			overflow: hidden;
			border-radius: 4px;

			img {
				height: auto;
				max-width: 100%;
				display: inline-block;
			}
		}
		.blog-item-main {
			padding: 0 10px;
			overflow: hidden;
			box-sizing: border-box;
		}
	}
	.blog-item-main {
		.blog-item-title {
			margin: 0 0 3px;
		    font-size: 14px;
		    word-wrap: break-word;
			text-transform: capitalize;

			a {
				color: #155faa;
				overflow: hidden;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				text-overflow: ellipsis;
				-webkit-box-orient: vertical;
			}
			a:hover, a:active {
				color: #499ef3;
			}
		}
		.blog-item-details {
			display: flex;
			padding: 5px 0;
			color: #999999;
			font-size: 12px;

			& > span {
				white-space: nowrap;
			}
			& > span:not(:last-child):after {
				content: ' \B7 ';
				display: inline-block;
				padding: 0 4px;
				font-size: 12px;
			}
			.blog-item-classify {

				.classify-item {
					padding: 0 5px;
					border-radius: 2px;
					box-sizing: border-box;
					background-color: #f2f2f2;
					cursor: pointer;

					&:not(:last-child) {
						margin-right: 5px;
					}
					&:hover {
						background-color: #dddddd;
						color: #ffffff;
					}
				}
			}
		}
		.blog-item-content {
			color: #666666;
			font-size: 14px;
			line-height: 1.4;
			max-height: 160px;
			overflow: hidden;
			max-width: 100%;
		}

	}
</style>