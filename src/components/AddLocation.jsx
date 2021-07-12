import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory, useLocation, Link } from "react-router-dom";
import  AddLocationMap  from "./AddLocationMap";
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
    backgroundColor: "rgba(177, 236, 158,.4)",
    border: "1px solid transparent",
    padding: "10px 30px",
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
  inputCont:{
    //   border: '1px solid white',
      margin: '35px 0',
      backgroundColor: 'rgba(200,200,200,.6)',
    minHeight: '50vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',

    padding: '25px',
    borderRadius: 3,
'&>input':{
    border:' none',
    borderRadius: 3,
    height: '1.5rem',
    padding: '5px',
    width: '15rem',
    margin: '20px 0',
    outline: 'none',
    fontFamily: 'inherit',
    minWidth: 'fit-content',
    '&:hover':{
      boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',

    },
},
'&>select':{
    width: 'calc(15rem + 10px)',
    outline: 'none',
    borderRadius: 3,
    margin: '20px 0',
    border: 'none',
    height: '1.5rem',
    padding: '3px',

},
'&>*':{
    backgroundColor:'rgba(255,255,255,.7)'
}

  },
  addBtn:{
      border: 'none',
      outline: 'none',
      padding: '15px',
      borderRadius: 3,
      marginBottom: '20vh',
      backgroundColor:'rgba(11, 73, 73,.7)      ',
      color: '#F0FBFB      ',
      fontSize: '2rem',
      fontWeight: 300,
      letterSpacing: '.2mm',
      boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
      transition: 'background .2s ',
      '&:hover':{
      backgroundColor:'#1A9595      ',

    },

  },
  errorDiv: {
    backgroundColor: '#2B04CB    ',
    width: 'fit-content',
    padding: '15px',
    borderRadius: 3,
    margin: '0 0 30px 0',
    color: 'linen',
    boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
    letterSpacing: '.5mm',
    
  },
});


export default function AddLocation() {
  // oooooooooooo ooooo     ooo ooooo      ooo   .oooooo.   ooooooooooooo ooooo   .oooooo.   ooooo      ooo  .oooooo..o
  // `888'     `8 `888'     `8' `888b.     `8'  d8P'  `Y8b  8'   888   `8 `888'  d8P'  `Y8b  `888b.     `8' d8P'    `Y8
  //  888          888       8   8 `88b.    8  888               888       888  888      888  8 `88b.    8  Y88bo.
  //  888oooo8     888       8   8   `88b.  8  888               888       888  888      888  8   `88b.  8   `"Y8888o.
  //  888    "     888       8   8     `88b.8  888               888       888  888      888  8     `88b.8       `"Y88b
  //  888          `88.    .8'   8       `888  `88b    ooo       888       888  `88b    d88'  8       `888  oo     .d8P
  // o888o           `YbodP'    o8o        `8   `Y8bood8P'      o888o     o888o  `Y8bood8P'  o8o        `8  8""88888P'
  const fetchAddLocation = async () => {
    try {
      const res = await fetch(
        // `https://ancient-reef-92615.herokuapp.com/controlPanel/manageLocations`,
        `/api/controlPanel/manageLocations`,
        // `http://localhost:666/controlPanel/manageLocations`,
        {
          method: "POST",
          body: JSON.stringify({
            name,
            country,
            x,
            y,
            imgSrc,
          }),
          headers: {
            "content-type": "application/json",
            authorization: localStorage.token,
          },
        }
      );

      if (res.status !== 200) {
        const data = await res.json();
        // console.log(data);
        setErrorDiv(true);
        setErrorDivText(
          data.fail
        );
        return;
      }

      setErrorDiv(true);
      setErrorDivText(
        "Succesfuly added location. Redirecting to Control panel..."
      );

      setTimeout(() => {
        history.push("/controlPanel/manageLocations");
      }, 3000);
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
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [imgSrc, setImgSrc] = useState("");
  const [errorDiv, setErrorDiv] = useState(false);
  const [errorDivText, setErrorDivText] = useState("");
  const [update, setUpdate] = useState(false)

  // ooooo   ooooo   .oooooo.     .oooooo.   oooo    oooo  .oooooo..o
  // `888'   `888'  d8P'  `Y8b   d8P'  `Y8b  `888   .8P'  d8P'    `Y8
  //  888     888  888      888 888      888  888  d8'    Y88bo.
  //  888ooooo888  888      888 888      888  88888[       `"Y8888o.
  //  888     888  888      888 888      888  888`88b.         `"Y88b
  //  888     888  `88b    d88' `88b    d88'  888  `88b.  oo     .d8P
  // o888o   o888o  `Y8bood8P'   `Y8bood8P'  o888o  o888o 8""88888P'
  const history = useHistory();
  const userInfo = useSelector((state) => state.userInfo);
  const classes = useStyles();



  // oooooooooooo oooooooooooo oooooooooooo oooooooooooo   .oooooo.   ooooooooooooo
  // `888'     `8 `888'     `8 `888'     `8 `888'     `8  d8P'  `Y8b  8'   888   `8
  //  888          888          888          888         888               888
  //  888oooo8     888oooo8     888oooo8     888oooo8    888               888
  //  888    "     888    "     888    "     888    "    888               888
  //  888       o  888          888          888       o `88b    ooo       888
  // o888ooooood8 o888o        o888o        o888ooooood8  `Y8bood8P'      o888o
  useEffect(() => {
// console.log('UPDATE')

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
      {userInfo.user_info &&
        userInfo.user_info.userInfo.type !== "admin" &&
        history.push("/explore")}


        <div
        className={clsx(classes.inputCont)}
        >
        <AddLocationMap height={'700px'} width={'100%'} setX={setX} setY={setY} setUpdate={setUpdate} update={update} x={x} y={y}/>

      <input
        type="text"
        placeholder="Enter location name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter country"
        onChange={(e) => setCountry(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter img_src"
        onChange={(e) => setImgSrc(e.target.value)}
      />

        </div>


        <div className={clsx(errorDiv ? classes.active : classes.hidden, classes.errorDiv)}>{errorDivText}</div>
      <button
      className={clsx(classes.addBtn)}
        onClick={() => {
          fetchAddLocation();
        }}
      >
        Add Location
      </button>




    </div>
  );
}
