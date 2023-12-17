<template>
<div v-if="post">
    <div v-if="edit">
        <form>
            <h3> {{ this.post.title }} </h3>
            <p> {{ this.post.posted_on }} </p>
            <textarea class="post-edit" v-model="newEdit"></textarea>
            <div class="button-container">
                <button class="submit-button"  @click="saveChanges(this.post.id)">Save</button>
                <button class="submit-button"  @click="deletePost(this.post.id)">Delete Post</button>                
            </div>
        </form>


    </div>
    <div class="post-view" v-else >
        <h3> {{ this.post.title }} </h3>
        <p> {{ this.post.posted_on }}</p>
        <p class="post-content"> {{ this.post.body }} </p>
        <div class="button-container">
            <button class="submit-button"  @click="setEditMode">Edit</button>
            <button class="submit-button"  @click="deletePost(this.post.id)">Delete Post</button> 
        </div>

    </div>
</div>

</template>

<script>
export default{
    data:function(){
        return{
            post:null,
            edit:false,
            newEdit:''
        }
    },
    mounted(){
        this.getPostWithId(this.$router.currentRoute._value.params.id);
    },
    methods:{
        getPostWithId(id){
            fetch("http://localhost:3000/api/posts/"+id).then((res) => res.json()).then((json) => {
                this.post=json.post.rows[0];
            
            })
        },
        setEditMode(){
            this.edit = true;
            this.newEdit=this.post.body
        },
        saveChanges(id){
            var payload = {
                body:this.newEdit
            }
            fetch("http://localhost:3000/api/posts/"+id,{
                method:"PUT",
                headers:{"Content-Type":"application/json"},
                credentials:"include",
                body:JSON.stringify(payload)
            }).then((res) => res.json()).then((json) =>{
                this.post = json.post;
                this.edit = false;
            })
        },
        deletePost(id){
            fetch("http://localhost:3000/api/posts/"+id,{
                method:"DELETE",
                credentials:"include",
            }).then((res) => res.json()).then((json) =>{
                if(json.success){
                    this.$router.push("/");
                }
            })
        }
    }

}
</script>

<style scoped>
.post-edit{
    width: 80%;
    padding: 0.5em;
    min-height: 200px;
    border-radius: 5px;
    height: max-content;
    text-align: left;
    resize: none;
    font-size: large;
}
.post-content{
    background-color: white;
    width: 80%;
    padding: 0.5em;
    border-radius: 5px;
    text-align: left;
    overflow-wrap: break-word;
}
.button-container{
    display: flex;
    justify-content: center;
}
.post-view{
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
form {
    background-color: darkgrey;
    width: 60vw;
    height: 40vh;
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