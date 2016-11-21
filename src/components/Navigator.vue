<template>
	<div class = "nav-wrap" :class="`${deviceDetect}-wrap`">
		<div class = "nav-container">
			<router-link :to = "{path: '/'}" class = "nav-title">Fan</router-link>
			<div class = "nav-search">
				<input type = "text" placeholder = "痕迹sss" maxlength="20" autofocus />
				<span></span>
			</div>
			<nav class = "nav-links">
				<router-link :to= "{ path: '/'}">link1</router-link>
				<router-link :to= "{ path: '/'}">link2</router-link>
			</nav>
			<div class = "nav-buttons">
				<button class = "nav-button-login">登陆</button>
				<button class = "nav-button-register">注册</button>
			</div>
		</div>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex';
	export default {
		computed: {
			...mapGetters(['deviceDetect']),
		},
	};
</script>
<style lang = "sass">
	$pageBackground: #499EF3;
	$pagePadding: 15px;
	html {
		-webkit-text-size-adjust:none;
		text-size-adjust:none;
		font-size: 62.5%;
	}
	body {
		font-family: "Trebuchet MS",Helvetica,"Microsoft YaHei",Georgia,sans-serif;
		text-size-adjust:none;
		font-size: 1.6rem;
	}
	a { text-decoration: none; }
	.nav-wrap {
		background: $pageBackground;
		width: 1010px;
		padding: 0 $pagePadding;
		margin: auto;
		height: 50px;
		line-height: 50px;
		display: flex;
		justify-content: space-around;
		align-items: center;
		vertical-align: baseline;

		.nav-container {
			
		}
		.nav-title {
			flex: 1rem 0 0;
			font-size: 2rem;
			font-weight: 900;
			color: #fff;
			white-space: nowrap;
			padding: 0;
			margin: 0;
		}

		.nav-search {
			flex: 1rem 1 0;

			input {
				padding: 6px 30px 6px 6px;
				border-radius: 4px;
				background: #fff;
			}
			span {}
		}
		.nav-links {
			display: flex;
			flex: 1rem 1 0;
			a {
				flex: 4rem 1 0;
				height: 100%;
				flex-direction: row;

			}
		}
		.nav-buttons {
			display: flex;
			flex: 5rem 1 0;
			button {
				font-size: 1.6rem;
				padding: .5rem 1.5rem;
				border: none;
			}
		}
	}

	@media all and (max-width: 992px) {
		.nav-wrap {
			width: 100%;
		}
	}
</style>