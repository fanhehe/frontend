<template>
	<div class = "about-container">
		<div class="background">
			<div class="night-sky"></div>
			<div class="stars"></div>
			<div class="stars2"></div>
			<div class="stars3"></div>
		</div>
		<div class = "main-wrap">
			<div class = "main-container" ref = "main" :style = "{top: `${ state.index * height * -1 }px`}">
				<div class = "slider" id = "slider1">
					<h1>Fan hehe</h1>
					<div class = "down">
						
					</div>
					<div class = "link">
						<a href = "http://fanhehe.cn" target = "_blank">
							<svg class = "icon" aria-hidden = "true">
								<use xlink:href="#icon-home"></use>
							</svg>
						</a>
						<a href = "https://github.com/fanhehe"  target = "_blank">
							<svg class = "icon" aria-hidden = "true">
								<use xlink:href="#icon-github"></use>
							</svg>
						</a>
						<a class = "wechat">
							<svg class = "icon" aria-hidden = "true">
								<use xlink:href="#icon-wechat"></use>
							</svg>
						</a>
						<a href = "mailto:vcrmp3@gmail.com" target = "_blank">
							<svg class = "icon" aria-hidden = "true">
								<use xlink:href="#icon-mail"></use>
							</svg>
						</a>
					</div>
				</div>
				<div class = "slider" id = "slider2">
					<div></div>
					<div></div>
					<div></div>
				</div>
				<div class = "slider" id = "slider3">3</div>
				<div class = "slider" id = "slider4">4</div>
				<div class = "slider" id = "slider5">5</div>
				<div class = "slider" id = "slider6">6</div>
				<div class = "slider" id = "slider7">7</div>
				<div class = "slider" id = "slider8">8</div>
				<div class = "slider" id = "slider9">9</div>
			</div>
			<div class = "main-list">
				<a v-for = "(item, index) in getList(n)"
					@click = "handleClickNav($event, item)"
					:class = "{ active: item === state.index }"
					:key = "index"></a>
			</div>
		</div>
		<div class = "loading"  ref = "loading"  v-if = "state.loading" >
			<div class = "circle" title = "loading"></div>
		</div>
	</div>
</template>

<script>
	import './assets/iconfont.js';

	export default {
		data () {
			return {
				n: 8,
				state: {
					index: 0,
					loading: true,
					isScroll: false,
				},
				height: window.innerHeight,
			};
		},
		methods: {
			handleClickNav (event, index) {
				const { n } = this;
				index = Math.min(index, n);
				index = Math.max(index, 0);
				this.state.index = index;
			},
			handleScroll (event) {
				if (this.state.isScroll) return;
				this.state.isScroll = true;

				const { n } = this;
				let { index } = this.state;
				const { wheelDelta } = event;

				index = wheelDelta >= 0 ? index - 1 : index + 1;
				index = Math.min(index, n);
				index = Math.max(index, 0);
				this.state.index = index;
				setTimeout(() => { this.state.isScroll = false; }, 1500);
				return true;
			},
			getList (n) {
				return new Array(n).fill(n).map((item, index) => index);
			},
		},
		mounted () {
			this.$refs.loading.classList.add('hidden');
			setTimeout(() => { this.state.loading = false; }, 2000);
			window.addEventListener('mousewheel', this.handleScroll.bind(this));
			window.addEventListener('keydown', this.handleKeydown.bind(this));
		},
		beforeDestory () {
			window.removeEventListener('mousewheel', this.handleScroll);
			window.removeEventListener('keydown', this.handleScroll);
		},
	};
</script>

