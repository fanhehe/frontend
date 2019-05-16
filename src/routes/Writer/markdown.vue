<template>
	<div class = "md-container">
		<div class = "md-title"></div>
		<div class = "md-control">
			<div class = "control-1">
				<svg class = "icon" aria-hidden = "true">
					<use xlink:href="#icon-b"></use>
				</svg>
				<svg class = "icon" aria-hidden = "true">
					<use xlink:href="#icon-i"></use>
				</svg>
				<svg class = "icon" aria-hidden = "true">
					<use xlink:href="#icon-s"></use>
				</svg>
				<svg class = "icon" aria-hidden = "true">
					<use xlink:href="#icon-u"></use>
				</svg>
				<svg class = "icon" aria-hidden = "true">
					<use xlink:href="#icon-pencil"></use>
				</svg>
			</div>
			<div class = "control-2">
				<svg class = "icon" aria-hidden = "true">
					<use xlink:href="#icon-h1"></use>
				</svg>
				<svg class = "icon" aria-hidden = "true">
					<use xlink:href="#icon-h2"></use>
				</svg>
				<svg class = "icon" aria-hidden = "true">
					<use xlink:href="#icon-h3"></use>
				</svg>
				<svg class = "icon" aria-hidden = "true">
					<use xlink:href="#icon-h4"></use>
				</svg>
				<svg class = "icon" aria-hidden = "true">
					<use xlink:href="#icon-h5"></use>
				</svg>
				<svg class = "icon" aria-hidden = "true">
					<use xlink:href="#icon-h6"></use>
				</svg>
			</div>
		</div>
		<div class = "md-main">
			<div class = "md-editor">
				<ul></ul>
				<textarea name = "text"></textarea>
			</div>
			<div class = "md-viewer"></div>
		</div>
	</div>
</template>
<script>
	import './assets/markdown-iconfont.js';
	export default {
		methods: {

		},
	};
</script>
<style lang = "sass">
	.md-container {
		height: 100%;
		box-sizing: border-box;
	}
	.md-control {
		& > div {
			display: inline-block;
			&:not(:last-child) { padding-right: 3px; margin-right: 3px; border-right: 1px solid rgb(231, 231, 231); }
		}
		.icon { font-size: 14px; padding: 0 3px; &:hover { color: blue; }}
	}
	.icon {
		width: 1em;
		height: 1em;
		cursor: pointer;
		overflow: hidden;
		fill: currentColor;
		vertical-align: -0.15em;
	}
	.md-main {
		display: flex;
		height: 100%;
		box-sizing: border-box;
	}
	.md-editor {
		height: 100%;
		display: flex;
		font-size: 16px;
		line-height: 16px;
		box-sizing: border-box;

		& > ul {
			width: 20px;
			line-height: inherit;
		}
		& > textarea {
			padding: 0;
			outline: none;
			resize: none;
			border: none;
			opacity: 0;
			line-height: inherit;
		}
	}
</style>