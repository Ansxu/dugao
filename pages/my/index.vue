<template>
	<div>
		<countdown timeEnd="2020/5/2 12:30:12"></countdown>
	</div>
</template>

<script>
import countdown from '@/components/countdown.vue'
export default {
	components:{countdown},
	data() {
		return {
		}
	},
	onLoad() {
	},
	methods: {
	}
}
</script>
<style scoped lang="scss"></style>