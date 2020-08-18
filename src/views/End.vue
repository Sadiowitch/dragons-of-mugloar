<template>
  <div> 
    <gameStats :gameStats="gameInfo" />
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
