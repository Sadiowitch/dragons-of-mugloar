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
  border-radius: 30px;
  background: linear-gradient(rgb(255, 235, 139), rgb(201, 34, 34));
  color: rgb(201, 34, 34);
  text-shadow: 1px 1px 5px rgb(255, 235, 139);
  font-weight: 600;
  padding: 0.5rem;
  box-shadow: 1px 1px 15px rgba(54, 39, 39, 0.74);
  font-size: 1.5rem;
  font-family: 'MedievalSharp', cursive;
  width: 13rem;
  transition: 0.2s all;
}

.start-button:hover {
  cursor: pointer;
  box-shadow: 1px 1px 50px rgba(255, 0, 0, 0.411);
  color:rgb(255, 0, 0);
}

.logo {
  width: 50rem;
}
</style>
