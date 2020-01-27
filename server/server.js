console.log("app is loading");
const express = require("express"),
  PORT = 8080;
const app = express();
const utils = require('./auth_utils')
const jwtVerifier = require('express-jwt')

// -- json in body
app.use(express.json());

const user = { email: "natankrasney@gmail.com", password: "123sae" };

app.post("/users/login", (req, res) => {
    console.log('access /users/login');

    if(utils.authenticationIsOk(req,user)){
        res.send(utils.createToken(user))
    }
    else{
        res.sendStatus(401);
    }
});

app.get('/users/meetings' , jwtVerifier({secret:utils.secret}) ,(req,res) =>{
    console.log('access /users/meetings');
    
    console.log(req.user);

    res.send(`Welcome logged in user . This is meetings . I got this email from jwt : ${req.user.userID}`);
})

app.listen(PORT, () => console.log(`app is listening on port : ${PORT}`));
