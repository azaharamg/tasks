<template>
  <div id="app">
     <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: "App",
};
</script>

<style>
@import "../src/styles/variables.css";

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: var(---primaryFont);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: linear-gradient(var(--salmon), var(--grey));
  min-height: 100vh;
}
</style>
