import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Popup from './Popup'
import Tip from './components/common/Tip.vue'

import 'github-markdown-css'
import 'highlight.js/styles/atom-one-dark.css'
import 'vue-cli-plugin-markdown-loader/atom-one-dark.fixed.css'
import './assets/stylus/index.styl'
import './assets/stylus/markdown.styl'

Vue.config.productionTip = false

Vue.prototype.isPrd = process.env.NODE_ENV === 'production'

// 全局挂载Popup插件
Vue.prototype.$popup = new Popup()

Vue.component(Tip.name, Tip)

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
