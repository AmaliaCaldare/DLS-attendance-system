<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <courses-page></courses-page>
  </div>
</template>

<script>
import CoursesPage from './components/CoursesPage.vue'

export default {
  name: 'App',
  components: {
    CoursesPage
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
