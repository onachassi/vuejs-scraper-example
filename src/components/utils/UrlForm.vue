<template>
  <div>
    <div class="pull-right">
      <div class="btn-group btn-group-toggle" data-toggle="buttons">
        <label @click="changeBackend('scala')" :class="[this.backend == 'scala' ? 'btn btn-secondary active btn-group-label' : 'btn btn-secondary btn-group-label']">
          <input type="radio" name="options" id="option1" autocomplete="off" checked> Scala
        </label>
        <label @click="changeBackend('csharp')" :class="[this.backend == 'csharp' ? 'btn btn-secondary active btn-group-label' : 'btn btn-secondary btn-group-label']">
          <input type="radio" name="options" id="option2" autocomplete="off"> C#
        </label>
      </div>
    </div>
    <div class="form-group">
      <label for="url-input">Enter a Url to get the title and body</label>
      <div class="flex">
        <div class="url-prefix">http://www.</div><input type="text" class="form-control prefixed" id="url-input" aria-describedby="url-input" placeholder="sample.com" v-model="inputs.url">
      </div>
      <small v-if="this.error" class="warning">{{this.error}}</small>
    </div>
    <div class="form-group">
      <button type="submit" class="btn btn-primary btn-submit" @click="handleSubmit()">
        <div class="LoaderBalls" v-if="loading">
          <div class="LoaderBalls__item"></div>
          <div class="LoaderBalls__item"></div>
          <div class="LoaderBalls__item"></div>
        </div>
        <template v-else>
          Submit
        </template>
      </button>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState, mapMutations } from 'vuex'
  export default {

    name: 'UrlForm',

    data () {
      return {
        loading: false,
        inputs: {
          url: null
        },
        error: null
      }
    },
    computed: {
      ...mapState({
        backend: state => state.scraper.inputs.backend
      }),
      url(){
        return this.inputs.url
      }
    },
    methods: {
      ...mapActions(['getUrl']),
      ...mapMutations(['setScraperBackend']),
      cleanUrl(url){
        var checkParams = ['http://www.', 'https://www.', 'http://', 'https://', 'www.'];
        checkParams.forEach(ele => {
          if (url.includes(ele)) {
            url = url.replace(ele,'')
          }
        })
        return url
      },
      handleSubmit(){
        this.error = null
        if (this.url && this.url.includes('.')) {
          this.loading = true;
          this.getUrl({ url: this.cleanUrl(this.inputs.url) })
          .then(() => {
            this.loading = false
          })
          .catch(() => {
            this.loading = false
          })
        } else {
          this.error = 'Please make sure you enter a valid url'
        }
      },
      changeBackend(backend){
        this.setScraperBackend(backend)
      }
    }
  }
</script>

<style lang="css" scoped>
.btn-secondary.active {
  background-color: #007bff !important;    
  border-color: #007bff !important;
}
.btn-group-label {
  font-size: 0.75em;
}
.btn-group {
  display: flex;
  justify-content: flex-end;
}

.btn-submit {
  min-height: 40px;
  min-width: 76px;
}

.flex {
  display: flex;
}

.url-prefix {
  background-color: lightgrey;
  display: flex;
  align-items: center;
  padding: 0px 10px;
}

.prefixed {
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
}

.warning {
  color: red;
}


.LoaderBalls {
  width: 45px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.LoaderBalls__item {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #00f1ca;
}
.LoaderBalls__item:nth-child(1) {
  animation: bouncing 0.4s alternate infinite cubic-bezier(0.6, 0.05, 0.15, 0.95);
}
.LoaderBalls__item:nth-child(2) {
  animation: bouncing 0.4s 0.1s alternate infinite cubic-bezier(0.6, 0.05, 0.15, 0.95) backwards;
}
.LoaderBalls__item:nth-child(3) {
  animation: bouncing 0.4s 0.2s alternate infinite cubic-bezier(0.6, 0.05, 0.15, 0.95) backwards;
}

@keyframes bouncing {
  0% {
    transform: translate3d(0, 8px, 0) scale(1.2, 0.85);
  }
  100% {
    transform: translate3d(0, -5px, 0) scale(0.9, 1.1);
  }
}
</style>