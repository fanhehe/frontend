<template>
	<ul class="page-container">
		<li @click = "onClickPageItem(firstPage)">首页</li>
		<li @click = "onClickPageItem(prevPage)">上一页</li>
		<li v-for = "item in pageLimit"
			@click = "onClickPageItem(item)"
		>
			{{item}}
		</li>
		<li @click = "onClickPageItem(firstPage)">下一页</li>
		<li @click = "onClickPageItem(lastPage)">尾页</li>
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
				const firstPage = 1;
				const prevPage = this.curPage - 1;
				return prevPage >= firstPage ? prevPage : firstPage;
			},
			nextPage () {
				const maxPage = this.maxPage;
				const nextPage = this.curPage + 1;
				return nextPage >= maxPage ? maxPage : nextPage;
			},
			isFirstPage () {
				return this.curPage === this.firstPage;
			},
			isLastPage () {
				return this.curPage === this.maxPage;
			},
			offset () {
			},
		},
		methods: {
			onClickPageItem (pageId) {
				if (this.handleClickPageItem) {
					this.handleClickPageItem(pageId);
				}
			},
		},
	};
</script>
<style lang = "sass">
	.page-container {
		margin: 0 auto;
		padding: 20px 0;
		max-width: 100%;
		text-align: center;
		box-sizing: border-box;
		list-style-type: none;

		> li {
			padding: 5 10px;
			display: inline-block;
			box-sizing: border-box;
			border: 1px solid #0f88eb;
		}
	}
</style>