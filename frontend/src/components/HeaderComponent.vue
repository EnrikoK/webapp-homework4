<template>
    <header>
      <nav>
      <ul>
          <li>
            <RouterLink class="router-text" to="/">Home</RouterLink>
          </li>
          <li>
            <RouterLink class="router-text" to="/about">Contacts</RouterLink>
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