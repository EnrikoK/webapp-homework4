export default {
    user: {authenticated:false},
    authenticated: async function(){
        await fetch("http://localhost:3000/api/auth/authenticate",
        {credentials:'include'})
        .then((response)=> response.json())
        .then((data)=>{
            this.user.authenticated = data.authenticated;
        }).catch((err) => {
            console.log(err.message);
        });
        return this.user.authenticated;
    }
}