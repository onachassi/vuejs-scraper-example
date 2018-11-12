import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const axios = require('axios');
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
export default new Vuex.Store({
  state: {
    scraper: {
      inputs: {
        url: null,
        backend: 'scala'
      },
      outputs: {}
    }
  },
  mutations: {
    setScraperBackend(state, newBackend){
      state.scraper.inputs.backend = newBackend;
    },
    setScraperOutputs(state, newResponse){
      state.scraper.outputs = newResponse;
    }
  },
  actions: {
    getUrl (context, obj) {
      return new Promise((resolve, reject) => {
        if(obj.url) {
          var postUrl = "https://u56g9qcn86.execute-api.us-west-1.amazonaws.com/dev/title";
          if (context.state.scraper.inputs.backend == 'csharp') {
            postUrl = "https://02sh8pil5k.execute-api.us-west-1.amazonaws.com/dev/scrape";
          } 
          axios.post(postUrl, obj)
          .then(response => {
            context.commit("setScraperOutputs", response.data)
            resolve()
          })
          .catch(err => { 
            console.log('ErroLogger', err)
            context.commit("setScraperOutputs", {error: "Sorry, didn't get a response for that Url."})
            reject()
          })
        }
      })
    }
  }
})
