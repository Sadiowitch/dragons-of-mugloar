<template>
  <div id="app">
    <div id="nav">
      <router-link to="/"><img alt="DoM logo" src="./assets/logo.png" class="logo" /></router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
}

::selection {
  background-color: rgba(255, 0, 0, 0.100);
}

body {
  background: url("./assets/background.jpg") no-repeat fixed;
  margin: 0;
  padding: 0;
  top: 0;
  left: 0;
}

li {
  list-style: none;
  margin: 0;
  padding: 0;
}

#app {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: rgb(255, 255, 255);
}

.start-button {
  border: none;
  background: linear-gradient(rgb(85, 60, 50), rgb(73, 53, 38));
  color: lightgray;
  border: 2px solid lightgray;
  text-shadow: 1px 1px 5px rgb(105, 105, 105);
  font-weight: 600;
  padding: 0.25rem;
  box-shadow: 1px 1px 15px rgb(160, 160, 160);
  font-size: 1.5rem;
  font-family: 'MedievalSharp', cursive;
  width: 10rem;
  transition: 0.2s all;
}

.start-button:hover {
  cursor: pointer;
  color: white;
  border: 2px solid white;
}

.logo {
  width: 50rem;
}
</style>
