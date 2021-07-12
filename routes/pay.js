const { myQuery } = require("../DB/config");
const router = require("express").Router();

// oooooooooooo ooooo     ooo ooooo      ooo   .oooooo.   ooooooooooooo ooooo   .oooooo.   ooooo      ooo  .oooooo..o
// `888'     `8 `888'     `8' `888b.     `8'  d8P'  `Y8b  8'   888   `8 `888'  d8P'  `Y8b  `888b.     `8' d8P'    `Y8
//  888          888       8   8 `88b.    8  888               888       888  888      888  8 `88b.    8  Y88bo.
//  888oooo8     888       8   8   `88b.  8  888               888       888  888      888  8   `88b.  8   `"Y8888o.
//  888    "     888       8   8     `88b.8  888               888       888  888      888  8     `88b.8       `"Y88b
//  888          `88.    .8'   8       `888  `88b    ooo       888       888  `88b    d88'  8       `888  oo     .d8P
// o888o           `YbodP'    o8o        `8   `Y8bood8P'      o888o     o888o  `Y8bood8P'  o8o        `8  8""88888P'
const kickAdmin = (req, res, next) => {
  if (req.userInfo.type === "admin") {
    return res.status(402).send({ fail: "no admins allowed here" });
  }
  next();
};
function validateCreditNum(creditNum) {
  const re =
  /^[0-9]{16,16}$/;
  return re.test(creditNum);
}
function validateExp(str) {
  const re = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
  return re.test(str);
}
function validateCvv(str) {
  const re = /^[0-9]{3,4}$/;
  return re.test(str);
}

// ooooooooo.     .oooooo.   ooooo     ooo ooooooooooooo oooooooooooo  .oooooo..o
// `888   `Y88.  d8P'  `Y8b  `888'     `8' 8'   888   `8 `888'     `8 d8P'    `Y8
//  888   .d88' 888      888  888       8       888       888         Y88bo.
//  888ooo88P'  888      888  888       8       888       888oooo8     `"Y8888o.
//  888`88b.    888      888  888       8       888       888    "         `"Y88b
//  888  `88b.  `88b    d88'  `88.    .8'       888       888       o oo     .d8P
// o888o  o888o  `Y8bood8P'     `YbodP'        o888o     o888ooooood8 8""88888P'
router.post("/", kickAdmin, async (req, res) => {
  const { cardNum, exp, cvv, fName, lName, vacationId } = req.body;
  const { userInfo } = req;
  if (!cardNum || !exp || !cvv || !fName || !lName || !vacationId) {
    return res
      .status(400)
      .send({
        fail: "Missing Some Info",
      });
  }
  if(!validateCreditNum(cardNum)){
      return res.status(400).send({fail:"Wrong Credit Card number format, please enter 16 digits"})
  }
  if(!validateExp(exp)){
      return res.status(400).send({fail:"Wrong Credit Card expiration date format. Please enter mm/yy"})
  }
  if(!validateCvv(cvv)){
      return res.status(400).send({fail:"Wrong Credit Card CVV format"})
  }
  try {
      let vacation = await myQuery(`
      SELECT * FROM vacations
      WHERE id=${vacationId}
      `);
      if (vacation.length === 0) {
          return res.status(400).send({ fail: "no such vacation" });
        }
        vacation = vacation[0];
        // say payment process was succesful
        // add credits to user
        await myQuery(`
        UPDATE users
        SET credits = credits + ${vacation.credits}
        WHERE id=${userInfo.id}
        `);
        // add purchase to purchases
        await myQuery(`
        INSERT INTO purchases(user_id, vacation_id, amount_of_currency)
        VALUES (${userInfo.id}, ${vacationId}, ${vacation.discount || vacation.price})
        `);
        return res.sendStatus(200)
    } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = router;
