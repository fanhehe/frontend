<!--
	pubsub-js: 监听 message 信息
	message_format = {
		type: 'info' | 'warn' | 'error',
		message: string,
	}
-->
<template>
	<div class = "message-container" v-if = "list.length">
		<ul class = "message-list">
			<li v-for = "(data, index) in list"
				:key = "index"
				:class = "data.type"
			>{{ data.message }}</li>
		</ul>
	</div>
</template>
<script>
	import pubsub from 'pubsub-js';
	export default {
		data () {
			return {
				timer: undefined,
				list: [],
			};
		},
		methods: {
			setInterval (ms) {
				const maxInterval = 1000;
				if (!(typeof ms === 'number' && ms <= maxInterval)) ms = maxInterval;
				if (this.timer === undefined) this.timer = setInterval(this.shift, ms);
			},
			shift () {
				const { list } = this;
				if (list.length === 0) {
					clearInterval(this.timer);
					this.timer = undefined;
					return;
				}
				list.shift();
				this.list = list;
			},
			handleReceiveMessage (type, payload) {
				const { list } = this;
				let data = { type: 'warn' };
				if (typeof payload === 'string') data.message = payload;
				if (typeof payload === 'object') data = { ...data, ...payload };
				this.list = [data, ...list];
				return this.setInterval();
			},
		},
		mounted () {
			pubsub.subscribe('message', this.handleReceiveMessage);
		},
		beforeDestory () {
			pubsub.unsubscribe('message', this.handleReceiveMessage);
		},
	};
</script>
<style lang = "sass">
	.message-container {
		position: fixed;
		z-index: 10;
		top: 100px;
		left: 0;
		right: 0;
		margin: 0 auto;
		width: 300px; 
		text-align: center;
	}
	.message-list {
		list-style-type: none;
		& >	li {
			color: #3e3e3e;
			padding: 10px 20px;
			border: 1px solid #3e3e3e;
			border-radius: 4px;
			margin-bottom: 20px;
		}
		.info { color: #05a023; border-color: #05a023; }
		.warn { color: #e9ff02; border-color: #499EF3; }
		.error { color: #ea6f5a; border-color: #ea6f5a; }
	}
	@media all and (max-width: 500px) {
		.message-container { width: 80%; }
	}
</style>