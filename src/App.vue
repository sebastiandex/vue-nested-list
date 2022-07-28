<template>
  <DocumentsComponent/>
</template>

<script>
import DocumentsComponent from './components/Documents.vue'

export default {
  name: 'App',
  components: {
    DocumentsComponent
  }
}
</script>

<style>
@font-face {
  font-family: "FiraSans";
  font-display: auto;
  src: local("FiraSans"),
    url("fonts/FiraSans/Firasansbold.woff2");
;
}
#app {
  margin: 30px;
  font-family: "FiraSans",serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
