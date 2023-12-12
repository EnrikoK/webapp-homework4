<template>
    <form>
        <label>email:</label>
        <input type="email" required v-model="email">
        <label>password:</label>
        <input type="password" required v-model="password">
        <button @click.prevent="login">Submit</button>
        <RouterLink to="/signup">Don't have an account? Click here to sign up!</RouterLink>
    </form>
    <p class="login-error" v-if="loginError">Invalid login, please try again</p>
</template>
    
<script>
    
export default{
    name:'LoginComponent',
        
    data: function(){
        return{
            email:'',
            password:'',
            loginError:false,
        }
    },
    methods:{
        login(){
            var data ={
                email: this.email,
                password: this.password,   
            };
            fetch("http://localhost:3000/api/auth/login",{
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    credentials:'include',
                    body: JSON.stringify(data),
                }).then((resp) => resp.json())
                .then((json) =>{
                if(!json.auth){
                    this.loginError=true;
                }else{
                    console.log(json)
                    location.assign("/");   
                }   
            } ).catch((err) => console.log(err.message))
        }
    }
    
}
</script>

<style >
form{
    background-color: darkgrey;
    width: 30vw;
    height: 25vh;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    padding: 1em;
}

form>div>input{
    font-size: large;
    height: 2em;
    width: 50%;
}
form>div{
    font-size: medium;
    width: 100%;
    display: flex;
}
label{
    font-size: 1.5em;
    width: 50%;
    
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
.login-error{
    background-color: rgb(222, 98, 98);
    padding: 1em;
    margin: 0.5em;
    font-size:1.5em;
    border-radius: 5px;
}

</style>