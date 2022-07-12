<template lang="pug">
.header(:class="{ 'show-back': backEnable, 'show-egg': eggMode }")
	.wrapper
		.title(@click="knock") Tech Share · 技术分享
		.link(@click="toHome") 返回首页
		.egg
			.text Tech Forever · 技术永不止步
</template>

<script>
export default {
	name: 'Header',
	props: {
		backEnable: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			knockCount: 0
		}
	},
	computed: {
		eggMode() {
			return this.knockCount >= 5
		}
	},
	methods: {
		toHome() {
			this.$router.push('/')
		},
		knock() {
			if (this.eggMode) return
			this.knockCount++
			if (this.eggMode) {
				this.$popup.msg(`Surprise`)
			} else {
				this.$popup.msg(`Knock! x ${this.knockCount}`)
			}
		}
	}
}
</script>

<style lang="stylus" scoped>
.header
	width 100%
	height 100px
	.wrapper
		position fixed
		top 0
		right 0
		left 0
		z-index 1
		height @height
		.title,
		.link,
		.knock-text,
		.egg
			baseTrans()

			position absolute
			top 0
			width @width
			height @height
			box-shadow 0 0 5px 0 rgba(0, 0, 0, 0.2)
			text-align center
			font-weight 700
			line-height @height
		.title
			left 0
			z-index 1
			background-color rgba(255, 255, 255, 0.95)
			color $color-theme
			font-size 30px
			opacity 1
			user-select none
		.link
			left - @width
			z-index 2
			background-color $color-theme
			color #FFFFFF
			font-size 24px
			opacity 0
			cursor pointer
		.egg
			baseTrans()

			left @width
			z-index 10
			background-color #111111
			opacity 0
			.text
				background-image linear-gradient(135deg, #FF0000, #FF8600, #FFFD00, #13A200, #00DBD0, #002BB7, #B200AA, #FF0077)
				background-clip text
				color transparent
				font-size 30px
				animation run 50s linear infinite
	&.show-back
		.wrapper:hover
			.title
				left @width
				opacity 0
			.link
				left 0
				opacity 1
	&.show-egg
		.wrapper:hover
			.title
				left - @width
				opacity 0
			.egg
				left 0
				opacity 1
@keyframes run
	from
		backgroud-position 0 0
	to
		background-position -10000px 0
</style>
