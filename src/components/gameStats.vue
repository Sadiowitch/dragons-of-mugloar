<template>
   <ul class="dashboard">
    <li class="dashboard__item">HP ❤: {{ gameStats.lives }}</li>
    <li class="dashboard__item">Gold 💰: {{ gameStats.gold }}</li>
    <li class="dashboard__item">Score ⭐: {{ gameStats.score }}</li>
    <li class="dashboard__item">Turns: {{ gameStats.turn }}</li>
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
        border: solid 1px green;
        display: flex;
        list-style: none;
        justify-content: center;

    &__item {
        margin-right: 1rem;
    }
    }

</style>