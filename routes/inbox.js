const { myQuery } = require('../DB/config')
const jwt = require('jsonwebtoken')
const router = require('express').Router()

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


// ooooooooo.     .oooooo.   ooooo     ooo ooooooooooooo oooooooooooo  .oooooo..o 
// `888   `Y88.  d8P'  `Y8b  `888'     `8' 8'   888   `8 `888'     `8 d8P'    `Y8 
//  888   .d88' 888      888  888       8       888       888         Y88bo.      
//  888ooo88P'  888      888  888       8       888       888oooo8     `"Y8888o.  
//  888`88b.    888      888  888       8       888       888    "         `"Y88b 
//  888  `88b.  `88b    d88'  `88.    .8'       888       888       o oo     .d8P 
// o888o  o888o  `Y8bood8P'     `YbodP'        o888o     o888ooooood8 8""88888P'    
router.get('/', verifyAdmin, async (req, res) => {
    try {
        const inbox = await myQuery(`SELECT messages.*, users.user_name, users.img_src AS user_pic ,img_src FROM messages INNER JOIN users
        ON messages.user_id = users.id
        ORDER BY date_time;`)
        const conversations = {}
        for (const message of inbox) {
            const userName = message.user_name
            if(!conversations[userName]){
                conversations[userName] = []
            }
            conversations[userName].push(message)
        }
        res.send({conversations})
        
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
})

router.get('/conversation/:userName', verifyAdmin, async (req, res) => {
    const userName = req.params.userName
    try {

        const conversation = await myQuery(`SELECT messages.*, users.user_name, users.img_src AS user_pic ,img_src FROM messages INNER JOIN users
        ON messages.user_id = users.id
        WHERE user_name='${userName}'
        ORDER BY date_time DESC;`)
        // const conversation = {}
        // for (const message of inbox) {
        //     const userName = message.user_name
        //     if(!conversation[userName]){
        //         conversation[userName] = []
        //     }
        //     conversation[userName].push(message)
        // }
        const conversartionUserInfo = await myQuery(`
        SELECT id, user_name, mail, f_name, l_name, img_src FROM users WHERE user_name='${userName}'
        `)
        res.send({conversation, conversartionUserInfo: conversartionUserInfo[0]})
        
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
})

router.get('/user/conversation', verifyUser ,async (req, res) => {
    const {id} = req.userInfo
    try {

        const conversation = await myQuery(`SELECT messages.*, users.user_name, users.img_src AS user_pic ,img_src FROM messages INNER JOIN users
        ON messages.user_id = users.id
        WHERE user_id=${id}
        ORDER BY date_time;`)
        // const conversation = {}
        // for (const message of inbox) {
        //     const userName = message.user_name
        //     if(!conversation[userName]){
        //         conversation[userName] = []
        //     }
        //     conversation[userName].push(message)
        // }
        const conversartionUserInfo = await myQuery(`
        SELECT id, user_name, mail, f_name, l_name, img_src FROM users WHERE id=${id}
        `)
        res.send({conversation, conversartionUserInfo: conversartionUserInfo[0]})
        
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
})



router.post('/message', verifyUser ,async (req, res)=>{
    const userInfo = req.userInfo
    console.log(userInfo)
    if(userInfo.type==='admin'){
        return res.status(400).send({fail:'non admins only'})
    }
    const {text} = req.body
    if(!text){
        return res.status(400).send({fail:'missing text'})
    }
    try {
        await myQuery(`INSERT INTO messages (text, user_id, type) VALUES ("${text}", '${userInfo.id}', 'fromuser')`)
        return res.sendStatus(200)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
})

router.post('/reply', verifyAdmin ,async (req, res)=>{
    const {text, userId} = req.body
    if(!text || !userId){
        return res.status(400).send({fail:'missing text or userId'})
    }
    try {
        await myQuery(`INSERT INTO messages (text, user_id, type) VALUES ('${text}', '${userId}', 'touser')`)
        return res.sendStatus(200)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
})



module.exports = router;