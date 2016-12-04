<template>
	<div>
		<Navigator />
		<div class = "blog-wrap">
			<div class = "blog-container">
				<div class= "blog-padding"></div>
				<div class = "blog-main-wrap">
					<div class = "blog-main">
						<div class = "blog-nav">
							<h2 class = "blog-title"><i class = "fa fa-list"></i>发现</h2>
							<nav class = "blog-filter">
								<a v-for = "item in blog.navList " 
									:class = "{ active: item.id === state.filterActiveItem }"
									@click = "handleClickFilter($event, item)">
									{{ item.name }}
								</a>
							</nav>
						</div>
						<div class = "blog-list-container">
							<blog-item v-for="item in blog.blogList" :data = "item"></blog-item>	
						</div>
						<Page 
							:maxPage = "20" 
							:pageLimit = "9" 
							:curPage = "state.curPage" 
							:handleClickPageItem = "handleClickPageItem"/>
					</div>
					<div class = "blog-slider">
						<div v-for = "(item, index) of blog.sliderArray"
							:key = "index"  
							class = "blog-slider-item" 
							:class = "`blog-slider-${item.type}`">
							<div class = "blog-slider-details">
								<h3>{{ item.title }}</h3>
								<a href="#">更多></a>
							</div>
							<div class="blog-slider-list-wrap">
								<slider-item :data= "item.data" :type = "item.type"></slider-item>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<Copyright />
	<div>
</template>>

<script>
	import { mapState } from 'vuex';
	// constants
	import { blog as types } from '../../constants/vuex';
	// modules
	import Page from '../../components/Page';
	import BlogItem from '../../components/BlogItem';
	import Navigator from '../../components/Navigator';
	import SliderItem from '../../components/SliderItem';
	import Copyright from '../../components/Copyright';

	export default {
		data () {
			const state = {
				curPage: 1,
				filterActiveItem: 0,
			};
			return {
				state,
			};
		},
		computed: {
			...mapState(['blog']),
		},
		methods: {
			handleClickFilter (event, item) {
				const { dispatch } = this.$store;
				const type = types.GET_BLOG_LIST;
				dispatch(type, {});
			},
			handleClickPageItem (pageId) {
				const { dispatch } = this.$store;
				const param = {
					page: pageId,
				};
				const success = () => {
					this.state = {
						...this.state,
						curPage: pageId,
					};
					document.body.scrollTop = 0;
				};
				const type = types.GET_BLOG_LIST;
				dispatch(type, {
					param,
					success,
				});
			},
		},
		components: {
			Navigator,
			BlogItem,
			SliderItem,
			Copyright,
			Page,
		},
		mounted () {
			const type = types.GET_BLOG_LIST;
			const { dispatch } = this.$store;
			dispatch(type);
		},
	};
</script>
<style lang= "sass">
	$maxWidth: 1010px;
	$pagePadding: 15px;
	.blog-wrap {
		position: relative;
		overflow: hidden;
		width: 100%;
	}
	.blog-container {
		width: 100%;
		margin: auto;
		padding: 0 	$pagePadding;
		box-sizing: border-box;

		.blog-padding {
			height: 150px;
		}
	}
	.blog-main-wrap {
		width: 100%;
		display: flex;
		padding: 0 20px;

		background: #ffffff;
		box-sizing: border-box;
		border: 1px solid #e6e6e6;
		box-shadow: 3px 3px 5px 0px #e6e6e6;

		& > div {
			max-width: 100%;
			overflow: hidden;
			box-sizing: border-box;	
		}
		.blog-main {
			display: flex;
			flex: 1px 3 0;
			flex-direction: column;		
			overflow: hidden;
		}
		.blog-slider {
			display: flex;
			flex: 1px 1 0;
			padding: 20px 0 0 20px;
			flex-direction: column;
			border-left: 1px solid #e6e6e6;

			& > div:not(:last-child) {
				border-bottom: 1px solid #e2e2e2;
				margin-bottom: 20px;
			}
		}
		.blog-list-container {
			max-width: 100%;
			box-sizing: border-box;
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

			i {
				display: inline-block;
				margin-right: 5px;
			}
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