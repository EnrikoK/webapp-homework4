<template>

<form id="newPostForm">
        <label>Title</label>
        <input type="text" name="title" v-model="title" id="title">
        <label>Write something...</label>
        <textarea v-model="text" id="text"></textarea>
        <button class="submit-button" @click.prevent="addNewPost" >Post</button>
</form>
    <p v-if="error">Can't submit empty form</p>

</template>

<script>
export default{
    data: function() {
        return{
            error:false,
        }
    },
    methods:{
        addNewPost(){

            var payload = {
                title:this.title,
                body:this.text,
            }
            const jwt = this.credentials
            
            console.log(jwt)
            fetch("http://localhost:3000/api/posts",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                credentials:"include",
                body:JSON.stringify(payload),
            }).then((res) =>{
                if(res.ok){
                    this.$router.push("/")
                }else{
                    this.error=true
                }
            }).catch(() => this.error=true);

        }
    }

}
</script>

<style scoped>
form{
    background-color: darkgrey;
    width: 50vw;
    height: 30vh;
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
#text{
    width: 70%;
    height: 70%;
}
</style>