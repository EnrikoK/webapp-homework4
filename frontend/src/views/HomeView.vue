<template>
    <h1>Homepage</h1>
    <button @click="logut">Logout</button>
    <post-component></post-component>
    <button id='resetLikes' @click="resetLikes">Reset Likes</button>
</template>
    
<script>
    import auth from "@/auth";
    import PostComponent from "../components/PostComponent.vue"
    export default {
      name: 'HomeView',
      components: {
        "post-component": PostComponent,
      },
      data: function(){
        return{
          posts:[ ],
          authResult: auth.authenticated()
        }
    },
      methods: {
            resetLikes: function(){
                this.$store.commit('resetLikes')
            },
            logut: function(){
              fetch("http://localhost:3000/api/auth/logout",{
                credentials:'include',
              }).then(this.$router.push("/login"))
            }
        },
        mounted(){
          //fetch the posts here
        }
    }
    
</script>
    
<style>
    h1 {
      margin-bottom: 2em;
    }
</style>