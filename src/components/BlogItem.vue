<template>
	<div class = "blog-item-container">
		<a class = "blog-item-preview" href="#"><img :src="data.preview || previewDefault" alt="这是一个头像" /></a>
		<div class = "blog-item-main">
			<h4 class = "blog-item-title"><a href="#">{{ data.title }}</a></h4>
			<div class = "blog-item-details">
				<span class = "blog-item-classify">
					<span class = "classify-item" 
						v-for = "classifyItem of data.classify">
						{{ classifyItem }}
					</span>
				</span>
				<span class = "blog-item-username">来自 <a href= "#">{{ data.username }}</a></span>
				<span class = "blog-item-commentCounts">{{ data.commentCounts}}个评论</span>
				<span class = "blog-item-time">{{ data.time | toTime}}</span>
			</div>
			<div class = "blog-item-content">
				{{ data.content }}
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				previewDefault: require('./assets/preview-default.png'),
			};
		},
		props: ['data'],
		computed: {

		},
		filters: {
			toTime (value) {
				const date = new Date(value);
				const Y = date.getFullYear();
				const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
				const D = date.getDate();
				const h = date.getHours();
				const m = date.getMinutes();
				const result = `${Y}-${M}-${D} ${h}:${m}`;
				return result;
			},
		},
	};
</script>
<style lang="sass">
	.blog-item-container {
		display: flex;
		flex-direction: row;
		padding: 14px 0;
		position: relative;
		background: #ffffff;
		box-sizing: border-box;
		border-bottom: 1px solid #e6e6e6;
		&:last-child {
			border-bottom: none;
		}

		.blog-item-preview {
			display: inline-block;
			flex: 40px 0 0;
			border-radius: 4px;
			overflow: hidden;

			img {
				max-width: 100%;
				display: inline-block;
				height: auto;
			}
		}
		.blog-item-main {
			padding: 0 10px;
		}
	}
	.blog-item-main {
		.blog-item-title {
			margin: 0 0 3px;
		    padding-right: 20px;
		    font-size: 14px;
		    word-wrap: break-word;
			text-transform: capitalize;

			a {
				color: #155faa;
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
			max-height: 130px;
		}

	}
</style>