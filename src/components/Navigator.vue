<template>
	<div class = "nav-wrap" :class="`${deviceDetect}-wrap`">
		<div class = "nav-container">
			<router-link :to = "{ path: '/' }" class = "nav-title">Fan</router-link>
			<div class = "nav-search">
				<input type = "text" placeholder = "痕迹" maxlength="20" autofocus @keydown.13="search"/>
				<i class = "nav-search-icon fa fa-search" @click = "search" ></i>
			</div>
			<nav class = "nav-tabs">
				<i class = "fa fa-ellipsis-h more"></i>
				<span class = "nav-tabs-dropdown">
					<router-link :to= "{ path: '/blog' }"
						:class ="{ active: nav === '/blog' }">
						<i class = "fa fa-list"></i>发现
					</router-link>
					<router-link :to= "{ path: '/topic' }"
						:class ="{ active: nav === '/topic' }">
						<i class = "fa fa-tasks"></i>话题
					</router-link>
				</span>
			</nav>
			<div v-if = "!(userInfo.id && userInfo.id > 0)" class = "nav-buttons">
				<router-link 
					to= "/login?tab=login" class = "nav-button-login" :class = "style['btn-normal']">
					登陆
				</router-link>
				<router-link
					to= "/login?tab=register" class = "nav-button-register" :class = "style['btn-normal']">
					注册
				</router-link>
			</div>
			<div v-else class = "nav-buttons nav-preview-dropdown">
				<img class = "nav-avatar"
				:class = "{ hover }"
				:src = "userInfo.preview || previewDefault" 
				@hover="return hover=true"
				@blur="hover=false"/>
				<div class = "nav-userInfo">
					<div class = "userInfo-nickname">{{ userInfo.nickname || '' }}</div>
					<div class = "userInfo-bindings">
						<i style="fontSize:14px"
						class = "fa fa-fw fa-mobile" 
						:title = "userInfo.phone? '已绑定':'手机'" 
						:class = "{ binded: userInfo.phone }"></i>
						<i style="fontSize:12px;line-height:14px;" 
						class = "fa fa-fw fa-envelope-o" 
						:title = "userInfo.email? '已绑定':'邮箱'"
						:class = "{ binded: userInfo.email }"></i>
					</div>
					<div class = "userInfo-list">
						<router-link :to = "{ path: `/u/${ userInfo ? userInfo.id : 0 }` }">个人中心</router-link>
						<router-link :to = "{ path: `/w` }">我的文章</router-link>
						<router-link :to = "{ path: `/s/${ userInfo ? userInfo.id : 0 }` }">个人设置</router-link>
						<router-link :to = "{ path: `/topic` }">话题中心</router-link>
					</div>
					<div class = "userInfo-control">
						<span @click = "logout($event)">退出</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import style from '../assets/common.css';
	import { mapGetters, mapState } from 'vuex';
	import { user as types } from '../common/constants/request';

	export default {
		data () {
			return { style, hover: false, previewDefault: require('../assets/preview-default.png') };
		},
		computed: {
			...mapState(['userInfo']),
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
			login () {},
			logout () {
				const type = types.LOGOUT.name;
				this.$store.dispatch({ type });
			},
		},
		mounted () {
			this.$store.dispatch({ type: 'GET_USER_INFO_BY_USERNAME' });
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
	a { text-decoration: none; cursor: pointer; }
	.nav-wrap {
		z-index: 1;
		width: 100%;
		position: relative;
		box-sizing: border-box;
		background: $pageBackground;
	}
	.nav-container {
		margin: auto;
		display: flex;
		max-width: 100%;
		position: relative;
		box-sizing: border-box;
		padding: 0 $pagePadding;
		height: 50px;
		line-height: 50px;
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
		&:hover {color: #3db922; }
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
	.nav-tabs {
		height: 100%;
		display: flex;
		color: #ffffff;
		position: relative;
		box-sizing: border-box;

    	.active { background: #4dabff; }
    	.nav-tabs-dropdown { display: flex; height: 100%; }
		.more { display: none; cursor: pointer; box-shadow: -1px 0 0 0 #2cc2cc; &:hover { background: #4dabff; } }
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

			& >i { padding-right: 5px; }
			&:hover, &:active { background: #4dabff; }
			
		}
	}
	.nav-buttons {
		display: flex;
		flex: auto 1 1;
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
	.nav-preview-dropdown {
		.nav-avatar {
			z-index: 2;
			width: 50px;
			height: 100%;
			padding: 8px;
			display: flex;
			overflow: hidden;
			position: relative;
			border-radius: 50%;
			box-sizing: border-box;
			transition: all .25s ease-in-out;

			&:hover {
				transform: translate(-50%, 50%);
				box-shadow: 0px -2px 0px 0px #ffffff, 0px 2px 0px 0px #499EF3;

			};
		}

		.nav-avatar ~ .nav-userInfo {
			height: 0;

			top: 50px;
			z-index: 1;
			opacity: 0;
			width: 250px;
			overflow: hidden;
			position: absolute;
			background: #ffffff;
			align-items: center;
			flex-direction: column;
			box-sizing: border-box;
			border-bottom-left-radius: 8px;
			border-bottom-right-radius: 8px;
			transition: all 0.15s ease-in-out;
		}

		.nav-avatar:hover ~ .nav-userInfo, .nav-userInfo:hover {
			opacity: 1;
			height: auto;
		}
	}
	.nav-userInfo {
		& > div {
			width: 100%;
			padding: 0 20px;
			position: relative;
			font-size: 12px;
			line-height: 20px;
			text-align: center;
			box-sizing: border-box;
			transition: all 0.25s ease-in-out;
		}
		.userInfo-nickname {
			font-size: 14px;
			font-weight: 900;
			padding: 30px 0 0 0;

			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.userInfo-bindings {
			& > i { cursor: pointer; color: #444444; }
			& > i:hover { color: #499EF3; }
			display: flex;
			padding-top: 5px;
			padding-bottom: 5px;
			justify-content: flex-end;
			
			.binded { color: #4bc33a; }
			/*& :bofore, & :after { content: ''; }*/
		}
		.userInfo-list {
			font-size: 0px;
			padding-top: 10px;
			padding-bottom: 10px;
			box-shadow: inset 0px 1px 0px 0px #cccccc;

			& > a {
				width: 50%;
				font-size: 12px;
				cursor: pointer;
				display: inline-block;
				box-sizing: border-box;
				margin: 0;
			}
			& > a:hover{ color: #499EF3; }
			& > a:hover:before{ content: '>'; }
			& > a:hover:after { content: '<'; }
			& > a:before, & > a:after {
				content: '.';
				opacity: 0;
				font-size: 0;
				font-weight: 900;
				transition: all 0.25s ease-in-out;
			}
			& > a:hover:before, & > a:hover:after {
				opacity: 1;
				padding-left: 5px;
				padding-right: 5px;
				font-size: inherit;
				display: inline-block;
			}
		}
		.userInfo-control {
			text-align: right;
			background: #f4f5f7;

			& > span { cursor: pointer; }
			& > span:hover { color: red; }
			::selection { background: none; }
		}
	}
	@media all and (max-width: 768px) {
		.nav-wrap .nav-container {
			width: 100%;
			.nav-tabs {
				.more {
					display: flex;
					align-items: center;
					padding: 10px 20px;
				}
				.more:hover ~ .nav-tabs-dropdown { display: flex; }
				.nav-tabs-dropdown:hover { display: flex; }
				.nav-tabs-dropdown {
					top: 50px;
					color: #000000;
					display: none;
					background: #ffffff;
					position: absolute;
					flex-direction: column;
					& > a:hover { background: #F4F6FF; color: #654321; }
					& > a:ative { background: #F4F6FF; color: #654321; }
					& > a { padding: 8px 20px; flex: none; background: inherit; color: inherit; }
					& > a:last-child{ border-bottom-left-radius: 5px; border-bottom-right-radius: 5px; }
				}
			}
			.nav-search {
				display: none;
			}
		}
	}
	@media all and (min-width: 768px) {
		.nav-wrap .nav-container {
			width: $maxWidth;
		}
	}
</style>