const { myQuery } = require('../DB/config')
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
router.get('/', async (req,res)=>{
    const userInfo = req.userInfo
    if(userInfo.type!=='admin'){
        try {
            const purchaseHistory = await myQuery(`
            SELECT *, purchases.id AS purchase_id, vacations.name AS vacation_name, club_products.name AS club_product_name, 
            club_products.start_date AS CBStart_date, club_products.end_date AS CBEnd_date, vacations.start_date AS start_date, vacations.end_date AS end_date,
            locations.name AS location_name
            FROM purchases 
            LEFT JOIN vacations 
            ON purchases.vacation_id=vacations.id
            LEFT JOIN club_products 
            ON purchases.club_product_id=club_products.id
            LEFT JOIN locations
            ON vacations.location_id = locations.id
            WHERE user_id=${userInfo.id}
            ORDER BY date DESC
            ;
            `)
            const upcomingVacations = await myQuery(`
            SELECT *, purchases.id AS purchase_id, vacations.name AS vacation_name, club_products.name AS club_product_name,
            locations.name AS location_name, locations.country, locations.id AS location_id,
            club_products.start_date AS CBStart_date, club_products.end_date AS CBEnd_date, vacations.start_date AS start_date, vacations.end_date AS end_date
            FROM purchases 
            LEFT JOIN vacations 
            ON purchases.vacation_id=vacations.id
            LEFT JOIN club_products 
            ON purchases.club_product_id=club_products.id
            INNER JOIN locations
            ON locations.id = vacations.location_id
            OR locations.id = club_products.location_id
            WHERE user_id=${userInfo.id}
            AND 
            (vacations.start_date > now()
            OR club_products.start_date > now())
            ORDER BY date
            ;
            `)
            
            res.send({userInfo, purchaseHistory, upcomingVacations})
        } catch (error) {
            console.log(error)
            return res.sendStatus(500)
        }

    } else {
        const purchaseHistory = await myQuery(`
        SELECT *, purchases.id AS purchase_id, vacations.name AS vacation_name, club_products.name AS club_product_name, 
        club_products.start_date AS CBStart_date, club_products.end_date AS CBEnd_date, vacations.start_date AS start_date, vacations.end_date AS end_date,
        locations.name AS location_name, locations.country
        FROM purchases 
        LEFT JOIN vacations 
        ON purchases.vacation_id=vacations.id
        LEFT JOIN club_products 
        ON purchases.club_product_id=club_products.id
        INNER JOIN locations
        ON locations.id = vacations.location_id
        OR locations.id = club_products.location_id
        ORDER BY date
        ;
        `)
        res.send({userInfo, purchaseHistory})
    }
})

router.get('/favLocations', kickAdmin ,async (req,res)=>{
    const userInfo = req.userInfo
    try {
        const favLocations = await myQuery(`
        SELECT * FROM users_fav_locations
        INNER JOIN locations
        ON users_fav_locations.location_id = locations.id 
        WHERE user_id=${userInfo.id}`)

        for (const location of favLocations) {
            const numOfFavs = await myQuery(`
                  SELECT COUNT(user_id) AS count
                  FROM users_fav_locations
                  WHERE location_id=${location.id}
                  `);
            location.numOfFavs = numOfFavs[0].count;
      
            const numOfVacations = await myQuery(`
                  SELECT COUNT(location_id) AS count
                  FROM vacations
                  WHERE location_id=${location.id}
                  `);
            location.numOfVacations = numOfVacations[0].count;
          }


        return res.status(200).send({favLocations})
    } catch (error) {
        console.log(error)
        return res.sendStatus(500)
    }
})



module.exports = router;