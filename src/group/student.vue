<template>
  <div>
    <head-bar></head-bar>
    <router-view></router-view>
  </div>
</template>

<script>
  import HeadBar from 'components/headBar/headBar'

  export default {
    name: "student",
    components: {
      HeadBar
    },
  }
</script>

<style scoped>

</style>
