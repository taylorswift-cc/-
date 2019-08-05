<template>
  <div>article</div>
</template>

<script>
export default {
  created () {
    this.$http
      .get('user/profile')
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        return Promise.reject(err)
      })
  }
}
</script>

<style>
</style>
