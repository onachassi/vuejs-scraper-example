<template>
	<div class="portlet response">
		<div class="text-left">
			<template v-if="title">
				<h4>Title</h4>
				<p>{{title}}</p>
			</template>
			<template v-if="title">
				<h4>Body</h4>
				<p>{{body}}</p>
			</template>
			<template v-if="error">
				<h4>Error</h4>
				<p>{{error}}</p>
			</template>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {

  name: 'ScraperResponse',

  data () {
    return {

    }
  },
  computed: {
  	...mapState(['scraper']),
  	title(){
  		if (this.scraper.outputs.title) {
  			return this.scraper.outputs.title
  		}
  	},
  	body(){
  		if (this.scraper.outputs.body) {
  			return this.scraper.outputs.body
  		}
  	},
  	error(){
  		if (this.scraper.outputs.error) {
  			return this.scraper.outputs.error
  		}
  	}
  }
}
</script>

<style lang="css" scoped>
.response {
	padding: 10px;
}

.text-left {
	text-align: left;
}
</style>