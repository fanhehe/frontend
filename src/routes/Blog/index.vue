<template>
	<div>
		<Navigator />
		<div class = "blog-wrap">
			<div class = "blog-container">
				ss
			</div>
		</div>
	<div>
</template>>

<script>
	import Navigator from '../../components/Navigator';
	export default {
		components: {
			Navigator,
		}
	};
</script>
<style lang="sass">
	$maxWidth: 1010px;
	$pagePadding: 15px;
	.blog-wrap {
		position: relative;
		width: 100%;
	}
	.blog-container {
		margin: auto;
		padding: 0 	$pagePadding;
		box-sizing: border-box;
	}
	@media all and (max-width: 992px) {
		.blog-wrap .blog-container {
			width: 100%;
		}
	}
	@media all and (min-width: 993px) {
		.blog-wrap .blog-container {
			width: $maxWidth;
		}
	}
</style>