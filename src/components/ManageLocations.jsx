import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { Route, Switch, useHistory, useLocation, Link } from "react-router-dom";
import MLUnit from "./MLUnit";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
// .oooooo..o ooooooooooooo oooooo   oooo ooooo        oooooooooooo  .oooooo..o
// d8P'    `Y8 8'   888   `8  `888.   .8'  `888'        `888'     `8 d8P'    `Y8
// Y88bo.           888        `888. .8'    888          888         Y88bo.
//  `"Y8888o.       888         `888.8'     888          888oooo8     `"Y8888o.
//      `"Y88b      888          `888'      888          888    "         `"Y88b
// oo     .d8P      888           888       888       o  888       o oo     .d8P
// 8""88888P'      o888o         o888o     o888ooooood8 o888ooooood8 8""88888P'
const useStyles = makeStyles({
  root: {
    backgroundColor: "rgba(177, 236, 158,.4)",
    border: "1px solid transparent",
    padding: "10px 30px",
    // width: "calc(100% - 60px)"
    
  },
  active: {
    display: "flex",
  },
  hidden: {
    display: "none",
  },
  chosenLink: {
    backgroundColor: "rgba(177, 236, 158,.4)",
  },
  ambiTitle: {
    backgroundColor: "white",
    height: "2.2rem",
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
    padding: "20px",
    borderRadius: 3,
    fontSize: "1.5rem",
    width: "fit-content",
    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
  },
  unitCont:{
    width: '100%',
    // border: '1px solid pink',
  },
  addBtn: {
    top: '25px',
    right: '0',
    height: '50px',
    // width: '50px',
    color:'#DEF1F1',
    backgroundColor:'rgba(4, 15, 99,.8)',
    border: 'none',
    borderRadius: 3,
    width: '10rem',
    '&:hover':{
      backgroundColor:'rgba(4, 15, 99,.9)',
    boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
      
    }

  },
  addBtnCont:{
    display: 'flex',
    justifyContent: 'flex-end',
  }
});


export default function ManageLocations() {
  // oooooooooooo ooooo     ooo ooooo      ooo   .oooooo.   ooooooooooooo ooooo   .oooooo.   ooooo      ooo  .oooooo..o
  // `888'     `8 `888'     `8' `888b.     `8'  d8P'  `Y8b  8'   888   `8 `888'  d8P'  `Y8b  `888b.     `8' d8P'    `Y8
  //  888          888       8   8 `88b.    8  888               888       888  888      888  8 `88b.    8  Y88bo.
  //  888oooo8     888       8   8   `88b.  8  888               888       888  888      888  8   `88b.  8   `"Y8888o.
  //  888    "     888       8   8     `88b.8  888               888       888  888      888  8     `88b.8       `"Y88b
  //  888          `88.    .8'   8       `888  `88b    ooo       888       888  `88b    d88'  8       `888  oo     .d8P
  // o888o           `YbodP'    o8o        `8   `Y8bood8P'      o888o     o888o  `Y8bood8P'  o8o        `8  8""88888P'
  const fetchLocations = async () => {
    try {
      const res = await fetch(`https://ancient-reef-92615.herokuapp.com/controlPanel/manageLocations`, {
      // const res = await fetch(`http://localhost:666/controlPanel/manageLocations`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: localStorage.token,
        },
      });
      const data = await res.json();
      // console.log(data);

      if (res.status !== 200) {
        return 1;
      }

      setLocationsArr(data.locationsArr)
      
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
  const [locationsArr, setLocationsArr] = useState([])
  const [update, setUpdate] = useState(false)
  

  // ooooo   ooooo   .oooooo.     .oooooo.   oooo    oooo  .oooooo..o
  // `888'   `888'  d8P'  `Y8b   d8P'  `Y8b  `888   .8P'  d8P'    `Y8
  //  888     888  888      888 888      888  888  d8'    Y88bo.
  //  888ooooo888  888      888 888      888  88888[       `"Y8888o.
  //  888     888  888      888 888      888  888`88b.         `"Y88b
  //  888     888  `88b    d88' `88b    d88'  888  `88b.  oo     .d8P
  // o888o   o888o  `Y8bood8P'   `Y8bood8P'  o888o  o888o 8""88888P'
  const history = useHistory();
  const classes = useStyles();


  // oooooooooooo oooooooooooo oooooooooooo oooooooooooo   .oooooo.   ooooooooooooo
  // `888'     `8 `888'     `8 `888'     `8 `888'     `8  d8P'  `Y8b  8'   888   `8
  //  888          888          888          888         888               888
  //  888oooo8     888oooo8     888oooo8     888oooo8    888               888
  //  888    "     888    "     888    "     888    "    888               888
  //  888       o  888          888          888       o `88b    ooo       888
  // o888ooooood8 o888o        o888o        o888ooooood8  `Y8bood8P'      o888o
  useEffect(() => {
    fetchLocations()
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
    <div
    className={clsx(classes.root)}
    >
      <div
      className={clsx(classes.addBtnCont)}
      >
        <button
    className={clsx(classes.addBtn)}

        onClick={()=>history.push('/controlPanel/manageLocations/add')}
        >Add Location</button>

      </div>
        {locationsArr.map(location=><div key={location.id} className={clsx(classes.unitCont)}><MLUnit location={location} update={update} setUpdate={setUpdate} /></div>)}
    </div>
  );
}
