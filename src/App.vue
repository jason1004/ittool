<template>
  <div id="app">
    <DataConverter />
  </div>
</template>

<script>
import DataConverter from './components/DataConverter.vue'

export default {
  name: 'App',
  components: {
    DataConverter
  }
}
</script>

<style>
#app {
  padding: 20px;
}
</style> 