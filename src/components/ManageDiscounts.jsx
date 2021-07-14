import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory, useLocation, Link } from "react-router-dom";
import VacationUnit from "./VacationUnit"; 
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
// .oooooo..o ooooooooooooo oooooo   oooo ooooo        oooooooooooo  .oooooo..o
// d8P'    `Y8 8'   888   `8  `888.   .8'  `888'        `888'     `8 d8P'    `Y8
// Y88bo.           888        `888. .8'    888          888         Y88bo.
//  `"Y8888o.       888         `888.8'     888          888oooo8     `"Y8888o.
//      `"Y88b      888          `888'      888          888    "         `"Y88b
// oo     .d8P      888           888       888       o  888       o oo     .d8P
// 8""88888P'      o888o         o888o     o888ooooood8 o888ooooood8 8""88888P'
const useStyles = makeStyles({
  root: {
    // background: "linear-gradient(45deg, #126929 30%, #c41bbc 90%)",
    // position: 'relative',
    // width: "1300px",
    // marginTop: '100px',
    backgroundColor: "rgba(177, 236, 158,.4)",
    border: "1px solid transparent",
    padding: "10px 30px",
    height: '100%',
  },
  cont: {
    // width: '100%',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "linear-gradient(to right, #159957, #155799)",
    // height: '100vh',
    minHeight: "100vh",
    // boxSizing: 'border-box'
  },
  active: {
    display: "flex",
  },
  hidden: {
    display: "none",
  },
});

export default function ManageDiscounts() {
    // oooooooooooo ooooo     ooo ooooo      ooo   .oooooo.   ooooooooooooo ooooo   .oooooo.   ooooo      ooo  .oooooo..o
    // `888'     `8 `888'     `8' `888b.     `8'  d8P'  `Y8b  8'   888   `8 `888'  d8P'  `Y8b  `888b.     `8' d8P'    `Y8
    //  888          888       8   8 `88b.    8  888               888       888  888      888  8 `88b.    8  Y88bo.
    //  888oooo8     888       8   8   `88b.  8  888               888       888  888      888  8   `88b.  8   `"Y8888o.
    //  888    "     888       8   8     `88b.8  888               888       888  888      888  8     `88b.8       `"Y88b
    //  888          `88.    .8'   8       `888  `88b    ooo       888       888  `88b    d88'  8       `888  oo     .d8P
    // o888o           `YbodP'    o8o        `8   `Y8bood8P'      o888o     o888o  `Y8bood8P'  o8o        `8  8""88888P'
    const fetchDiscountVacations = async () => {
      try {
        // const res = await fetch(`https://ancient-reef-92615.herokuapp.com/controlPanel/discounts`, {
        const res = await fetch(`/api/controlPanel/discounts`, {
        // const res = await fetch(`http://localhost:666/controlPanel/discounts`, {
          method: "GET",
          headers: {
            "content-type": "application/json",
            authorization: localStorage.token,
          },
        });

        const data = await res.json();
        // console.log(data);
        if(res.status!==200){
            return
        }

        setDiscountVacations(data.discountVacations)
  
      } catch (error) {
        // console.log(error);
      }
    };
    //  .oooooo..o ooooooooooooo       .o.       ooooooooooooo oooooooooooo
    //  d8P'    `Y8 8'   888   `8      .888.      8'   888   `8 `888'     `8
    //  Y88bo.           888          .8"888.          888       888
    //   `"Y8888o.       888         .8' `888.         888       888oooo8
    //       `"Y88b      888        .88ooo8888.        888       888    "
    //  oo     .d8P      888       .8'     `888.       888       888       o
    //  8""88888P'      o888o     o88o     o8888o     o888o     o888ooooood8
    const [update, setUpdate] = useState(false)
    const [discountVacations, setDiscountVacations] = useState([])
    // ooooo   ooooo   .oooooo.     .oooooo.   oooo    oooo  .oooooo..o
    // `888'   `888'  d8P'  `Y8b   d8P'  `Y8b  `888   .8P'  d8P'    `Y8
    //  888     888  888      888 888      888  888  d8'    Y88bo.
    //  888ooooo888  888      888 888      888  88888[       `"Y8888o.
    //  888     888  888      888 888      888  888`88b.         `"Y88b
    //  888     888  `88b    d88' `88b    d88'  888  `88b.  oo     .d8P
    // o888o   o888o  `Y8bood8P'   `Y8bood8P'  o888o  o888o 8""88888P'
    const classes = useStyles();
  
    // oooooooooooo oooooooooooo oooooooooooo oooooooooooo   .oooooo.   ooooooooooooo
    // `888'     `8 `888'     `8 `888'     `8 `888'     `8  d8P'  `Y8b  8'   888   `8
    //  888          888          888          888         888               888
    //  888oooo8     888oooo8     888oooo8     888oooo8    888               888
    //  888    "     888    "     888    "     888    "    888               888
    //  888       o  888          888          888       o `88b    ooo       888
    // o888ooooood8 o888o        o888o        o888ooooood8  `Y8bood8P'      o888o
    useEffect(() => {
        fetchDiscountVacations()
        // console.log(discountVacations)
    }, [update]);
  
  
    //   oooo  .oooooo..o ooooooo  ooooo
    //   `888 d8P'    `Y8  `8888    d8'
    //    888 Y88bo.         Y888..8P
    //    888  `"Y8888o.      `8888'
    //    888      `"Y88b    .8PY888.
    //    888 oo     .d8P   d8'  `888b
    // .o. 88P 8""88888P'  o888o  o88888o
    // `Y888P
    return (
        <div className={clsx(classes.cont)}>
          <div className={clsx(classes.root)}>
            <div>
                {discountVacations.length>0 ?discountVacations.map(vacation=><VacationUnit key={vacation.id} setUpdate={setUpdate} update={update} vacation={vacation}/>)
            : <div>No discounts. Add some at explore page, editing a vacation!</div>    
            }
            </div>
            </div>
        </div>
    )
}
