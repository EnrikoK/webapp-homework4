const express = require('express')
const pool = require('./database');
const app = express()
const port = 3000
const cors = require('cors');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
app.use(cors({origin:'http://localhost:8080', credentials:true}));
app.use(express.json());
app.use(cookieParser());

const secret = "test123";
const maxAge = 60*60;

const generateJWT = (id) => {
    return jwt.sign({ id }, secret, { expiresIn: maxAge });
};


app.post('/api/posts', async(req, res) => {
    //TODO the endpoint needs to be secured
    try {
        console.log("a post request has arrived");
        const post = req.body;
        var posted_on = new Date();
        
        const newpost = await pool.query(
            "INSERT INTO posttable(title, body, isliked, posted_on) values ($1, $2, $3, $4)", [post.title, post.body, false, posted_on]
        );
        res.status(200).send();
    } catch (err) {
        console.error(err.message);
    }
}); 

app.get('/api/posts/all', async(req,res)=>{
    //TODO endpoint needs to be secured
    try{
        const allPosts = await pool.query("SELECT * FROM posttable ORDER BY posted_on;");
        res.json({"posts":allPosts});
    } catch (err){
        res.json({"message":err.message});
    }
})

app.get('/api/posts/:id', async(req,res)=>{
    try{
        const post = await pool.query("SELECT * FROM posttable WHERE id=$1",[req.params['id']])
        if(post.rows.length==1){
            res.json({post});
        }else{
            res.status(404).json({"message":"Post with given id not found","error":true});
        }
    }catch (err){
        res.status(500).json({"message":err.message})
    }

})

//update post endpoint

app.put('/api/posts/:id', async(req,res)=>{
    try{
        if(req.body.body){
            const text = req.body.body;
            const id =req.params.id;
            const post = await pool.query("UPDATE posttable SET body=$1 WHERE id=$2 RETURNING *;",[text,id])
            res.status(200).json(post)

        }else{
            res.status(400)
        }
    }catch(err){
        res.status(500).json(err.message)
    }

})

//delete a post endpoint 

app.delete('/api/posts/:id', async(req,res)=>{
    try{
        await pool.query("DELETE FROM posttable WHERE id=$1;",[req.params.id])
        res.status(200).json({"success":true})
    }catch(err){
        res.status(500);
    }
})

app.delete('/api/posts', async(req,res)=>{
    try{
        await pool.query('DELETE FROM posttable');
        res.status(200).send();
    }catch(err){
        res.status(500).send();
    }
})


//authentication enpoint
app.get('/api/auth/authenticate', async(req,res)=>{
    const token = req.cookies.jwt;
    let authenticated = false;
    try{
        if(token){
            await jwt.verify(token,secret, (err)=>{
                if(err){
                    console.log(err.message);
                    res.send({"authenticated": authenticated});
                }else{
                    authenticated = true;
                    res.send({"authenticated":authenticated});
                }
            })

        }else{
            res.send({"authenticated": authenticated});
        }   
    } catch(error){
        console.log(error.message);
        res.status(400).send(error.message);
    }

})

//signup endpoint
app.post('/api/auth/signup', async(req,res)=>{
    try{
        const { email ,password } = req.body;

        const salt = await bcrypt.genSalt();
        const bcryptPassword = await bcrypt.hash(password, salt);
        const authUser = await pool.query("INSERT INTO userstable(email, password) values ($1, $2) RETURNING *",[email,bcryptPassword]);

        const token = await generateJWT(authUser.rows[0].id);
        //console.log(token);
        res.status(201).cookie('jwt', token, {maxAge : 6000000, httpOnly:true }).json({ user_id: authUser.rows[0].id}).send;

    }catch(error){
        console.log(error.message);
        res.status(400).send(err.message);
    }
});

//sign in endpoint
app.post('/api/auth/login', async(req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        
        const userToAuthenticate = await pool.query("SELECT * FROM userstable WHERE email=$1",[email]) 
        if(userToAuthenticate.rows.length === 0) return res.status(401).json({error: "User is not registered"});

        const validPassword = await bcrypt.compare(password,userToAuthenticate.rows[0].password);
        if(validPassword){
            const token = await generateJWT(userToAuthenticate.rows[0].id);
            res.status(201).cookie('jwt',token, {maxAge: 6000000, httpOnly:true}).json({user_id: userToAuthenticate.rows[0].id, auth:true}).send;
        }else{
            res.status(401).json({auth:false})
        }
    } catch(error){
        res.status(401).json({error:error.message})
    }

})

app.get('/api/auth/logout', (req,res)=>{
    res.status(202).clearCookie('jwt').json({"msg": "cookie cleared"}).send;
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})