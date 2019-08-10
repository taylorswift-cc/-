<template>
  <el-select :value="value" placeholder="请选择" @change="fn" clearable>
    <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
  </el-select>
</template>

<script>
export default {
  name: 'my-select',
  data () {
    return {
      options: []
    }
  },
  props: ['value'],
  methods: {
    async getOptions () {
      const {
        data: { data }
      } = await this.$http.get('channels')
      this.options = data.channels
    },
    fn (id) {
      this.$emit('input', id)
    }
  },
  created () {
    this.getOptions()
  }
}
</script>

<style lang="less" scoped>
</style>
