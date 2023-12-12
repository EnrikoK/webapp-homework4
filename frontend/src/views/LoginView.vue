<template>
<div>
    <h1>Log in here</h1>
    <login-component></login-component>
</div>


</template>
    
<script>
import LoginComponent from "../components/LoginComponent"
export default{
        name:'LoginView',
        components:{
            "login-component":LoginComponent
        }
}
</script>
    
<style scoped>

</style>