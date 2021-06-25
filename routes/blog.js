const router = require('express').Router()
const jwt = require('jsonwebtoken')
const { myQuery } = require('../DB/config')

// oooooooooooo ooooo     ooo ooooo      ooo   .oooooo.   ooooooooooooo ooooo   .oooooo.   ooooo      ooo  .oooooo..o 
// `888'     `8 `888'     `8' `888b.     `8'  d8P'  `Y8b  8'   888   `8 `888'  d8P'  `Y8b  `888b.     `8' d8P'    `Y8 
//  888          888       8   8 `88b.    8  888               888       888  888      888  8 `88b.    8  Y88bo.      
//  888oooo8     888       8   8   `88b.  8  888               888       888  888      888  8   `88b.  8   `"Y8888o.  
//  888    "     888       8   8     `88b.8  888               888       888  888      888  8     `88b.8       `"Y88b 
//  888          `88.    .8'   8       `888  `88b    ooo       888       888  `88b    d88'  8       `888  oo     .d8P 
// o888o           `YbodP'    o8o        `8   `Y8bood8P'      o888o     o888o  `Y8bood8P'  o8o        `8  8""88888P'  



// ooo        ooooo ooooo oooooooooo.   oooooooooo.   ooooo        oooooooooooo oooooo   oooooo     oooo       .o.       ooooooooo.   oooooooooooo 
// `88.       .888' `888' `888'   `Y8b  `888'   `Y8b  `888'        `888'     `8  `888.    `888.     .8'       .888.      `888   `Y88. `888'     `8 
//  888b     d'888   888   888      888  888      888  888          888           `888.   .8888.   .8'       .8"888.      888   .d88'  888         
//  8 Y88. .P  888   888   888      888  888      888  888          888oooo8       `888  .8'`888. .8'       .8' `888.     888ooo88P'   888oooo8    
//  8  `888'   888   888   888      888  888      888  888          888    "        `888.8'  `888.8'       .88ooo8888.    888`88b.     888    "    
//  8    Y     888   888   888     d88'  888     d88'  888       o  888       o      `888'    `888'       .8'     `888.   888  `88b.   888       o 
// o8o        o888o o888o o888bood8P'   o888bood8P'   o888ooooood8 o888ooooood8       `8'      `8'       o88o     o8888o o888o  o888o o888ooooood8 
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

router.post('/post', verifyAdmin ,async (req, res) => {
    const {text, title} = req.body
    if(!text || !title){
        return res.status(400).send({fail: "Missing some info"})
    }
    try {
        await myQuery(`
        INSERT INTO blog_posts(text, title, date)
        VALUES ("${text}", "${title}", NOW())
        `)
        return res.sendStatus(200)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }

})

router.delete('/post', verifyAdmin ,async (req, res) => {
    const {id} = req.body
    if(!id){
        return res.status(400).send({fail: "missing id"})
    }
    try {
        const post = await myQuery(`
        SELECT * FROM blog_posts
        WHERE id=${id}
        `)
        if(post.length===0){
            return res.status(400).send({fail:"no such post"})
        }
        await myQuery(`
        DELETE FROM blog_posts
        WHERE id=${id}
        `)
        return res.sendStatus(200)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
})

router.put('/post', verifyAdmin ,async (req, res) => {
    const {id, text, title} = req.body
    if(!id || (!text && !title)){
        return res.status(400).send({fail: "missing text || title || id"})
    }
    try {
        const post = await myQuery(`
        SELECT * FROM blog_posts
        WHERE id=${id}
        `)
        if(post.length===0){
            return res.status(400).send({fail:"no such post"})
        }
        if(text){
            await myQuery(`
            UPDATE blog_posts
            SET text="${text}"
            WHERE id=${id}
            `)
        }
        if(title){
            await myQuery(`
            UPDATE blog_posts
            SET title="${title}"
            WHERE id=${id}
            `)
        }
        return res.sendStatus(200)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
})

router.get('/:id' ,async (req, res) => {
    const {id} = req.params
    if(!id){
        return res.status(400).send({fail: "missing text || title || id"})
    }
    try {
        const post = await myQuery(`
        SELECT * FROM blog_posts
        WHERE id=${id}
        `)
        if(post.length===0){
            return res.status(400).send({fail:"no such post"})
        }
        return res.status(200).send({post:post[0]})
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
})

router.get('/' ,async (req, res) => {
    try {
        const allPosts = await myQuery(`
        SELECT * FROM blog_posts
        ORDER BY date DESC
        `)
        if(allPosts.length===0){
            return res.status(400).send({fail:"no posts"})
        }
        return res.status(200).send({allPosts})
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
})

module.exports = router