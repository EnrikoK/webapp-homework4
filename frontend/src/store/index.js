import { createStore } from 'vuex'

import { ref } from 'vue'

const store = createStore({
    state:{
        tervitus:"Tere tere vana kere :3",
        posts: ref([
            {id: 0, user:"Smilla", date:"01.11.2023", text: "this is my first post ever. very excited. Attack feet behind the couch destroy couch flop over give attitude hide when guests come over hopped up on goofballs hunt anything that moves chew ipad power cord   claw drapes, ", image: "../images/kass2.png", likes: 0, isLiked:false},
            {id: 1, user:"Ivo Schenkenberg", date:"02.11.2023", text: "this is my first post ever. very excited.", image: "../images/photo2.jpg", likes: 3, isLiked:false},
            {id: 2, user:"Lance Lancelot", date:"03.11.2023", text: "this is my first post ever. very excited.", image: null, likes: 6, isLiked:false},
            {id: 3, user:"Praksi Juhendaja", date:"03.11.2023", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce non est pharetra ante faucibus iaculis aliquam non risus. Mauris id laoreet enim. Interdum et malesuada fames ac ante ipsum primis in faucibus. Duis volutpat massa imperdiet dolor dignissim aliquam eget in felis. Donec urna lorem, vulputate vestibulum massa sed, ultrices hendrerit eros. Pellentesque vitae lacus ut elit facilisis malesuada eu tempus dui. Mauris ornare non turpis a euismod. Cras sit amet finibus lectus, ac imperdiet est. Duis accumsan mi vel laoreet viverra. Cras gravida, tortor a sagittis pellentesque, justo leo pulvinar dolor, eget facilisis quam odio eget quam. Proin at sem maximus, facilisis elit et, volutpat erat.", image: null, likes: 999, isLiked:true},
            {id: 4, user:"Smilla", date:"03.11.2023", text: "felt cute, might delete later", image:"../images/photo1.jpg", likes: 41, isLiked:false},
            {id: 5, user:"Lance Lancelot", date:"03.11.2023", text: "this is my first post ever. very excited.", image: null, likes: 6, isLiked:false},
            {id: 6, user:"Hans von Risbieter", date:"03.11.2023", text: "Agnes, please contact me ASAP...", image: null, likes: 0, isLiked:false,},
            {id: 7, user:"Gabriel (vaba mees)", date:"03.10.2023", text: "Iga mees on oma saatuse sepp, ja oma õnne valaja!!", image: null, likes: 6, isLiked:false},
            {id: 8, user:"Lance Lancelot", date:"03.11.2023", text: "this is my first post ever. very excited.", image: null, likes: 6, isLiked:false},
            {id: 9, user:"Vue Js", date:"03.11.2023", text: null, image: "../images/logo.png", likes: 1, isLiked:true},
            {id: 10, user:"Lance Lancelot", date:"03.11.2023", text: "this is my first post ever. very excited.", image: null, likes: 6, isLiked:false},

        ])
    },
    mutations:{
        resetLikes:(state) => {
            state.posts.forEach(post => {
                post.likes = 0;
                post.isLiked=false;
            });
    },
    likePost:(state,id) => {
        let post = state.posts.find(post => post.id==id)
        if(!post.isLiked){
            post.likes++;
            post.isLiked=true;
        }else if(post.isLiked){
            post.likes--;
            post.isLiked=false;
        }
        
    }
    },
    getters: {
        getPostById: (state) => (id) => {
            return state.posts.find((post) => post.id === id);
          },
    },
    actions:{
        likePostAction: (act, index) => {
            act.commit('likePost',index);
        }
    }
});

export default store