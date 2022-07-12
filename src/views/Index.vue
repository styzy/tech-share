<template lang="pug">
.index
	Header
	Menu
</template>

<script>
export default {
	name: 'Index',
	components: {
		Header: () => import('@/components/common/Header.vue'),
		Menu: () => import('@/components/index/Menu.vue')
	}
}
</script>

<style lang="stylus" scoped></style>
