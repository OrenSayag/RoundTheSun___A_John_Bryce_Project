const { myQuery } = require("../DB/config");
const router = require("express").Router();

// oooooooooooo ooooo     ooo ooooo      ooo   .oooooo.   ooooooooooooo ooooo   .oooooo.   ooooo      ooo  .oooooo..o 
// `888'     `8 `888'     `8' `888b.     `8'  d8P'  `Y8b  8'   888   `8 `888'  d8P'  `Y8b  `888b.     `8' d8P'    `Y8 
//  888          888       8   8 `88b.    8  888               888       888  888      888  8 `88b.    8  Y88bo.      
//  888oooo8     888       8   8   `88b.  8  888               888       888  888      888  8   `88b.  8   `"Y8888o.  
//  888    "     888       8   8     `88b.8  888               888       888  888      888  8     `88b.8       `"Y88b 
//  888          `88.    .8'   8       `888  `88b    ooo       888       888  `88b    d88'  8       `888  oo     .d8P 
// o888o           `YbodP'    o8o        `8   `Y8bood8P'      o888o     o888o  `Y8bood8P'  o8o        `8  8""88888P'  
const kickAdmin = (req, res, next)=>{
  if(req.userInfo.type==='admin'){
      return res.status(402).send({fail:"no admins allowed here"})
  }
  next()
}

// ooooooooo.     .oooooo.   ooooo     ooo ooooooooooooo oooooooooooo  .oooooo..o
// `888   `Y88.  d8P'  `Y8b  `888'     `8' 8'   888   `8 `888'     `8 d8P'    `Y8
//  888   .d88' 888      888  888       8       888       888         Y88bo.
//  888ooo88P'  888      888  888       8       888       888oooo8     `"Y8888o.
//  888`88b.    888      888  888       8       888       888    "         `"Y88b
//  888  `88b.  `88b    d88'  `88.    .8'       888       888       o oo     .d8P
// o888o  o888o  `Y8bood8P'     `YbodP'        o888o     o888ooooood8 8""88888P'
router.get('/creditProds', async (req, res)=>{
    try {
        let clubProducts = await myQuery(`
        SELECT club_products.*, locations.name AS location_name,
        locations.country
        FROM club_products
        INNER JOIN locations
        ON locations.id = club_products.location_id
        `)
        res.status(200).send({clubProducts})
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
})

router.get('/prod/:id', async (req, res)=>{
    const {id }= req.params
    try {
        let clubProduct = await myQuery(`
        SELECT club_products.*, locations.name AS location_name, locations.country FROM club_products
        INNER JOIN locations
        ON locations.id = club_products.location_id
        WHERE club_products.id=${id}
        `)
        res.status(200).send({clubProduct:clubProduct[0]})
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
})


router.get('/userCredits', async (req, res)=>{
    const { userInfo } = req
    try {
        let userCredits = await myQuery(`
        SELECT credits FROM users
        WHERE id=${userInfo.id}
        `)
        res.status(200).send({userCredits:userCredits[0].credits})
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
})

router.post('/pay', kickAdmin, async (req, res)=>{
    const { userInfo } = req
    const { id } = req.body
    if(!id){
        return res.status(400).send({fail:"missing id"})
    }
    try {
        let clubProduct = await myQuery(`
        SELECT * FROM club_products
        WHERE id=${id}
        `)
        if(clubProduct.length===0){
            return res.status(400).send({fail:"no such product"})
        }
        clubProduct = clubProduct[0]
        let user = await myQuery(`
        SELECT * FROM users
        WHERE id=${userInfo.id}
        `)
        user = user[0]
        if(clubProduct.price>user.credits || typeof (user.credits)===null){
            return res.status(400).send({fail:"Not enough credits"})
        }
        // take credits from user
        await myQuery(`
            UPDATE users
            SET credits=credits-${clubProduct.price}
            WHERE id=${userInfo.id}
        `)
        // add to purchases
        await myQuery(`
        INSERT INTO purchases (user_id, club_product_id, amount_of_currency)
        VALUES (${userInfo.id},${id},${clubProduct.price})
        `)
        res.sendStatus(200)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
})



module.exports = router;
