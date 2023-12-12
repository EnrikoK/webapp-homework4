<template>
    <header>
      <nav>
      <ul>
          <li>
            <RouterLink class="router-text" to="/">Home</RouterLink>
          </li>
          <li>
            <RouterLink class="router-text" to="/login">Login</RouterLink>
          </li>
          <li>
            <RouterLink class="router-text" to="/signup">Sign up</RouterLink>
          </li>
        </ul>
      </nav>  
    </header>
</template>
  
<script>

export default{
  data: function(){
    return{
    }
  },
}
   

</script>

<style>
header{
  margin-bottom: 2em;
}
</style>