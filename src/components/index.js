import myBread from '@/components/my-bread.vue'

import mySelect from '@/components/my-select.vue'

export default {
  install (Vue) {
    Vue.component(myBread.name, myBread)
    Vue.component(mySelect.name, mySelect)
  }
}
