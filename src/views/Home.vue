<template>
  <div class="home">
    <div class="logo-row">
      <img class="logo" alt="Vue logo" src="../assets/logo.png" height="175" width="175">
      <template v-if="this.backend == 'scala'">
        <img class="logo" alt="Scala logo" src="../assets/scala-spiral.png" height="175" width="105">
      </template>
      <template v-if="this.backend == 'csharp'">
        <img class="logo" alt="C# logo" src="../assets/Csharp_Logo.png" height="175" width="150">
      </template>
    </div>
    <div class="about">
      <p>Simple web scraper built to explore ApiGateway and Lambda Functions. This site is developed using Serverless Framework to create Lambda functions written in Scala triggered through ApiGateway, and the front end is Vuejs and Bootstrap for styling.</p>
    </div>
    <div class="container">
      <div class="portlet">
        <div class="form form-control">
          <UrlForm />
        </div>
        <div class="response-container">
          <ScraperResponse />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import UrlForm from '@/components/utils/UrlForm.vue'
import ScraperResponse from '@/components/utils/ScraperResponse.vue'


export default {
  name: 'home',
  components: {
    UrlForm,
    ScraperResponse
  },
  computed: {
    ...mapState({
      backend: state => state.scraper.inputs.backend
    })
  }
}
</script>
<style lang="css">
.about {
  padding: 0px 20px;
}
.logo {
  margin: 0px 20px;
}
.logo-row {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 10px;
  margin-bottom: 10px;
}

</style>
