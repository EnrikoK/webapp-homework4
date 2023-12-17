<template>
    <h1>Homepage</h1>
    <button @click="logut" class="submit-button">Logout</button>
    <post-component class="post-area"></post-component>
    <div>
      <button @click="newPost" class="submit-button">New Post</button>
      <button @click="deleteall" class="submit-button">Deleta All posts</button>      
    </div>

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
          authResult: auth.authenticated()
        }
    },
      methods: {
        newPost: function(){
          this.$router.push("/posts/new")
        },
        logut: function(){
              fetch("http://localhost:3000/api/auth/logout",{
                credentials:'include',
              }).then(this.$router.push("/login"))
            }
        ,
        deleteall: function(){
          fetch("http://localhost:3000/api/posts",{
            method:"DELETE",
            credentials:"include"
          }).then(()=> window.location.reload())
        }
      }
    }
    
</script>
    
<style>
    h1 {
      margin-bottom: 2em;
    }
    .post-area{
      min-height: 50vh;
    }
    .submit-button{
    font-size: large;
    padding: 0.75em;

    }
    .submit-button:hover{
        background-color:#2c3e50;
        color: whitesmoke;
        transition: 0.3s;
    }
</style>