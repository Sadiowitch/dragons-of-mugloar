import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    gameInfo: "",
    messages: [],
    solvingTask: false,
    shopList: []
  },
  mutations: {
    setGameInfo(state, info) {
      state.gameInfo = info;
    },
    setMessages(state, messages) {
      state.messages = messages;
    },
    isSolvingTask(state, status) {
      state.solvingTask = status;
    },
    setShopList(state, items) {
      state.shopList = items;
    }
  },
  actions: {
    async getGameInfo({ commit, dispatch }) {
      console.log("getGameInfo()");
      try {
        const response = await axios.post("https://dragonsofmugloar.com/api/v2/game/start");
        // SET_GAME_INFO
        commit("setGameInfo", response.data);
        dispatch("getTasks");
        dispatch("getShopItems");
        // this.getShopItems();
      } catch (error) {
        console.log("getGameInfo error.message:", error.message);
      }
    },

      async getTasks({ commit, state }) {
        try {
          const response = await axios.get(`https://dragonsofmugloar.com/api/v2/${state.gameInfo.gameId}/messages`);
          // SET_MESSAGES
          commit("setMessages", response.data);
          commit("isSolvingTask", false);
        } catch (error) {
          const gameInfo = state.gameInfo;
          // router.push jätab history alles (back nupuga lähed tagasi), router.replace ei jäta
          router.replace({ name: "End", params: { gameInfo } });
          // DOLLARIGA VIITAD VUE sisemisele olemasolevale meetodile!
        }
      },

      async solveTask({ commit, state, dispatch }, taskId) {
          try {
            commit("isSolvingTask", true);
            const response = await axios.post(`https://dragonsofmugloar.com/api/v2/${state.gameInfo.gameId}/solve/${taskId}`);
            console.log("response.data:", response.data);
            const info = {
              ...state.gameInfo,
              lives: response.data.lives,
              gold: response.data.gold,
              score: response.data.score,
              turn: response.data.turn,
              level: response.data.level,
              message: response.data.message
            }
            commit("setGameInfo", info);
            dispatch("getTasks");
          } catch (error) {
            console.log("getGameInfo error.message:", error.message);
            }
          },

          async getShopItems({ commit, state }) {
            try {
              const response = await axios.get(`https://dragonsofmugloar.com/api/v2/${state.gameInfo.gameId}/shop`);
              commit("setShopList", response.data);
            } catch (error) {
              console.log("error.message:", error.message);
            }
          },

          async buyItem({ commit, state, dispatch }, id) {
            try {
              const response = await axios.post(`https://dragonsofmugloar.com/api/v2/${state.gameInfo.gameId}/shop/buy/${id}`);
              const info = {
                ...state.gameInfo,
                lives: response.data.lives,
                gold: response.data.gold,
                turn: response.data.turn,
                level: response.data.level
              }
              commit("setGameInfo", info);
              dispatch("getShopItems");
              dispatch("getTasks");
            } catch (error) {
              console.log("getShopItems error.message:", error.message);
            }
          }
    },
  getters: {
    gameInfo: state => state.gameInfo,
    messages: state => state.messages,
    solvingTask: state => state.solvingTask,
    shopList: state => state.shopList
  }
});

// mutatsioone commititakse, actioneid dispatchitakse;