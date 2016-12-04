<template>
	<ul class="page-container">
		<li v-if = "isnotFirstPage"
			@click = "onClickPageItem(firstPage)">首页</li>
		<li v-if = "isnotFirstPage"
			@click = "onClickPageItem(prevPage)">上一页</li>
		<li v-for = "item in pageList"
			class = "page-item"
			:class = "{active: curPage === item}"
			@click = "onClickPageItem(item)"
		>
			{{item}}
		</li>
		<li v-if = "isnotLastPage" 
			@click = "onClickPageItem(nextPage)">下一页</li>
		<li v-if = "isnotLastPage"
			@click = "onClickPageItem(lastPage)">尾页</li>
	</ul>
</template>
<script>
	export default {
		data () {
			return {};
		},
		props: ['curPage', 'maxPage', 'pageLimit', 'handleClickPageItem'],
		computed: {
			firstPage () {
				return 1;
			},
			lastPage () {
				return this.maxPage;
			},
			prevPage () {
				const firstPage = this.firstPage;
				const prevPage = this.curPage - 1;
				return prevPage >= firstPage ? prevPage : firstPage;
			},
			nextPage () {
				const maxPage = this.maxPage;
				const nextPage = this.curPage + 1;
				return nextPage >= maxPage ? maxPage : nextPage;
			},
			isnotFirstPage () {
				return this.curPage !== this.firstPage;
			},
			isnotLastPage () {
				return this.curPage !== this.maxPage;
			},
			pageList () {
				const pageList = [];
				const { curPage, maxPage, pageLimit, firstPage } = this;
				let pageStart = curPage - (pageLimit - pageLimit % 2) / 2;
				const pageEnd = curPage + (pageLimit - pageLimit % 2) / 2 - maxPage;

				pageStart = pageStart >= firstPage ? pageStart : firstPage;
				pageStart = pageEnd > 0 ? pageStart - pageEnd : pageStart;

				for (let i = pageStart, length = pageStart + pageLimit; i < length; i++) {
					pageList.push(i);
				}
				return pageList;
			},
		},
		methods: {
			onClickPageItem (pageId) {
				if (this.curPage !== pageId && this.handleClickPageItem) {
					this.handleClickPageItem(pageId);
				}
			},
		},
	};
</script>
<style lang = "sass">
	.page-container {
		font-size: 0;
		margin: 0 auto;
		padding: 20px 0;
		max-width: 100%;
		text-align: center;
		box-sizing: border-box;
		list-style-type: none;

		::selection {
			background-color: transparent;
		};

		.active {
			color: #ffffff;
			border-color: transparent;
			background-color: #499ef3;
		}
		
		> li {
			font-size: 16px;
			padding: 5 10px;
			cursor: pointer;
			border-radius: 4px;
			display: inline-block;
			box-sizing: border-box;
			border: 1px solid #dddddd;
			margin: 0 2px;
			transition: color .2s ease-in-out, background .2s ease-in-out;

			&:hover {
				color: #ffffff;
				background: #499ef3;
				border-color: transparent;
			};
		}
	}
	@media all and (max-width: 663px) {
		.page-container{
			.page-item,  
			li:last-child,
			li:first-child, {
				display: none;
			}
		}
	}
</style>