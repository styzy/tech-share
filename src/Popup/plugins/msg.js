export default {
	name: 'msg',
	install: Popup => {
		Popup.prototype.msg = function (content = '') {
			return new Promise(resolve => {
				this.render({
					component: () => import('@/components/popup/PMessage.vue'),
					componentProps: {
						content
					},
					mask: false,
					destroyed: () => {
						resolve()
					}
				})
			})
		}
	}
}
