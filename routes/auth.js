const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { myQuery } = require("../DB/config");

// oooooooooooo ooooo     ooo ooooo      ooo   .oooooo.   ooooooooooooo ooooo   .oooooo.   ooooo      ooo  .oooooo..o
// `888'     `8 `888'     `8' `888b.     `8'  d8P'  `Y8b  8'   888   `8 `888'  d8P'  `Y8b  `888b.     `8' d8P'    `Y8
//  888          888       8   8 `88b.    8  888               888       888  888      888  8 `88b.    8  Y88bo.
//  888oooo8     888       8   8   `88b.  8  888               888       888  888      888  8   `88b.  8   `"Y8888o.
//  888    "     888       8   8     `88b.8  888               888       888  888      888  8     `88b.8       `"Y88b
//  888          `88.    .8'   8       `888  `88b    ooo       888       888  `88b    d88'  8       `888  oo     .d8P
// o888o           `YbodP'    o8o        `8   `Y8bood8P'      o888o     o888o  `Y8bood8P'  o8o        `8  8""88888P'
function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
function validatePassword(str) {
  // min 8 letter password, upper and lower case letters and a number
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return re.test(str);
}
function validateUserName(str) {
  const re = /^(?=[a-zA-Z0-9._]{4,10}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
  return re.test(str);
}

// ooooooooo.     .oooooo.   ooooo     ooo ooooooooooooo oooooooooooo  .oooooo..o
// `888   `Y88.  d8P'  `Y8b  `888'     `8' 8'   888   `8 `888'     `8 d8P'    `Y8
//  888   .d88' 888      888  888       8       888       888         Y88bo.
//  888ooo88P'  888      888  888       8       888       888oooo8     `"Y8888o.
//  888`88b.    888      888  888       8       888       888    "         `"Y88b
//  888  `88b.  `88b    d88'  `88.    .8'       888       888       o oo     .d8P
// o888o  o888o  `Y8bood8P'     `YbodP'        o888o     o888ooooood8 8""88888P'
router.post("/signup", async (req, res) => {
  // validate req data is valid
  const { userName, password, firstName, lastName, mail, imgSrc } = req.body;
  if (!userName || !password || !firstName || !lastName || !mail) {
    return res.status(401).send({ fail: "Missing Some Info" });
  }
  // validate mail and password and userName format
  if (!validateEmail(mail)) {
    return res.status(401).send({ fail: "Wrong Mail Format" });
  }
  if (!validatePassword(password)) {
    return res
      .status(401)
      .send({
        fail: "Weak Password. Rules: Minimum 8 character password, upper and lower case letters and a number",
      });
  }
  if (!validateUserName(userName)) {
    return res
      .status(401)
      .send({
        fail: "Invalid userName. Rules: 4-10 characters, no _ or . at the beginning or end, no double special characters (._), allowed characters: - . , a-z, A-Z, 0-9",
      });
  }
  // validate user_name or mail aren't taken
  try {
    rows = await myQuery(
      `SELECT id FROM users WHERE user_name='${userName}'`
    );
    if (rows.length !== 0) {
      return res.status(400).send({ fail: "Username is taken" });
    }
    rows = await myQuery(
      `SELECT id FROM users WHERE mail='${mail}' `
    );
    if (rows.length !== 0) {
      return res.status(400).send({ fail: "This mail address is already used" });
    }

    // add user to db
    const hashedPass = await bcrypt.hashSync(password, 10);
    await myQuery(
      `INSERT INTO users (user_name, hashed_pass, mail, f_name, l_name) VALUES ('${userName}', '${hashedPass}', '${mail}', '${firstName}', '${lastName}')`
    );
    if(imgSrc){
        await myQuery(
          `UPDATE users SET img_src=${imgSrc} WHERE user_name=${userName}`
        );
    }
    return res.sendStatus(200);
  } catch (error) {
    return res.status(500).send({ error });
  }
});

router.post("/login", async (req, res)=>{
    // save data
    const { mailOrUsername, password } = req.body
    // validate data true
    if(!mailOrUsername || !password){
        return res.status(400).send({fail: "missing mailOrUsername || password"})
    }
    // check match in db
    try {
        let rows = await myQuery(`SELECT id ,user_name, mail, f_name, l_name, credits, img_src, type FROM users WHERE mail='${mailOrUsername}' OR user_name='${mailOrUsername}'`)
        if(rows.length===0){
            return res.status(401).send({fail:"no such user or mail"})
        }
        const hashed_pass = await myQuery(`SELECT hashed_pass FROM users WHERE mail='${mailOrUsername}' OR user_name='${mailOrUsername}'`)

        const verifyPass = await bcrypt.compareSync(password, hashed_pass[0].hashed_pass)
        if(!verifyPass){
            return res.status(401).send({fail:"worng password"})
        }

        const token = jwt.sign({userInfo: rows[0]}, process.env.TOKEN_SECRET, {
            expiresIn: 8*60*60
        })  

        return res.status(200).send({token})
        
    } catch (error) {
        return res.send({error})
    }
})

router.get("/", (req, res) => {
  return res.send("test");
});

module.exports = router;
