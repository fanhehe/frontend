<template>
	<div class="slider-item-container">
		<div v-for = "(item, index) of data"
			class="slider-item">
			<a class = "slider-item-left slider-item-avatar"></a>
			<div class = "slider-item-right">
				<h4 ><a :href= "item.articleHref"> {{ item.title }}</a></h4>
				<div class = "slider-item-details">
					<span class = "slider-item-username">来自 <a :href ="item.userHref">{{ item.username }}</a></span>
					<span>{{ item.time | convertTimestampToDate }}</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import convertTimestampToDate from '../utils/DateFormater';
	export default {
		data () {
			return {};
		},
		props: ['data'],
		filters: {
			convertTimestampToDate,
		}
	};
</script>
<style lang = "sass">
	.slider-item-container {

	}
	.slider-item {
		display: flex;
		height: 40px;
		margin-bottom: 2px;
		max-width: 100%;
		
		.slider-item-left {
			display: none;
			flex: 40px 0 0;
			margin-right: 10px;
			border-radius: 4px;
			background: red;
		}
		.slider-item-right {
			overflow: hidden;
			flex: 40px 5 0;
		}
	}
	.slider-item-right {
		h4 {
			font-size: 14px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			margin-bottom: 2px;
			color: #666666;
			a {
				color: inherit;
				&:hover {
					color: #000000;
				}
			}
		}
		.slider-item-details {
			display: flex;
			justify-content: flex-end;

			.slider-item-username {
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			& > span {
				font-size: 12px;
				color: #999999;
			}
			& > span:not(:last-child):after {
				content: '·';
				padding: 0 5px;
				vertical-align: middle;

			}
		}
	}
</style>