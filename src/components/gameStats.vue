<template>
   <ul class="dashboard">
    <li class="dashboard__item">💖 {{ gameStats.lives }} HP</li>
    <li class="dashboard__item">📀 {{ gameStats.gold }} Gold</li>
    <li class="dashboard__item">⭐ {{ gameStats.score }} Points</li>
    <li class="dashboard__item">🌪 {{ gameStats.turn }} Turns</li>
    </ul>
</template>

<script>
export default {
    name: "gameStats",
    props: ["gameStats"]
}
</script>

<style lang="scss">
    .dashboard {
        margin: 0;
        display: flex;
        list-style: none;
        justify-content: center;

    &__item {
        margin-right: 1rem;
    }
    }

</style>