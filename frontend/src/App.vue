<template>
  <header-component/>
  <RouterView class="content-area"></RouterView>
  <footer-component></footer-component>
</template>
  
<script>
import FooterComponent from './components/FooterComponent.vue';
import HeaderComponent from './components/HeaderComponent.vue';
  
  export default {
    name: 'App',
    components: {
    'header-component':HeaderComponent,
    'footer-component':FooterComponent,  
  },
  computed: {
    posts() {
      return this.$store.state.posts;
    }
  }
  
}
</script>
  
  <style>
  *{
    margin: 0;
    padding: 0;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 0;
  }
  ul{
    list-style: none;
    display: flex;
    justify-content: space-around;
    width: 75%;
  }
  nav{
    display: flex;
    background-color:#2c3e50;
    height: 10vh;
    padding: 0.5em ;
    align-items: center;  
  }
  .router-text{
    color: whitesmoke;
    font-size: 1.5em;
  }
  .content-area{
    min-height: 70vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  </style>
  