<template lang="pug">
.p-message {{ content }}
</template>
<script>
export default {
	name: 'PMessage',
	props: {
		content: {
			type: String,
			default: ''
		}
	},
	mounted() {
		window.setTimeout(this.close, 2000)
	},
	methods: {
		close() {
			this.$emit('close')
		}
	}
}
</script>

<style lang="stylus" scoped>
.p-message
	padding 12px 25px
	background-color rgba(0, 0, 0, 0.6)
	color #FFFFFF
	white-space nowrap
	word-break keep-all
	line-height 20px
</style>
