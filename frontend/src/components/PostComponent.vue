<template>
    <div class="posts-container">
        <div class="content" v-for="post in getPosts" :key="post.id">
            <div class="post-header">
                <h4 class="username">{{post.user}}</h4>
                <p class="date">{{post.date}}</p>
            </div>
            <div class="post-body">
                <p v-if="post.text!=null">{{ post.text }}</p>
                <img v-if="post.image!=null" :src="post.image">
               
            </div>
            <div class="feedback-bar">
                <button @click="likePost(post.id)" :style="post.isLiked?'background-color:green':'' "><img src="../assets/like.png"></button>
                <p class="likeCount">{{post.likes}} likes</p>
            </div>

        </div>
    </div>
</template>

<script>
export default {
    computed: {
            getPosts() {
                return this.$store.state.posts
            }
    },
    methods:{
        likePost(id){
            this.$store.dispatch('likePostAction',id);
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
.post-body p {
    text-align: left;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
}
</style>