import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const docRoutes = [
	{
		path: '/doc/vue2.hidden.skills',
		component: () => import('@/views/doc/vue2.hidden.skills.md'),
		props: true,
		meta: {
			title: 'Vue2冷门小技巧',
			time: '2022-07-14'
		}
	},
	{
		path: '/doc/data.responsive',
		component: () => import('@/views/doc/data.responsive.md'),
		props: true,
		meta: {
			title: '深入数据响应式原理',
			time: '2022-06-07'
		}
	},
	{
		path: '/doc/class.instance.prototype',
		component: () => import('@/views/doc/class.instance.prototype.md'),
		props: true,
		meta: {
			title: '类 构造函数 实例 原型',
			time: '2022-05-24'
		}
	},
	{
		path: '/doc/promise.async.await',
		component: () => import('@/views/doc/promise.async.await.md'),
		props: true,
		meta: {
			title: 'Promise类型以及async/await',
			time: '2022-05-11'
		}
	},
	{
		path: '/doc/call.apply.bind',
		component: () => import('@/views/doc/call.apply.bind.md'),
		props: true,
		meta: {
			title: 'call() apply() bind()',
			time: '2022-05-11'
		}
	}
]

const routes = [
	{
		path: '/',
		name: 'Index',
		component: () => import('@/views/Index')
	},
	{
		path: '/doc',
		name: 'Doc',
		component: () => import('@/views/Doc'),
		children: docRoutes
	}
]

const router = new VueRouter({
	routes: [].concat(routes, docRoutes)
})

export { docRoutes }

export default router
