<template>
    <div>
        <h2>Create an account here!</h2>   
        <signup-component></signup-component>
    </div>
    
    
    </template>
    
    <script>
    import SingupComponent from "../components/SignupComponent.vue"
    export default{
        name:'SignupView',
        components:{
            'signup-component':SingupComponent,
        }
    }
    </script>
    
<style scoped>
</style>