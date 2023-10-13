<template>
  <div id="app">
    <todos></todos>
  </div>
</template>

<script>
import todos from './components/Todos.vue'

export default {
  name: 'App',
  components: {
    todos
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
