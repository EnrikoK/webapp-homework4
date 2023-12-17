<template>
<div>
    <h1>This is the new post view</h1>
    <new-post-component></new-post-component>  
</div>

</template>

<script>
import NewPostFormComponent from '@/components/NewPostFormComponent.vue';
export default{
    name:"NewPostView",
    components:{
        "new-post-component":NewPostFormComponent
    }
}
</script>

<style>
</style>