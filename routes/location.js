const { myQuery } = require("../DB/config");
const router = require('express').Router()

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

router.post('/', async (req, res)=>{
    const { id } = req.body
    if(!id){
        return res.status(400).send({fail:"missing id"})
    }
    try {
        const location = await myQuery(`SELECT * FROM locations WHERE id=${id}`)
        if(location.length===0){
            return res.status(400).send({fail:"no such location"})
        }
        // add followers to location data
        const locationFavoredBy = await myQuery(`SELECT * FROM users_fav_locations WHERE location_id=${id}`)
        location[0].favoredBy = locationFavoredBy
        const locationVacations = await myQuery(`
        SELECT vacations.*, locations.name AS location_name, locations.country FROM vacations 
        INNER JOIN locations
        ON locations.id=vacations.location_id
        WHERE location_id=${id}
        `)
        for (const vacation of locationVacations) {
            const likes = await myQuery(`
            SELECT *
            FROM vacation_likes 
            WHERE vacation_id=${vacation.id}
            `)
            const follows = await myQuery(`
            SELECT *
            FROM vacation_follows
            WHERE vacation_id=${vacation.id}
            `)
            const comments = await myQuery(`
            SELECT *, users.img_src, users.user_name
            FROM vacation_comments
            INNER JOIN users
            ON vacation_comments.user_id = users.id
            WHERE vacation_id=${vacation.id}
            `)
            vacation.likes = likes
            vacation.follows = follows
            vacation.comments = comments
        }
        return res.status(200).send({location:location[0], locationVacations})
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
})

router.post('/vacationsFiltered', async (req, res)=>{
    const { id, start, end } = req.body
    if(!id || !start || !end){
        return res.status(400).send({fail:"missing id || start || end"})
    }
    try {
        const location = await myQuery(`
        SELECT locations.* FROM locations WHERE id=${id}

        `)
        if(location.length===0){
            return res.status(400).send({fail:"no such location"})
        }
        const locationVacations = await myQuery(`
        SELECT * FROM vacations 
        WHERE location_id=${id} AND start_date>='${start}' AND end_date<='${end}'
        `)
        for (const vacation of locationVacations) {
            const likes = await myQuery(`
            SELECT *
            FROM vacation_likes 
            WHERE vacation_id=${vacation.id}
            `)
            const follows = await myQuery(`
            SELECT *
            FROM vacation_follows
            WHERE vacation_id=${vacation.id}
            `)
            const comments = await myQuery(`
            SELECT vacation_comments.*, users.user_name
            FROM vacation_comments
            INNER JOIN users
            ON users.id = vacation_comments.user_id
            WHERE vacation_id=${vacation.id}
            `)
            vacation.likes = likes
            vacation.follows = follows
            vacation.comments = comments
            vacation.country = location[0].country
            vacation.location_name = location[0].name
        }
        return res.status(200).send({locationVacations})
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
})

router.get('/', async (req, res)=>{
    try {
        const locations = await myQuery(`SELECT * FROM locations`)
        for (const location of locations) {
            const locationFavoredBy = await myQuery(`
            SELECT users.* FROM users 
            INNER JOIN users_fav_locations
            ON users.id=users_fav_locations.user_id
            WHERE location_id=${location.id}
            `)
            location.locationFavoredBy = locationFavoredBy
            const locationVacations = await myQuery(`
            SELECT vacations.*, locations.name AS location_name, locations.country FROM vacations
            INNER JOIN locations
            ON locations.id=vacations.location_id
            WHERE location_id=${location.id}
            `)
            location.locationVacations = locationVacations
            for (const vacation of locationVacations) {
                const likes = await myQuery(`
                SELECT *
                FROM vacation_likes 
                WHERE vacation_id=${vacation.id}
                `);
        const follows = await myQuery(`
                SELECT *
                FROM vacation_follows
                WHERE vacation_id=${vacation.id}
                `);
        const comments = await myQuery(`
                SELECT vacation_comments.*, users.user_name
                FROM vacation_comments
                INNER JOIN users
                ON users.id=vacation_comments.user_id
                WHERE vacation_id=${vacation.id}
                `);
        vacation.likes = likes;
        vacation.follows = follows;
        vacation.comments = comments;
            }
        }
        return res.status(200).send({locations})
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
})

router.post('/fav', async (req, res)=>{
    const { userInfo } = req
    const { id } = req.body
    if(!id){
        return res.status(400).send({fail:"missing id"})
    }
    try {
        const location = await myQuery(`
        SELECT * FROM locations
        WHERE id=${id}
        `)
        if(location.length===0){
            return res.status(400).send({fail:"no such location"})
        }
        const favoritedLocation = await myQuery(`
        SELECT * FROM users_fav_locations
        WHERE user_id=${userInfo.id}
        AND location_id=${id}
        `)
        if(favoritedLocation.length===0){
            await myQuery(`
            INSERT INTO users_fav_locations(user_id, location_id)
            VALUES (${userInfo.id},${id})
            `)
        } else {
            await myQuery(`
            DELETE FROM users_fav_locations 
            WHERE user_id=${userInfo.id}
            AND location_id=${id}
            `)
        }
        return res.sendStatus(200)
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
})



module.exports = router;