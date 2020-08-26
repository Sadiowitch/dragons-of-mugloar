<template>
  <div class="game">
    <div class="game__dashboard">
      {{ gameInfo.message ? gameInfo.message : "Choose a task!"}}
      <p v-if="gameInfo.score >= 1000"> "You have proven yourself worthy! 💪🏼"</p>
    <gameStats :gameStats="gameInfo" />
    </div>

  <div class="game__area">
    <transition-group name="list" tag="ul" v-if="gameInfo.lives" class="game__list">
      <li
        v-for="message in messages"
        :key="message.adId"
        class="game__list--item">
        <h4>{{ message.probability }}</h4>
        <p>{{ message.message }}</p>
        <span>Expires in: {{ message.expiresIn }} 🕑</span>
        <span>Reward: {{ message.reward }} 📀</span>
        <button @click="!solvingTask && solveTask(message.adId)">Solve</button>
      </li>
    </transition-group>
    <div class="game__shop">
      <ul>
        <h2>Marketplace</h2>
        <li
          v-for="shopItem in shopList"
          :key="shopItem.id"
          class="game__shop--li">
          <p>{{ shopItem.name }}</p>
          <button @click="buyItem(shopItem.id)">💲{{ shopItem.cost }}</button>
        </li>
      </ul>
    </div>
  </div>
  </div>
</template>

<script>
  import gameStats from "../components/gameStats"
  import { mapActions, mapGetters } from 'vuex' // laseb võtta vuexist actionid;

  export default {
    name: "Game",
    components: {
      gameStats
    },
    computed: {
      ...mapGetters([
        'gameInfo',
        'messages',
        'solvingTask',
        'shopList'
      ])
    },
    methods: {
      ...mapActions([ // võtab vuexist actionid;
        'getGameInfo',
        'solveTask',
        'buyItem'
      ]),

    },
    mounted() {
      this.getGameInfo(); //  võtab funktsiooni mapitud actionist;
    }
  }

</script>


<style lang="scss">

  body {
    padding-top: 3rem;
  }

  .game {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    background: url("../assets/board.jpg") no-repeat center;

    &__dashboard {
      background: linear-gradient(rgba(85, 60, 50, 0.842), rgb(73, 53, 38));
      color: white;
      border: 2px solid white;
      font-weight: 600;
      padding: 0.25rem;
    }

    &__area {
      display: flex;
      margin: 0 auto;
    }

    &__list {
      width: fit-content;
      display: flex;
      list-style: none;
      justify-content: flex-start;
      align-content: space-evenly;
      flex-wrap: wrap;
      padding: 0;
      margin: 0;

    &--item {
      width: 14rem;
      height: 18rem;
      color: rgb(49, 49, 49);
      background: url("../assets/paper.jpg") no-repeat;
      margin: 0.5em 0 0.5em 0;
      padding: 0.5em;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      transition: 0.2s box-shadow;

      h4 {
        font-family: 'MedievalSharp', cursive;
        color: rgb(201, 34, 34);
        margin: 0;
      }

      button {
        padding: 0.25rem;
        width: 10rem;
      }
    }

    &--item:hover {
      box-shadow: 0px 0px 5px 2px rgb(255, 255, 255);
    }
  }

    &__shop {
      text-align: left;
      background: url("../assets/stone.jpg");
      background-size: contain;
      box-shadow: 1px 1px 3px rgb(0, 0, 0);
      padding: 0.5rem;

      h2 {
        color: transparent;
        background: linear-gradient(rgb(255, 251, 0), rgb(255, 0, 0));
        background-clip: text;
        padding: 0;
        margin: 0.5rem;
        font-size: 2rem;
        font-family: 'MedievalSharp', cursive;
        font-weight: 600;
        text-align: center;
      }

      ul {
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-content: space-between;
        width: max-content;
        background: rgba(0, 0, 0, 0.33);
      }

      &--li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0.25rem;
        padding: 0 0.25rem;
        background: linear-gradient(rgba(80, 80, 80, 0.5), rgba(49, 49, 49, 0.5));

        p {
          margin: 0;
          padding: 0;
        }

        button {
          padding: 0.1rem;
          width: 5rem;
          margin: 0 0 0 0.5rem;
        }
      }

      &--li:hover {
        background: linear-gradient(rgba(85, 85, 85, 0.5), rgba(160, 160, 160, 0.5));
      }
    }

  button {
    border: none;
    background: linear-gradient(rgba(85, 60, 50, 0.842), rgb(73, 53, 38));
    color: lightgray;
    border: 2px solid lightgray;
    text-shadow: 1px 1px 5px rgb(105, 105, 105);
    font-weight: 600;
    box-shadow: 1px 1px 15px rgb(160, 160, 160);
    font-size: 1.5rem;
    font-family: 'MedievalSharp', cursive;
    transition: 0.2s all;
  }

  button:hover {
    cursor: pointer;
    color: white;
    border: 2px solid white;
  }
}

.list-enter-active, .list-leave-active {
  transition: opacity 1s;
}
.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>