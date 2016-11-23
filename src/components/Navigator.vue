<template>
	<div class = "nav-wrap" :class="`${deviceDetect}-wrap`">
		<div class = "nav-container">
			<router-link :to = "{path: '/'}" class = "nav-title">Fan</router-link>
			<div class = "nav-search">
				<input type = "text" placeholder = "痕迹" maxlength="20" autofocus @keydown.13="search"/>
				<i class = "nav-search-icon fa fa-search" @click = "search" ></i>
			</div>
			<nav class = "nav-links">
				<router-link :to= "{ path: '/blog'}" 
					:class ="{active: nav === '/blog'}">
					<i class = "fa fa-list"></i>发现
				</router-link>
				<router-link :to= "{ path: '/topic'}" 
					:class ="{active: nav === '/topic'}">
					<i class = "fa fa-tasks"></i>话题
				</router-link>
				<a ><i class = "fa fa-ellipsis-h more"></i></a>
			</nav>
			<div class = "nav-buttons">
				<a class = "nav-button-login" :class = "style['btn-normal']">登陆</a>
				<a class = "nav-button-register" :class = "style['btn-normal']">注册</a>
			</div>
		</div>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex';
	import style from '../utils/common.css';
	export default {
		data () {
			return {
				style,
			};
		},
		computed: {
			...mapGetters(['deviceDetect']),
			nav () {
				const path = this.$route.path;
				return path;
			},
		},
		methods: {
			search (event) {
				console.log(event);
			},
		},
	};
</script>
<style lang = "sass">
	$pageBackground: #499EF3;
	$pagePadding: 15px;
	$maxWidth: 1010px;
	html {
		-webkit-text-size-adjust:none;
		text-size-adjust:none;
		font-size: 62.5%;
	}
	body {
		font-family: "Trebuchet MS",Helvetica,"Microsoft YaHei",Georgia,sans-serif;
		background: #F0F0F0 repeat;
		text-size-adjust:none;
		font-size: 1.6rem;
	}
	a { text-decoration: none; cursor: pointer;}

	.nav-wrap {
		background: $pageBackground;
		position: relative;
		width: 100%;

		.nav-container {
			position: relative;
			padding: 0 $pagePadding;
			margin: auto;
			height: 50px;
			line-height: 50px;
			display: flex;
			align-items: center;
			vertical-align: baseline;
			box-sizing: border-box;
		}

		.nav-title {
			flex: 50px 0 0;
			font-size: 2rem;
			color: #fff;
			text-align: center;
			white-space: nowrap;
			margin-right: 20px;
			cursor: pointer;
		}

		.nav-search {
			flex: 165px 0 0;
			display: flex;
			align-items: center;
			height: 100%;
			color: #999999;
			position: relative;
			margin-right: 16px;
			input {
				border: none;
				padding: 6px 30px 6px 6px;
				border-radius: 4px;
				background: #fff;
				outline: none;
			}
			.nav-search-icon {
				position: absolute;
				right: 5px;
				cursor: pointer;
			}
		}
		.nav-links {
			display: flex;
			.active {
				background: #4dabff;
			}
			a {
				display: flex;
				justify-content: center;
				align-items: center;
				flex: 60px 1 0;
				height: 100%;
				color: #ffffff;
				white-space: nowrap;
				padding: 16px;
				box-sizing: border-box;
				cursor: pointer;
				text-algin: center;
				
				&:hover, &:active {
					background: #4dabff;
				}
				.fa {
					padding-right: 5px;
				}
				.more {
					font-size: 1.2em;
				}
			}
		}
		.nav-buttons {
			display: flex;
			flex: 180px 1 0;
			height: 100%;
			align-items: center;
			justify-content: flex-end;
			a {
				margin: 0 5px;
			}

			.nav-button-login {

			}
			.nav-button-register {
				background: #38b836;

				&:hover, &:active {
					background: #4bc33a;
				}
			}
		}
	}

	@media all and (max-width: 992px) {
		.nav-wrap .nav-container {
			width: 100%;

			.nav-search {
				display: none;
			}
		}
	}
	@media all and (min-width: 993px) {
		.nav-wrap .nav-container {
			width: $maxWidth;
		}
	}
</style>