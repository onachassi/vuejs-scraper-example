<template>
	<div>
		<nav class="navbar navbar-expand-md navbar-light bg-light">
		  <a class="navbar-brand" href="#">Vue-Lambda Site Scraper</a>
		  <button @click="handleOpenMobile" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
		    <span class="navbar-toggler-icon"></span>
		  </button>

		  <div :class="[this.openMobile ? 'collapse navbar-collapse show' : 'collapse navbar-collapse']" id="navbarSupportedContent">
		    <ul class="navbar-nav mr-auto">
		      <li :class="[this.dropdown == 'code' ? 'nav-item dropdown show' : 'nav-item dropdown']" v-click-outside="handleDropdown">
		        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" @click="handleDropdown('code')">
		          Code
		        </a>
		        <div :class="[this.dropdown == 'code' ? 'dropdown-menu show' : 'dropdown-menu']" aria-labelledby="navbarDropdown" >
		          <a class="dropdown-item">Front End (vue)</a>
		          <a class="dropdown-item">Back End (scala)</a>
		        </div>
		      </li>
		    </ul>
		  </div>
		</nav>
	</div>
</template>

<script>
export default {

  name: 'nav-bar',

  data () {
    return {
    	openMobile: false,
    	dropdown: null
    }
  },
  methods: {
  	handleDropdown(selected = null){
  		if (typeof selected != 'string' || selected == this.dropdown) {
  			this.dropdown = null
  		} else {
  			this.dropdown = selected
  		}
  	},
  	handleOpenMobile(){
  		this.openMobile = !this.openMobile
  	}
  }
}
</script>

<style lang="css" scoped>
</style>