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
							<nav class = "blog-filter">
								<a v-for = "item in navList" 
									:class = "{ active: item.id === filterActiveItem }"
									@click = "handleClickFilter($event, item)">
									{{ item.name }}
								</a>
							</nav>
						</div>
						<div class = "blog-list-container">
							<blog-item v-for="item in blogList" :data = "item"></blog-item>	
						</div>
					</div>
					<div class = "blog-slider">
						<div v-for = "(item, index) of sliderArray"
							:key = "index"  
							class = "blog-slider-item" 
							:class = "`blog-slider-${item.type}`">
							<div class = "blog-slider-details">
								<h3>{{ item.title }}</h3>
								<a href="#">更多</a>
							</div>
							<div class="blog-slider-list-wrap">
								<slider-item :data= "item.data" :type = "item.type"></slider-item>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	<div>
</template>>

<script>
	import BlogItem from '../../components/BlogItem';
	import Navigator from '../../components/Navigator';
	import SliderItem from '../../components/SliderItem';
	
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
			const sliderArray = [{
				title: '最近文章',
				type: 'article',
				data: [{
					title: '钢铁是怎样炼成的',
					username: 'fanhehe',
					time: '2014-12-02',
				}, {
					title: 'vue',
					username: 'fanhehe',
					time: '2312321',
				}, {
					title: 'vue',
					username: 'fanhehe',
					time: '2312321',
				}],
			}, {
				title: '热门话题',
				type: 'topic',
				data: [],
			}];

			const state = { filterActiveItem: 0 };
			const navList = [{ name: '最新', id: 0 }, { name: '推荐', id: 1 }, { name: '排名', id: 2 }];

			return {
				blogList,
				navList,
				...state,
				blogItemData,
				sliderArray,
			};
		},
		computed: {
		},
		methods: {
			handleClickFilter (event, item) {
				this.filterActiveItem = item.id;
			},
		},
		components: {
			Navigator,
			BlogItem,
			SliderItem,
		},
	};
</script>
<style lang= "sass">
	$maxWidth: 1010px;
	$pagePadding: 15px;
	.blog-wrap {
		position: relative;
		width: 100%;
	}
	.blog-container {
		width: 100%;
		margin: auto;
		padding: 0 	$pagePadding;
		box-sizing: border-box;
	}
	.blog-main-wrap {
		display: flex;
		background: #ffffff;
		padding: 0 20px;
		border: 1px solid #e6e6e6;
		box-shadow: 3px 3px 5px 0px #e6e6e6;

		.blog-main {
			display: flex;
			flex-direction: column;
			flex: 1px 3 0;
		}
		.blog-slider {
			display: flex;
			flex: 1px 1 0;
			padding: 20px 0 0 20px;
			flex-direction: column;
			box-sizing: border-box;
			max-width: 234px;
			border-left: 1px solid #e6e6e6;

			& > div:not(:last-child) {
				border-bottom: 1px solid #e2e2e2;
				margin-bottom: 20px;
			}
		}
	}
	.blog-nav {
		display: flex;
		height: 64px;
		align-items: stretch;
		border-bottom: 1px solid #e6e6e6;

		h2 {
			height: 100%;
			display: flex;
			align-items: center;
		}
		.blog-filter {
			display: flex;
			height: 100%;
			flex: 50px 1 0;
			align-items: flex-end;
			box-sizing: border-box;
			justify-content: flex-end;
			
			.active {
				font-weight: bold;
				box-shadow: inset 0 -2px 0 0 #155FAA;
			}
			a {
				box-sizing: border-box;
				padding: 0 13px 5px;
				margin: 0 2px;
				color: #000000;
				
				&:hover {
					box-shadow: inset 0 -2px 0 0 #155FAA;
				}
			}
		}
	}
	.blog-slider-item{
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
		font-size: 16px;
		min-height: 28px;
		white-space: nowrap;
		
		.blog-slider-details {
			display: flex;
			width: 100%;
			align-items: center;
			justify-content: space-between;
			white-space: nowrap;
			margin-bottom: 10px;
			a {
				font-size: 12px;
				text-align: left;
			}
			h3 {
				font-size: 16px;
				text-align: right;
			}
		}
		.blog-slider-list-wrap {
			width: 100%;
		}
	}
	@media all and (min-width: 993px) {
		.blog-wrap .blog-container {
			width: $maxWidth;
		}
	}
	@media all and (max-width: 992px) {
		.blog-main-wrap .blog-slider {
			display: none;
		}
	}
	
</style>