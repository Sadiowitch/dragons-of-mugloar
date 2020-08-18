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
  color: #2c3e50;
}

#nav {
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.start-button {
  border: none;
  border-radius: 10px;
  background-color: rgb(243, 214, 177);
  color: rgb(59, 36, 36);
  font-weight: 600;
  padding: 7px;
  box-shadow: 1px 1px 10px rgb(59, 36, 36);
  font-size: 1.5rem;
  font-family: 'MedievalSharp', cursive;
  width: 10rem;
}

.logo {
  width: 50%;
}
</style>
