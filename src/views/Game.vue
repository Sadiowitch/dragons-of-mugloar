<template>
  <div class="game">
    <div class="game__dashboard">
     Task status: {{ gameInfo.message ? gameInfo.message : "Choose a task!"}}
    <gameStats :gameStats="gameInfo" />
    </div>

    <div class="game__area">
      <ul v-if="gameInfo.lives" class="game__list">
        <li 
          v-for="message in messages" 
          :key="message.adId" 
          @click="solveTask(message.adId)"
          class="game__list--item">
          <h4>{{ message.probability }}</h4>
          <p>{{ message.message }}</p>
          <span>Expires in: {{ message.expiresIn }} 🕑</span>
          <span>Reward: {{ message.reward }} 💰</span>
          </li>
      </ul>
      
      <div class="game__shop"> 
        <ul>
          <li 
            v-for="shopItem in shopList" 
            :key="shopItem.id">
            <p>{{ shopItem.name }}</p>
            <span>{{ shopItem.cost }} 💲</span>
            <button @click="buyItem(shopItem.id)">Purchase</button>
          </li>
        </ul>  
      </div>
    </div>

  </div>
</template>

<style lang="scss">
  .game {
    display: flex;
    flex-direction: column;

    
    &__area {
      display: flex;
      
    }

    &__list {
      width: 80%;
      display: flex;
      list-style: none;
      border: solid 1px orange;
      justify-content: space-evenly;
      flex-wrap: wrap;
      align-items: center;
      padding: 0;

    &--item {
      width: 14rem;
      height: 18rem;
      color: blue;
      background-color: lightgreen;
      border: 1px solid red;
      cursor: pointer;
    }
    }

    &__shop {
      border: solid 1px red;
          width: 30rem;
    }
  }
</style>

<script>

  import axios from "axios"
  import gameStats from "../components/gameStats"

  export default {
    name: "Game",
    components: {
      gameStats
    },
    data() {
      return {
        gameInfo: "",
        messages: [],
        shopList: []
      }
    }, 
    methods: {
      async getGameInfo() {
        try {
          const response = await axios.post("https://dragonsofmugloar.com/api/v2/game/start");
          console.log("response.data:", response.data);
          this.gameInfo = response.data;
          this.getTasks();
          this.getShopItems();
        } catch (error) {
          console.log("getGameInfo error.message:", error.message);
        }
      },

      async getTasks() {
        try {
          const response = await axios.get(`https://dragonsofmugloar.com/api/v2/${this.gameInfo.gameId}/messages`);
          this.messages = response.data;
        } catch (error) {
          const gameInfo = this.gameInfo;
          // router.push jätab history alles (back nupuga lähed tagasi), router.replace ei jäta 
          this.$router.replace({ name: "End", params: { gameInfo } });
          // DOLLARIGA VIITAD VUE sisemisele olemasolevale meetodile!
        }
      },
      
      async solveTask(taskId) {
        try {
          const response = await axios.post(`https://dragonsofmugloar.com/api/v2/${this.gameInfo.gameId}/solve/${taskId}`);
          console.log("response.data:", response.data);
          this.gameInfo = {
            ...this.gameInfo, 
            lives: response.data.lives,
            gold: response.data.gold,
            score: response.data.score,
            turn: response.data.turn,
            level: response.data.level,
            message: response.data.message
          }
          this.getTasks();
        } catch (error) {
          console.log("getGameInfo error.message:", error.message);
          }
        },

      async getShopItems() {
        try {
          const response = await axios.get(`https://dragonsofmugloar.com/api/v2/${this.gameInfo.gameId}/shop`);
          this.shopList = response.data;
        } catch (error) {
          console.log("error.message:", error.message)
        }
      },

      async buyItem(id) {
        try {
          const response = await axios.post(`https://dragonsofmugloar.com/api/v2/${this.gameInfo.gameId}/shop/buy/${id}`);
          console.log("response.data:", response.data);
          this.gameInfo = {
            ...this.gameInfo, 
            lives: response.data.lives,
            gold: response.data.gold,
            turn: response.data.turn,
          }
        this.getShopItems();
        } catch (error) {
          console.log("getGameInfo error.message:", error.message);
        }
      }

    },
    mounted() {
      this.getGameInfo();
    }
  }

</script>