<template>
  <div class="game">
    <div class="game__dashboard">
      {{ gameInfo.message ? gameInfo.message : "Choose a task!"}}
    <gameStats :gameStats="gameInfo" />
    </div>

    <div class="game__area">
      <ul v-if="gameInfo.lives" class="game__list">
        <li 
          v-for="message in messages" 
          :key="message.adId" 
          class="game__list--item">
          <h4>{{ message.probability }}</h4>
          <p>{{ message.message }}</p>
          <span>Expires in: {{ message.expiresIn }} 🕑</span>
          <span>Reward: {{ message.reward }} 📀</span>
          <button @click="solveTask(message.adId)">Solve</button>
        </li>
      </ul>
      
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
      justify-content: space-evenly;
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
          console.log("error.message:", error.message);
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
            level: response.data.level
          }
          this.getShopItems();
          this.getTasks();
        } catch (error) {
          console.log("getShopItems error.message:", error.message);
        }
      }

    },
    mounted() {
      this.getGameInfo();
    }
  }

</script>