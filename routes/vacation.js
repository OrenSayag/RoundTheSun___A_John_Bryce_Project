const { myQuery } = require("../DB/config");
const router = require("express").Router();
const jwt = require('jsonwebtoken')

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
const verifyAdmin = (req, res, next) => {
  const payload = jwt.verify(
    req.headers.authorization,
    process.env.TOKEN_SECRET
  );
  if (!payload) {
    return res.status(401).send({ fail: "Invalid token" });
  }
  let userInfo = payload.userInfo;
  if (userInfo.type !== "admin") {
    return res.status(401).send({ fail: "you're not an admin" });
  }
  req.userInfo = userInfo;
  next();
};
// ooooooooo.     .oooooo.   ooooo     ooo ooooooooooooo oooooooooooo  .oooooo..o
// `888   `Y88.  d8P'  `Y8b  `888'     `8' 8'   888   `8 `888'     `8 d8P'    `Y8
//  888   .d88' 888      888  888       8       888       888         Y88bo.
//  888ooo88P'  888      888  888       8       888       888oooo8     `"Y8888o.
//  888`88b.    888      888  888       8       888       888    "         `"Y88b
//  888  `88b.  `88b    d88'  `88.    .8'       888       888       o oo     .d8P
// o888o  o888o  `Y8bood8P'     `YbodP'        o888o     o888ooooood8 8""88888P'

