const express=require('express')
// npm install express jsonwebtoken    => it will install the jwt dependencies
const jwt=require('jsonwebtoken')
const app=express()

//routes
app.get('/api',(req,res)=>{
    res.json({
        message:"hello world!!!!!!!!!!!!!!!!!!!!!!"
    })
})

//post request
app.post('/api/posts',verifyToken,(req,res)=>{
    jwt.verify(req.token,'secretkey',(err,authData)=>{
        if(err){
            res.sendStatus(403)
            
        }
        else{
            res.json({
                message:'helloo sagar........!!!!!!!!!!!!',
                authData
            })
        }
        })
   
})


app.post('/api/login',(req,res)=>{

    //payload
    const user={
        id:1,
        username:'brad',
        email:'brad@gmail.com'
    }
    //create a jwt 

//const token=jwt.sign(payload,secretkey,{expiresIn: '1hr'});

    jwt.sign({user},'secretkey',{expiresIn:'30s'},(err,token)=>{
        res.json({
            token
        })
    })

})


//verify the token 
function verifyToken(req,res,next){
    //get auth header value
    const bearerHeader=req.headers['authorization'];
    if(typeof bearerHeader!=='undefined'){
        // split at the space
        const bearer=bearerHeader.split(' ');
        // get token from array
        const bearerToken=bearer[1]
        req.token=bearerToken
        next();

    }
    else{
        res.sendStatus(403)
    }

}


app.listen(3000,()=>{
    console.log("sever running at port 3000");
})




