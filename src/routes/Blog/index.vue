<template>
	<div>
		<Navigator />
		<div class = "blog-wrap">
			<div class = "blog-container">
				<div></div>
				<div class = "blog-main-wrap">
					<div class = "blog-main">
						<div class = "blog-nav">
							<h2 class = "blog-title">发现</h2>
							<nav>
								<a v-for = "(item ,index) in navList" :class = "{ active: item.id === index }">{{ item.name }}</a>
							</nav>
						</div>
						<div class = "blog-list-container">
							<blog-item v-for="item in blogList" :item = "item"></blog-item>	
						</div>
					</div>
					<div class = "blog-slider">
						<div class = "blog-hot-topic"></div>
						<div class = "blog-hot-user">
						</div>
					</div>
				</div>
			</div>
		</div>
	<div>
</template>>

<script>
	import Navigator from '../../components/Navigator';
	import BlogItem from '../../components/BlogItem';
	export default {
		data () {
			const blogItemData = {
				title: 'main',
				username: 'fanhehe',
				preview: '',
				classify: ['前端', 'javascript'],
				content: '你可以像绑定普通属性一样在模板中绑定计算属性。Vue 中绑定计算属性。Vue 中绑定计算属性。Vue 中绑定计算属性。Vue 中绑定计算属性。Vue 中绑定计算属性。Vue 中绑定计算属性。Vue 中绑定计算属性。Vue 知道 vm.b 依赖于 vm.a，因此当 vm.a 发生改变时，依赖于 vm.b 的绑定也会更新。而且最妙的是我们是声明式地创建这种依赖关系：计算属性的 getter 是干净无副作用的，因此也是易于测试和理解的',
				commentCounts: 10,
				scannerCounts: 7,
				time: 1479867410,
			};
			const blogList = [
				blogItemData,
				blogItemData,
				blogItemData,
			];
			const navList = [{ name: '最新', id: 0 }, { name: '推荐', id: 1 }, { name: '排名', id: 2 }];
			return {
				blogItemData,
				blogList,
				navList,
			};
		},
		computed: {
		},
		components: {
			Navigator,
			BlogItem,
		},
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
	.blog-main-wrap {
		display: flex;
		background: #ffffff;

		.blog-main {
			flex: 1px 5 0;
		}
		.blog-slider {
			flex: 1px 1 0;
			box-sizing: border-box;
			border-left: 1px solid #e6e6e6;
		}
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