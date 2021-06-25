const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { myQuery } = require("../DB/config");

// oooooooooooo ooooo     ooo ooooo      ooo   .oooooo.   ooooooooooooo ooooo   .oooooo.   ooooo      ooo  .oooooo..o
// `888'     `8 `888'     `8' `888b.     `8'  d8P'  `Y8b  8'   888   `8 `888'  d8P'  `Y8b  `888b.     `8' d8P'    `Y8
//  888          888       8   8 `88b.    8  888               888       888  888      888  8 `88b.    8  Y88bo.
//  888oooo8     888       8   8   `88b.  8  888               888       888  888      888  8   `88b.  8   `"Y8888o.
//  888    "     888       8   8     `88b.8  888               888       888  888      888  8     `88b.8       `"Y88b
//  888          `88.    .8'   8       `888  `88b    ooo       888       888  `88b    d88'  8       `888  oo     .d8P
// o888o           `YbodP'    o8o        `8   `Y8bood8P'      o888o     o888o  `Y8bood8P'  o8o        `8  8""88888P'
const verifyUser = (req, res, next) => {
  const payload = jwt.verify(
    req.headers.authorization,
    process.env.TOKEN_SECRET
  );
  if (!payload) {
    return res.status(401).send({ fail: "Invalid token" });
  }
  req.userInfo = payload.userInfo;
  next();
};
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
router.post("/add", verifyAdmin, async (req, res) => {
  const {
    name,
    price,
    discount,
    start_date,
    end_date,
    credits,
    description,
    location_id,
    img_src,
  } = req.body;
  if (!name || !price || !start_date || !end_date || !location_id || !description || !img_src) {
    return res
      .status(400)
      .send({
        fail: "Missing some info",
      });
  }
  try {
    const location = await myQuery(
      `SELECT * FROM locations WHERE id=${location_id}`
    );
    if (location.length === 0) {
      return res.status(400).send({ fail: "no such location" });
    }
    let string1 = "";
    let string1_5 = "";
    let string2 = "";
    let string2_5 = "";
    if (credits) {
      string1 = `, ${credits}`;
      string1_5 = `, credits`;
    }
    if (discount) {
      string2 = `, ${discount}`;
      string2_5 = `, discount`;
    }
    await myQuery(`INSERT INTO vacations(name, description ,price, start_date, end_date, location_id, img_src${string1_5}${string2_5})
        VALUES ("${name}", "${description}" ,${price} ,${start_date}, ${end_date}, ${location_id}, '${img_src}'${string1}${string2})`);

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.post("/search", verifyUser, async (req, res) => {
  const { input } = req.body;
  if (!input) {
    return res.status(400).send({ fail: "missing input" });
  }
  try {
    const vacationsSearchResults = await myQuery(`
        SELECT * FROM vacations
        WHERE name LIKE '%${input}%'
        `);
    const locationsSearchResults = await myQuery(`
        SELECT * FROM locations
        WHERE name LIKE '%${input}%'
        `);

    return res
      .status(200)
      .send({ vacationsSearchResults, locationsSearchResults });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get("/", verifyUser, async (req, res) => {
  const userInfo = req.userInfo;
  try {
    const vacationsFollowedByUser = await myQuery(`
        SELECT vacations.*, locations.country ,locations.name AS location_name FROM vacation_follows 
        INNER JOIN vacations
        ON vacations.id=vacation_follows.vacation_id
        INNER JOIN locations
        ON vacations.location_id=locations.id
        WHERE vacation_follows.user_id=${userInfo.id}
        ORDER BY vacations.start_date
        `);
    for (const vacation of vacationsFollowedByUser) {
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
            SELECT vacation_comments.*, users.user_name, users.img_src
            FROM vacation_comments
            INNER JOIN users
            ON vacation_comments.user_id = users.id
            WHERE vacation_id=${vacation.id}
            ORDER BY vacation_comments.date ASC
            `);
      vacation.likes = likes;
      vacation.follows = follows;
      vacation.comments = comments;
    }
    const restOfVactions = await myQuery(`
        SELECT vacations.*, locations.country ,locations.name AS location_name FROM vacations 
        INNER JOIN locations
        ON vacations.location_id=locations.id
        WHERE vacations.id NOT IN (SELECT vacation_id FROM vacation_follows WHERE user_id=${userInfo.id})
        ORDER BY start_date
        `);
        for (const vacation of restOfVactions) {
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
            SELECT vacation_comments.*, users.user_name, users.img_src
            FROM vacation_comments
            INNER JOIN users
            ON vacation_comments.user_id = users.id
            WHERE vacation_id=${vacation.id}
            ORDER BY vacation_comments.date ASC
                  `);
            vacation.likes = likes;
            vacation.follows = follows;
            vacation.comments = comments;
          }

    return res.status(200).send({ vacationsFollowedByUser, restOfVactions });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = router;
