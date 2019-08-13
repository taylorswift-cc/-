import myBread from '@/components/my-bread.vue'

import mySelect from '@/components/my-select.vue'

import myUpdata from '@/components/my-updata.vue'

export default {
  install (Vue) {
    Vue.component(myBread.name, myBread)
    Vue.component(mySelect.name, mySelect)
    Vue.component(myUpdata.name, myUpdata)
  }
}
