import { createRouter, createWebHistory } from 'vue-router';
import HomeView from "../views/HomeView";
import LoginView from "../views/LoginView";
import SignupView from "../views/SignupView";
import auth from "../auth";

const routes = [
    {path: '/',name: 'home', component: HomeView, beforeEnter: async(to, from, next)=>{
        let authResult = await auth.authenticated();
        if(!authResult){
            next('/login')
        }else{
            next();
        }
    }},
    {path: '/login', name:'login', component: LoginView},
    {path: '/signup', name:'signup', component: SignupView}
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router