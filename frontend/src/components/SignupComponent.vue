<template>
    <form @submit.prevent="validateInputs">
        <div>
            <label>Email:</label>
            <input type="email" v-model="emailInp" name="email" placeholder="email">   
        </div>
        <div>
            <label>Password:</label>
            <input type="password" v-model="passwordInp" name="password" placeholder="password">  
        </div>
        <input type="submit" value="Create account" class="submit-button">
    </form>
    <p class="error-tooltip" v-if="isError">{{ errorMsg }}</p>
</template>

<script>
export default{
    name:"SignupComponent",
    data(){
        return{
            isError:false,
            errorMsg:""
        }
    },
    methods:{
    validateInputs(){
        
        if(this.passwordInp.length < 8 || this.passwordInp.length > 15){
            this.isError=true;
            this.errorMsg="Password must be less than 15 and more than 8 characters long";
            return
        }else if(!this.passwordInp.includes("_")){
            this.isError=true;
            this.errorMsg="Password must contain the character: _ ";
            return
        }else if(this.passwordInp == this.passwordInp.toLowerCase() ){
            this.isError=true;
            this.errorMsg="Password must contain at least one uppercase letter";
            return
        }else if(this.passwordInp.charAt(0) != this.passwordInp.toUpperCase().charAt(0)){
            this.isError=true;
            this.errorMsg="The first letter of the password must be uppercase";
            return
        }
        //checking lowercase and numeric values in password via regex
        let lowercase = /[a-z].*[a-z]/;
        let numeric = /[1-9]+/;
        if(!lowercase.test(this.passwordInp)){
            this.isError=true;
            this.errorMsg= "Password must contain at least two lowercase letters"
            return
        }
        if(!numeric.test(this.passwordInp)){
            this.isError=true;
            this.errorMsg="Password must contain at least one digit";
            return
        }
        this.isError=false;
        this.$router.push("/");
    }      
   } 
}
</script>

<style scoped>
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
.error-tooltip{
    background-color: rgb(222, 98, 98);
    padding: 1em;
    margin: 0.5em;
    font-size:1.5em;
    border-radius: 5px;
}
</style>