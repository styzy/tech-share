<template lang="pug">
.menu
	.list
		.item(@click="toDoc(route)" v-for="route in docRoutes")
			.time {{ route.meta.time }}
			.title {{ route.meta.title }}
</template>

<script>
import { docRoutes } from '@/router'

export default {
	name: 'Menu',
	data() {
		return {
			docRoutes
		}
	},
	methods: {
		toDoc(route) {
			this.$router.push(route.path)
		}
	}
}
</script>

<style lang="stylus" scoped>
$color-line = $color-theme
$color-line = lighten($color-theme, 10%)
$color-line = #D4D5D6

.menu
	margin auto
	padding 80px 40px
	max-width 800px
	.list
		position relative
		&:before
			position absolute
			top 40px
			bottom 40px
			left calc(50% - 40px)
			z-index 1
			display block
			width 0
			border-left 1px dashed $color-line
			content ''
		.item
			baseAcf()

			position relative
			height 80px
			line-height @height
			cursor pointer
			&+.item
				margin-top 80px
			&:before
				baseTrans()

				position absolute
				top calc(50% - 10px)
				left calc(50% - 50px)
				z-index 1
				display block
				width 21px
				height 21px
				border-radius 100%
				background-color $color-line
				content ''
			.time
				float left
				margin-top 25px
				margin-left calc(50% - 170px)
				width 100px
				height 30px
				border-radius 3px
				background-color $color-theme
				box-shadow 0 0 5px 0 rgba(0, 0, 0, 0.5)
				color #FFFFFF
				text-align center
				font-weight 700
				font-size 16px
				line-height @height
			.title
				baseTrans()

				float right
				width calc(50% + 10px)
				color #424242
				text-align left
				font-weight 700
				font-size 20px
			&:hover
				.title
					color $color-theme
					text-decoration underline
				&:before
					background-color $color-theme
</style>
