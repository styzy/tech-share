import Vue from 'vue'
import Popup from '@styzy/vue-popup'
import { msg } from './plugins'

Popup.use(msg)

Vue.use(Popup)

export default Popup
