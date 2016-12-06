<template>
	<div class = "article-container">
		<div class = "article-header">
			<i></i>
			<nav>
				<a>登陆</a>
				<a>注册</a>
			</nav>
		</div>
		<div class = "article-body container" v-html = "article.content" ></div>
		<div class = "article-footer"></div>
	</div>
</template>
<script>
	export default {
		data () {
			return {};
		},
		computed: {
			article () {
				return this.$store.state.article.article;
			}
		},
		mounted () {
		},
	};
</script>
<style lang = "sass">
	.article-container {
		.article-header {
			display: flex;
			white-space: nowrap;

		}
		.article-body {
			background: #ffffff;
		}
		.article-footer {

		}
	}
</style>