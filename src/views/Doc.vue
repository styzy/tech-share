<template lang="pug">
.doc
	Header(backEnable)
	RouterView
</template>

<script>
export default {
	name: 'Doc',
	components: {
		Header: () => import('@/components/common/Header.vue')
	}
}
</script>

<style lang="stylus" scoped></style>