<style lang = "sass">

	$starFieldWidth: 2560;
	$starFieldHeight: 2000;
	$starStartOffset: 600px;

	$starOneScrollDuration: 75s;
	$starTwoScrollDuration: 125s;
	$starThreeScrollDuration: 175s;
	$numStarOneStars: 1700;
	$numStarTwoStars: 700;
	$numStarThreeStars: 200;

	$width: 100%;
	.about-container {
		width: 100%;
		height: 100%;
		position: relative;
		font-size: 20px;
	}
	.background { 
		z-index: -1;
		position: fixed;
		width: 100%;
		height: 100%; 
	}

	.night-sky {
		margin: 0;
		height: 100%;
		position: relative;
		background-repeat: no-repeat;
		background-attachment: fixed;
		background: linear-gradient(to bottom, #020107 0%, #311B46 50%, #592C67 60%, #803E7E 75%, #CA759C 90%, #EC9D9D 95%, #C35E4D 100%);
		&:before {
			height: 100%;
			width: 100%;
			content: ' ';
			position: absolute;
			top: 0;
			/* http://bg.siteorigin.com/ */
			background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/424395/night-sky-texture.png');
			opacity: .1;
		}
	}

	// n is number of stars required
	@function multiple-box-shadow ($n) {
		// First star
		$stars: "#{random($starFieldWidth)}px #{random($starFieldHeight)}px #FFF";

		@for $i from 2 through $n {
			// Iterate through and append stars to string
			$stars: "#{$stars} , #{random($starFieldWidth)}px #{random($starFieldHeight)}px #FFF";
		}

		// Return all generated stars
		@return unquote($stars);
	}


	@mixin star-template($numStars, $starSize, $scrollSpeed) 
	{  
		z-index: 10;
		width: $starSize;
		height: $starSize;
		background: transparent;
		box-shadow: multiple-box-shadow($numStars);
		animation: animStar $scrollSpeed linear infinite;

		&:after {
			content: " ";
			width: $starSize;
			height: $starSize;
			position: absolute;
			top: -$starStartOffset;
			background: transparent;
			box-shadow: multiple-box-shadow($numStars);
		}
	}

	.stars { @include star-template($numStarOneStars, 1px, $starOneScrollDuration); }
	.stars2 { @include star-template($numStarTwoStars, 2px, $starTwoScrollDuration); }
	.stars3 { @include star-template($numStarThreeStars, 3px, $starThreeScrollDuration); }

	@keyframes animStar {
		from {
			transform: translateY(0px);
		}
		to {
			transform: translateY(-#{$starFieldHeight}px);
		}
	}
	.main-wrap {
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: absolute;
	}
	.main-container {
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		position: absolute;
		transition: 500ms cubic-bezier(0.86, 0, 0.07, 1);

		.slider {
			width: 100%;
			height: 100%;
			color: #ffffff;
			box-sizing: border-box;
		}
	}
	.main-list {
		width: 20px;
		right: 20px;
		height: 100%;
		position: fixed;

		display: flex;
		align-items: center;
    	flex-direction: column;
    	justify-content: center;
    	
		& a {
			width: 10px;
			height: 10px;
			margin: 10px 0;
			display: block;
			border-radius: 50%;
			border: 1px solid #ffffff;
			&:hover {}
			&.active { background-color: #ffffff; }
		}
	}
	#slider1 {

		h1 {
			margin: 0;
			cursor: pointer;
			font-size: 8em;
			text-align: center;
			padding-top: 150px;
			position: relative;
			transition: all .5s ease;
			text-shadow: 1px 1px 3px #ffffff, 2px 2px 7px #ffffff, 3px 3px 10px #ffffff, 5px 5px 15px #000000;
			&:hover:after { opacity: 1; transform: rotateZ(0deg); height: 6px; }
			&:after {
				opacity: 0;
				width: 100%;
				height: 1px;
				font-size: 0;
				content: ".";
				bottom: 0px;
				display: block;
				position: absolute;
				background: #ffffff;
				transform: rotateZ(90deg);
				transform-origin: 100% 0 0;
				transition: all .5s ease;
			}
		}
		
		.down {}
		.link {
			bottom: 0;
			width: 100%;
			display: flex;
			max-width: 100%;
			text-align: center;
			position: absolute;
			padding: 10px 20px;
			box-sizing: border-box;
			justify-content: space-between;

			& > a {
				height: 100%;
				color: #ffffff;
				font-size: 1.5em;
				position: relative;
				padding: 0 0 0 10px;
				box-sizing: border-box;

				&:hover { color: #0f88eb; }
			}
			& .wechat:hover:after { opacity: 1; }
			& .wechat:after {
				width: 4em;
				height: 4em;
				content: ' ';
				padding: 10px;
				position: absolute;
				border-radius: 5px;
				box-sizing: border-box;
				background-size: cover;
				background-origin: content-box;
				background-repeat: no-repeat;
				background-color: #ffffff;
				background-image: url(https://p.ssl.qhimg.com/d/inn/0444533a/Snip20160525_6.png);
				bottom: 120%;
				left: -20%;
				opacity: 0;
			}
		}
	}
	#slider2 {
		background-size: cover;
		background-attachment: fixed;
	}
	.loading {
		top: 0;
		left: 0;
		opacity: 1;
		z-index: 2;
		width: 100%;
		height: 100%;
		display: flex;
		position: fixed;
		align-items: center;
		justify-content: center;
		transition: all 1s ease;
		@extend .night-sky;
		
		&.hidden { height: 0px; opacity: 0; }

		@keyframes rot{
			0 { transform: rotateZ(0deg); box-shadow: 0px 0px 2px 6px #fafafa; }
			50% { transform: rotateZ(180deg); box-shadow: 0px 0px 6px 10px #fafafa; }
			100% { transform: rotateZ(360deg); box-shadow: 0px 0px 14px 18px #fafafa; }
		}

		.circle {
			width: 200px;
			height: 200px;
			cursor: pointer;
			border-radius: 50%;
			position: relative;
			display: inline-block;
			border: 4px solid #ffffff;
			box-shadow: 0px 0px 10px 2px #fafafa;
			animation: rot 5s linear 0s infinite forwards;
		}
		.circle:after {
			width: 10px;
			height: 10px;
			content: ".";
			bottom: -30px;
			color: #ffffff;
			font-size: 0px;
			border-radius: 50%;
			text-align: center;
			position: absolute;
			display: inline-block;
			background-color: #fafafa;
			box-shadow: 0px 0px 8px 2px #fafafa;
		}
	}
	@media all and (max-width: 512px) {
		.about-container { font-size: 10px; }
		.link { font-size: 2em; }
	}
</style>
