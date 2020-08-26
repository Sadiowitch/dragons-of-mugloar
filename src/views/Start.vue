<template>
  <transition name="fade" appear>
      <router-link to="/Game" tag="button" class="start-button">START GAME</router-link>
  </transition>
</template>

<style lang="scss">
  body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
</style>

<script>
export default {
  name: "Start"
};
</script>