router.post("/", async (req, res) => {
  const { id } = req.body;
  try {
    let vacation = await myQuery(`
    SELECT vacations.*, locations.name AS location_name, locations.country AS country FROM vacations 
    INNER JOIN locations
    ON locations.id = vacations.location_id
    WHERE vacations.id=${id}

    `);
    vacation = vacation[0]
    if (!vacation) {
      return res.status(400).send({ fail: "no such vacation" });
    }
    const likes = await myQuery(`
            SELECT *
            FROM vacation_likes 
            WHERE vacation_id=${id}
            `);
    const follows = await myQuery(`
            SELECT *
            FROM vacation_follows
            WHERE vacation_id=${id}
            `);
    const comments = await myQuery(`
            SELECT vacation_comments.*, users.user_name
            FROM vacation_comments
            INNER JOIN users
            ON users.id=vacation_comments.user_id
            WHERE vacation_id=${id}
            `);
    vacation.likes = likes;
    vacation.follows = follows;
    vacation.comments = comments;
    return res.status(200).send({vacation})
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.put('/follow', kickAdmin, async (req, res)=>{
  const { userInfo } = req
  const { id } = req.body
  if(!id){
    return res.status(400).send({fail:"missing id"})
  }
  try {
    const vacation = await myQuery(`
    SELECT * FROM vacations
    WHERE id=${id}
    `)
    if(vacation.length===0){
      return res.status(400).send({fail:"no such vacation"})
    }
    const followedVacation = await myQuery(`
    SELECT * from vacation_follows
    WHERE user_id=${userInfo.id} AND vacation_id=${id}
    `)
    if(followedVacation.length===0){
      await myQuery(`
      INSERT INTO vacation_follows (user_id, vacation_id)
      VALUES (${userInfo.id}, ${id})
      `)
    } else {
      await myQuery(`
      DELETE FROM vacation_follows WHERE user_id=${userInfo.id} AND vacation_id=${id}
      `)
    }
    return res.sendStatus(200)
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
})

router.put('/like', kickAdmin, async (req, res)=>{
  const { userInfo } = req
  const { id } = req.body
  if(!id){
    return res.status(400).send({fail:"missing id"})
  }
  try {
    const vacation = await myQuery(`
    SELECT * FROM vacations
    WHERE id=${id}
    `)
    if(vacation.length===0){
      return res.status(400).send({fail:"no such vacation"})
    }
    const likedVacation = await myQuery(`
    SELECT * from vacation_likes
    WHERE user_id=${userInfo.id} AND vacation_id=${id}
    `)
    if(likedVacation.length===0){
      await myQuery(`
      INSERT INTO vacation_likes (user_id, vacation_id)
      VALUES (${userInfo.id}, ${id})
      `)
    } else {
      await myQuery(`
      DELETE FROM vacation_likes WHERE user_id=${userInfo.id} AND vacation_id=${id}
      `)
    }
    return res.sendStatus(200)
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
})

router.post('/comment', async (req, res)=>{
  const { userInfo } = req
  const { id, text } = req.body
  if(!id || !text){
    return res.status(400).send({fail:"missing id || text"})
  }
  try {
    const vacation = await myQuery(`
    SELECT * FROM vacations
    WHERE id=${id}
    `)
    if(vacation.length===0){
      return res.status(400).send({fail:"no such vacation"})
    }
    await myQuery(`
    INSERT INTO vacation_comments(user_id, vacation_id, text)
    VALUES (${userInfo.id}, ${id}, "${text}")
    `)
    return res.sendStatus(200)
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
})

router.delete('/comment', async (req, res)=>{
  const { userInfo } = req
  const { id } = req.body
  if(!id){
    return res.status(400).send({fail:"missing id"})
  }
  try {
    if(userInfo.type!=='admin'){
      const comment = await myQuery(`
      SELECT * FROM vacation_comments
      WHERE id=${id} AND user_id=${userInfo.id}
      `)
      if(comment.length===0){
        return res.status(400).send({fail:"no such comment, or comment isn't user's"})
      }
    } else {
      const comment = await myQuery(`
      SELECT * FROM vacation_comments
      WHERE id=${id}
      `)
      if(comment.length===0){
        return res.status(400).send({fail:"no such comment, my lord"})
      }
    }
    await myQuery(`
    DELETE FROM vacation_comments WHERE id=${id}
    `)
    return res.sendStatus(200)
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
})

router.delete('/comment/admin', async (req, res)=>{
  const { userInfo } = req
  if(userInfo.type!=='admin'){
    return res.status(401).send({fail:"admin only"})
  }
  const { id } = req.body
  if(!id){
    return res.status(400).send({fail:"missing id"})
  }
  try {
    const comment = await myQuery(`
    SELECT * FROM vacation_comments
    WHERE id=${id}
    `)
    if(comment.length===0){
      return res.status(400).send({fail:"no such comment"})
    }
    await myQuery(`
    DELETE FROM vacation_comments WHERE id=${id}
    `)
    return res.sendStatus(200)
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
})

router.put('/comment', async (req, res)=>{
  const { userInfo } = req
  const { id, text } = req.body
  if(!id || !text){
    return res.status(400).send({fail:"missing id || text"})
  }
  try {
    const comment = await myQuery(`
    SELECT * FROM vacation_comments
    WHERE id=${id} AND user_id=${userInfo.id}
    `)
    if(comment.length===0){
      return res.status(400).send({fail:"no such comment or comment isn't user's"})
    }
    await myQuery(`
    UPDATE vacation_comments
    SET text='${text}'
    WHERE id=${id};
    `)
    return res.sendStatus(200)
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
})

router.put('/', verifyAdmin, async (req, res)=>{
  const { id ,location_id, name, price, discount, start_date, end_date, credits, img_src, description } = req.body
  if(!id || (!img_src && !location_id && name && price && discount && start_date && end_date && credits && description && img_src)){
    return res.status(500).send({fail:"missing  id ,location_id, name, price, discount, start_date, end_date, credits, img_src"}) 
  }
  try {
    const vacation = await myQuery(`
      SELECT * FROM vacations
      WHERE id=${id}
    `)
    if(vacation.length===0)
    return res.status(400).send({fail:'no such vacation'})
    if(location_id){
      await myQuery(`
      UPDATE vacations
      SET location_id=${location_id}
      WHERE id=${id}
      `)
    }
    if(name){
      await myQuery(`
      UPDATE vacations
      SET name="${name}"
      WHERE id=${id}
      `)
    }
    if(price){
      await myQuery(`
      UPDATE vacations
      SET price=${price}
      WHERE id=${id}
      `)
    }
    if(discount){
      await myQuery(`
      UPDATE vacations
      SET discount=${discount}
      WHERE id=${id}
      `)
    }
    if(start_date){
      await myQuery(`
      UPDATE vacations
      SET start_date=${start_date}
      WHERE id=${id}
      `)
    }
    if(end_date){
      await myQuery(`
      UPDATE vacations
      SET end_date=${end_date}
      WHERE id=${id}
      `)
    }
    if(credits){
      await myQuery(`
      UPDATE vacations
      SET credits=${credits}
      WHERE id=${id}
      `)
    }
    if(img_src){
      await myQuery(`
      UPDATE vacations
      SET img_src='${img_src}'
      WHERE id=${id}
      `)
    }
    if(description){
      await myQuery(`
      UPDATE vacations
      SET description="${description}"
      WHERE id=${id}
      `)
    }
    return res.sendStatus(200)
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
})

router.delete('/', verifyAdmin, async (req, res)=>{
  const { id } = req.body
  if(!id){
    return res.status(500).send({fail:"missing id"}) 
  }
  try {
    await myQuery(`DELETE FROM vacation_follows
    WHERE vacation_id=${id}
    `)
    await myQuery(`DELETE FROM vacation_comments
    WHERE vacation_id=${id}
    `)
    await myQuery(`DELETE FROM vacation_likes
    WHERE vacation_id=${id}
    `)
    await myQuery(`DELETE FROM purchases
    WHERE vacation_id=${id}
    `)
    await myQuery(`DELETE FROM vacations
    WHERE id=${id}
    `)
    return res.sendStatus(200)
  } catch (error) {
    console.log(error)
    return res.sendStatus(500)
  }
})



module.exports = router;
