<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  body {
    background-color: #f7f7f7;
    padding-top: 50px;
    padding-bottom: 50px;
  }

  .is-danger {
    color: #9f3a38;
  }
</style>
