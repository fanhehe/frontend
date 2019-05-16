<template>
	<div class = "settings-wrap">
		<div class = "settings-nav">
			<Navigator></Navigator>
		</div>
		<div class = "settings-container">
			<div class = "ctl"></div>
			<div class ="settings-aside">
				<router-link to = "basis"><i class = "fa fa-bars"></i><span>基础设置</span></router-link>
				<router-link to = "profile"><i class = "fa fa-address-card"></i><span>个人资料</span></router-link>
			</div>
			<div class = "settings-main">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>
<script>
	import Navigator from '../../components/Navigator';
	export default {
		components: { Navigator }
	};
</script>
<style lang = "sass">
	.settings-wrap {
		height: 100%;
		display: flex;
		box-sizing: border-box;
		flex-direction: column;

		.settings-container {}
		.settings-nav {}
	}
	.settings-container {
		display: flex;
		height: 100%;
		padding: 100px 20px 0;

		box-sizing: border-box;
		.settings-aside { flex: 1 1 300px; box-sizing: border-box; }
		.settings-main { flex: 3 1 500px; box-sizing: border-box; }
	}
	.settings-aside {
		z-index: 1;
		height: 100%;
		max-width: 33.3%;
		padding: 0px 20px;
		display: inline-block;
		transition: all .5s ease;
		border-right: 1px solid #d3d3d3;
		
		& > a {
			display: flex;
			color: #969696;
			cursor: pointer;
			white-space: nowrap;
			align-items: center;
			justify-content: center;
			padding: 5px 20px 5px 10px;
			font-size: 20px;
			&:hover { background: #7db2e6; color: #ffffff; border-radius: 5px; }
			&:active {}
			& > i {
				width: 1.4em;
				height: 1.4em;
				line-height: 1.4em;
				font-size: 1em;
				color: #ffffff;
				background: #969696;
				display: inline-block;
				/*padding: 5px;*/
				text-align: center;
				border-radius: 5px;
				margin-right: 10px;
				box-sizing: border-box;

			}
			& > span { color: #000000; font-size: .8em; }
			.active {}
		}
	}
	.settings-main { width: 100%; overflow: scroll; }
	.ctl {
			display: none;
			width: 40px;
			height: 40px;
			border-radius: 50%;
			position: fixed;
			bottom: 40px;
			right: 40px;
			background: #ff00ff;
			cursor: pointer;
			&:hover, &:active, &:focus {
				& ~ .settings-aside {
					display: block;
					background: #499EF3;
				}
			}
		}

	@media all and (max-width: 512px) {
		.settings-container { flex-direction: column; }
		.settings-aside { display: none; margin: 0; top: 0;  padding: 50px 0; position: fixed; left: 0; border: none; }
		.settings-main { margin-left: 0; }
		.ctl { display: block; }
	}
</style>