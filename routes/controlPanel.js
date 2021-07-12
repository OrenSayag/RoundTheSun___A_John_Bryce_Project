const { myQuery } = require("../DB/config");

const router = require("express").Router();

// ooooooooo.     .oooooo.   ooooo     ooo ooooooooooooo oooooooooooo  .oooooo..o
// `888   `Y88.  d8P'  `Y8b  `888'     `8' 8'   888   `8 `888'     `8 d8P'    `Y8
//  888   .d88' 888      888  888       8       888       888         Y88bo.
//  888ooo88P'  888      888  888       8       888       888oooo8     `"Y8888o.
//  888`88b.    888      888  888       8       888       888    "         `"Y88b
//  888  `88b.  `88b    d88'  `88.    .8'       888       888       o oo     .d8P
// o888o  o888o  `Y8bood8P'     `YbodP'        o888o     o888ooooood8 8""88888P'
router.get("/charts", async (req, res) => {
  try {
    const followersVacations =
      await myQuery(`SELECT COUNT(user_id) AS numOfFollowers, vacation_id, vacations.*, locations.name AS location_name, locations.country
        FROM vacation_follows
        INNER JOIN vacations
        ON vacation_follows.vacation_id=vacations.id
        INNER JOIN locations
        ON vacations.location_id=locations.id
        GROUP BY vacation_id`);
    const favsLocations =
      await myQuery(`SELECT COUNT(user_id) AS numOfFavs, location_id, locations.*
        FROM users_fav_locations
        INNER JOIN locations
        ON users_fav_locations.location_id=locations.id
        GROUP BY location_id`);
    return res.status(201).send({ followersVacations, favsLocations });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get("/manageLocations", async (req, res) => {
  try {
    const locationsArr = await myQuery(`
        SELECT locations.*
        FROM locations
        ORDER BY id DESC
        `);
    for (const location of locationsArr) {
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

    return res.status(200).send({ locationsArr });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.post("/manageLocations", async (req, res) => {
  const { name, country, x, y, imgSrc } = req.body;
  if (!name || !country || !x || !y || !imgSrc) {
    return res.status(400).send({ fail: "Missing Some Info" });
  }
  try {
    // validate not twice the same location
    const rows = await myQuery(
      `SELECT * FROM locations WHERE name='${name}' AND country='${country}' AND x=${x} AND y=${y}`
    );
    if (rows.length !== 0) {
      return res.status(400).send({ fail: "This location already exists" });
    }
    await myQuery(
      `INSERT INTO locations (name, country, x, y, img_src) VALUES ('${name}','${country}', ${x}, ${y}, '${imgSrc}');`
    );

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.put("/manageLocations", async (req, res) => {
  const { id, name, country, x, y, imgSrc } = req.body;
  if (!id) {
    return res.status(400).send({ fail: "missing id" });
  }
  if (!name && !country && !x && !y && !imgSrc) {
    return res
      .status(400)
      .send({
        fail: "missing as least one of the following: name, country, x, y, imgSrc",
      });
  }
  try {
    let location = await myQuery(`SELECT * FROM locations WHERE id=${id}`);
    if (location.length === 0) {
      return res.status(400).send({ fail: "no such location" });
    }
    if (name) {
      await myQuery(`UPDATE locations SET name='${name}' WHERE id=${id}`);
    }
    if (country) {
      await myQuery(`UPDATE locations SET country='${country}' WHERE id=${id}`);
    }
    if (x) {
      await myQuery(`UPDATE locations SET x=${x} WHERE id=${id}`);
    }
    if (y) {
      await myQuery(`UPDATE locations SET y=${y} WHERE id=${id}`);
    }
    if (imgSrc) {
      await myQuery(`UPDATE locations SET img_src='${imgSrc}' WHERE id=${id}`);
    }
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.delete("/manageLocations", async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).send({ fail: "missing id" });
  }
  try {
    let location = await myQuery(`SELECT * FROM locations WHERE id=${id}`);
    if (location.length === 0) {
      return res.status(400).send({ fail: "no such location" });
    }

    await myQuery(`DELETE FROM users_fav_locations WHERE location_id=${id}`)

    const vacationsOfLocation = await myQuery(`SELECT id FROM vacations WHERE location_id=${id}`)

    console.log(vacationsOfLocation)

    
    // for (const vacation of vacationsOfLocation) {
    //   console.log(vacation)
    //   await myQuery (`DELETE FROM vacation_comments WHERE id=${vacation.id}`)
    //   await myQuery (`DELETE FROM vacation_follows WHERE id=${vacation.id}`)
    //   await myQuery (`DELETE FROM vacation_likes WHERE id=${vacation.id}`)
    // }

    // await myQuery(`DELETE FROM vacations WHERE location_id=${id}`)

    await myQuery(`DELETE FROM locations WHERE id=${id}`);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get("/discounts", async (req, res) => {
  try {
    const discountVacations = await myQuery(
      `
      SELECT vacations.*, locations.country, locations.name AS location_name FROM vacations 
      INNER JOIN locations
      ON locations.id=vacations.location_id
      WHERE discount >0
      `
    );
    for (const vacation of discountVacations) {
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
      ON vacation_comments.user_id = users.id
      WHERE vacation_id=${vacation.id}
            `);
      vacation.likes = likes;
      vacation.follows = follows;
      vacation.comments = comments;
    }
    res.status(200).send({ discountVacations });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.put("/discounts", async (req, res) => {
  const { id, discount } = req.body;
  if (!id || !discount) {
    return res.status(400).send({ fail: "missing id or discount" });
  }
  try {
    let vacation = await myQuery(`SELECT * FROM vacations WHERE id=${id}`);
    if (vacation.length === 0) {
      return res.status(400).send({ fail: "no such vacation" });
    }
    await myQuery(`UPDATE vacations SET discount=${discount} WHERE id=${id}`);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get("/manageClub", async (req, res) => {
  try {
    let clubProducts = await myQuery(`
    SELECT club_products.*, locations.name AS location_name ,locations.id AS location_id, locations.country FROM club_products
    INNER JOIN locations
    ON club_products.location_id = locations.id
    `);
    res.status(200).send({ clubProducts });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.post("/manageClub", async (req, res) => {
  const { name, price, start_date, end_date, imgSrc, location_id } = req.body;
  if (!name || !price || !start_date || !end_date || !imgSrc || !location_id) {
    return res.status(400).send({ fail: "Missing Some Info" });
  }
  try {
    // validate not twice the same product
    const rows = await myQuery(`SELECT * FROM locations WHERE name='${name}'`);
    if (rows.length !== 0) {
      return res.status(400).send({ fail: "This location already exists" });
    }
    await myQuery(`INSERT INTO club_products 
        (name, price, start_date, end_date, img_src, location_id)
         VALUES ('${name}','${price}', ${start_date}, ${end_date},
          '${imgSrc}', ${location_id});`);
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.put("/manageClub", async (req, res) => {
  const { id, name, price, start_date, end_date, img_src, location_id } = req.body;
  if (!id) {
    return res.status(400).send({ fail: "missing id" });
  }
  if (!name && !price && !start_date && !end_date && !img_src && !location_id) {
    return res
      .status(400)
      .send({
        fail: "missing as least one of the following: name, price, start_date, end_date, img_src, location_id",
      });
  }
  try {
    let clubProduct = await myQuery(
      `SELECT * FROM club_products WHERE id=${id}`
    );
    if (clubProduct.length === 0) {
      return res.status(400).send({ fail: "no such club product" });
    }
    if (name) {
      await myQuery(`UPDATE club_products SET name='${name}' WHERE id=${id}`);
    }
    if (price) {
      await myQuery(`UPDATE club_products SET price=${price} WHERE id=${id}`);
    }
    if (start_date) {
      await myQuery(
        `UPDATE club_products SET start_date=${start_date} WHERE id=${id}`
      );
    }
    if (end_date) {
      await myQuery(
        `UPDATE club_products SET end_date=${end_date} WHERE id=${id}`
      );
    }
    if (img_src) {
      await myQuery(
        `UPDATE club_products SET img_src='${img_src}' WHERE id=${id}`
      );
    }
    if (location_id) {
      await myQuery(
        `UPDATE club_products SET location_id='${location_id}' WHERE id=${id}`
      );
    }
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.delete("/manageClub", async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).send({ fail: "missing id" });
  }
  try {
    let clubProduct = await myQuery(
      `SELECT * FROM club_products WHERE id=${id}`
    );
    if (clubProduct.length === 0) {
      return res.status(400).send({ fail: "no such club product" });
    }
    await myQuery(`DELETE FROM club_products WHERE id=${id}`);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = router;
