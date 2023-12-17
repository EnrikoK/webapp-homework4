<template>
    <div class="posts-container">
        <div class="content" v-for="post in this.posts" :key="post.id" >
            <RouterLink :to="{name:'postDetails',params:{id:post.id}}" class="no-decoration">
                <div class="post-header">
                    <h4 class="username">{{post.title}}</h4>
                    <p class="date">{{post.posted_on}}</p>
                </div>
                <div class="post-body">
                    <p v-if="post.body!=null">{{ post.body }}</p>    
                </div> 
            </RouterLink>
        </div>
    </div>
</template>

<script>
export default {
    data: function(){
        return{
           posts:null
        }
    },
    mounted(){
        this.getPosts()
    },
    methods:{
        likePost(id){
            this.$store.dispatch('likePostAction',id);
        },
        getPosts(){
            fetch("http://localhost:3000/api/posts/all").then((res) => res.json()).then((json) => {
                
                this.posts=json.posts.rows
                console.log(this.posts)
            })
        }
    }
};
</script>

<style scoped>
.content {
    background-color: lightgrey;
    border-radius: 10px;
    padding: 1em;
    margin: 1em ;
    display: flex;
    flex-direction: column;
    max-width: 60vw;
    width: 60vw;
}
.posts-container{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.date {
    float: right;
    margin-right: 2em;
}

.username {
    float: left;
    margin-left: 1em;
}

h3 {
    text-align: justify;
    padding: 2em 1em;
}

.likeCount {
    text-align: left;
    margin-left: 1em;
}
img{
    max-width: 100%;
    max-height: 100%;
}
button{
    background: none;
}
.feedback-bar{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.post-body {
    text-align: left;
    margin: 1.5em;
    padding: 0.5em;
}
.no-decoration{
    text-decoration: none;
    color: black;
    
}
</style>