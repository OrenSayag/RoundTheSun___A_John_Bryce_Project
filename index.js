require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
const { siteViewsIncrement } = require('./toolFunctions')
const app = express()
// const cors = require('cors')
const port = 80


// oooooooooooo ooooo     ooo ooooo      ooo   .oooooo.   ooooooooooooo ooooo   .oooooo.   ooooo      ooo  .oooooo..o 
// `888'     `8 `888'     `8' `888b.     `8'  d8P'  `Y8b  8'   888   `8 `888'  d8P'  `Y8b  `888b.     `8' d8P'    `Y8 
//  888          888       8   8 `88b.    8  888               888       888  888      888  8 `88b.    8  Y88bo.      
//  888oooo8     888       8   8   `88b.  8  888               888       888  888      888  8   `88b.  8   `"Y8888o.  
//  888    "     888       8   8     `88b.8  888               888       888  888      888  8     `88b.8       `"Y88b 
//  888          `88.    .8'   8       `888  `88b    ooo       888       888  `88b    d88'  8       `888  oo     .d8P 
// o888o           `YbodP'    o8o        `8   `Y8bood8P'      o888o     o888o  `Y8bood8P'  o8o        `8  8""88888P'  
const verifyUser = (req,res,next) => {
    const payload = jwt.verify(req.headers.authorization, process.env.TOKEN_SECRET)
    if(!payload){
        return res.status(401).send({fail:"Invalid token"})
    }
    req.userInfo = payload.userInfo
    next()
}
const verifyAdmin = (req,res,next) => {
    const payload = jwt.verify(req.headers.authorization, process.env.TOKEN_SECRET)
    if(!payload){
        return res.status(401).send({fail:"Invalid token"})
    }
    let userInfo=payload.userInfo
    if(userInfo.type!=='admin'){
        return res.status(401).send({fail:"you're not an admin"})
    }
    req.userInfo = userInfo
    next()
}


// ooo        ooooo ooooo oooooooooo.   oooooooooo.   ooooo        oooooooooooo oooooo   oooooo     oooo       .o.       ooooooooo.   oooooooooooo 
// `88.       .888' `888' `888'   `Y8b  `888'   `Y8b  `888'        `888'     `8  `888.    `888.     .8'       .888.      `888   `Y88. `888'     `8 
//  888b     d'888   888   888      888  888      888  888          888           `888.   .8888.   .8'       .8"888.      888   .d88'  888         
//  8 Y88. .P  888   888   888      888  888      888  888          888oooo8       `888  .8'`888. .8'       .8' `888.     888ooo88P'   888oooo8    
//  8  `888'   888   888   888      888  888      888  888          888    "        `888.8'  `888.8'       .88ooo8888.    888`88b.     888    "    
//  8    Y     888   888   888     d88'  888     d88'  888       o  888       o      `888'    `888'       .8'     `888.   888  `88b.   888       o 
// o8o        o888o o888o o888bood8P'   o888bood8P'   o888ooooood8 o888ooooood8       `8'      `8'       o88o     o8888o o888o  o888o o888ooooood8 
// app.use(cors())
app.use(express.json())



// ooooooooo.     .oooooo.   ooooo     ooo ooooooooooooo oooooooooooo  .oooooo..o 
// `888   `Y88.  d8P'  `Y8b  `888'     `8' 8'   888   `8 `888'     `8 d8P'    `Y8 
//  888   .d88' 888      888  888       8       888       888         Y88bo.      
//  888ooo88P'  888      888  888       8       888       888oooo8     `"Y8888o.  
//  888`88b.    888      888  888       8       888       888    "         `"Y88b 
//  888  `88b.  `88b    d88'  `88.    .8'       888       888       o oo     .d8P 
// o888o  o888o  `Y8bood8P'     `YbodP'        o888o     o888ooooood8 8""88888P'                                           
// app.get('/', function (req, res) {
    //     res.send('Hello World')
    // })
    //define static folder
    app.use("/", express.static(__dirname + "/build"))
    
    app.use('/api/auth', require('./routes/auth'))
    app.use('/api/profile', verifyUser ,require('./routes/profile'))
    app.use('/api/controlPanel', verifyAdmin, require('./routes/controlPanel'))
    app.use('/api/inbox', require('./routes/inbox'))
    app.use('/api/explore', require('./routes/explore'))
    app.use('/api/location', verifyUser ,require('./routes/location'))
    app.use('/api/vacation', verifyUser ,require('./routes/vacation'))
    app.use('/api/club', verifyUser ,require('./routes/club'))
    app.use('/api/pay', verifyUser ,require('./routes/pay'))
    app.use('/api/blog' ,require('./routes/blog'))
    app.get('/api/newToken', verifyUser, (req, res)=>{
        const userInfo = req.userInfo
        res.status(200).send({userInfo})
    })
    
    // console.log(path.join(__dirname, 'build', 'index.html'))
    
    app.get("/*", siteViewsIncrement ,(req, res)=>{
        // res.sendFile(path.join(__dirname, 'build', 'index.html'))
        res.sendFile(__dirname + '/build' + '/index.html')
    })
 
app.listen(port, (err)=>{
    if(err){console.log(err)}
    console.log(`Server is running on ${port}`)
})