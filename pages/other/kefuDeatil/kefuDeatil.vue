<template>
	<view>
		<web-view :webview-styles="style" @message="getMessage" :src="src"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				style: {
				     progress: {
				         color: '#FF3333'
				     }
				},
				// src:"https://v1.live800.com/live800/chatClient/chatbox.jsp?companyID=1401965&configID=49203&jid=8559836776&s=1"
				// #ifdef APP-PLUS
				src:"https://v1.live800.com/live800/chatClient/chatbox.jsp?companyID=1401965&configID=49203&jid=8559836776&s=1&pagereferrer=app",
				// #endif
				// #ifdef H5
				src:"https://v1.live800.com/live800/chatClient/chatbox.jsp?companyID=1401965&configID=49203&jid=8559836776&s=1&pagereferrer=H5",
				// #endif
				// #ifdef MP-WEIXIN
				src:"https://v1.live800.com/live800/chatClient/chatbox.jsp?companyID=1401965&configID=49203&jid=8559836776&s=1&pagereferrer=weixin",
				// #endif
			}
		},
		methods: {
			getMessage(e){
				console.log(e.detail)
			},
		}
	}
</script>

<style>

</style>
