<template>
  <div class="container"> 
    <gameStats :gameStats="gameInfo" class="gameStats"/>
    <router-link to="/Game" tag="button" class="start-button">START GAME</router-link>
  </div>
</template>

<script>
import gameStats from "../components/gameStats"

export default {
  name: "End",
  components: {
    gameStats
  },
  props: ["gameInfo"]
};
</script>

<style lang="scss">

  body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

  .container {
    background: url("../assets/board.jpg") no-repeat fixed;
    padding: 0.5em;
    border: 2px solid rgb(255, 255, 255);
  }

  .gameStats {
    color: white;
    font-weight: 600;
    padding: 0.25rem;
    margin: 0.5rem;
  }

</style>