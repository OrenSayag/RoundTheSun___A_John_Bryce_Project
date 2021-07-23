import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory, useLocation, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
// .oooooo..o ooooooooooooo oooooo   oooo ooooo        oooooooooooo  .oooooo..o
// d8P'    `Y8 8'   888   `8  `888.   .8'  `888'        `888'     `8 d8P'    `Y8
// Y88bo.           888        `888. .8'    888          888         Y88bo.
//  `"Y8888o.       888         `888.8'     888          888oooo8     `"Y8888o.
//      `"Y88b      888          `888'      888          888    "         `"Y88b
// oo     .d8P      888           888       888       o  888       o oo     .d8P
// 8""88888P'      o888o         o888o     o888ooooood8 o888ooooood8 8""88888P'


const useStyles = makeStyles(theme=>({
 
  root: {
    // background: "linear-gradient(45deg, #126929 30%, #c41bbc 90%)",
    // position: 'relative',
    width: "1300px",
    // marginTop: '100px',
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  cont: {
    // width: '100%',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "linear-gradient(to right, #159957, #155799)",
    // height: '100vh',
    // minHeight: "150vh",
    // boxSizing: 'border-box'
  },
  active: {
    display: "flex",
  },
  hidden: {
    display: "none",
  },
  pageTitle:{
    // border: '1px solid white',
    color: 'white',
    fontSize: '9rem',
    padding: '15px',
    textShadow: "2px 3px 5px rgba(0,0,0,0.5);",

  },
  pageHeader:{
    border: '1px solid white',
    height: '20vh',

  },
  inputCont:{
    height: '50vh',
    // border: '1px solid pink',
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: 'rgba(0, 0, 0, .3)',
    width: '70%',
    borderRadius: 3,
    alignItems: 'center',
    // position: 'relative',
    padding: '15px',


    "&>input":{
      border: 'none',
      height: '2rem',
      width: '15rem',
      borderRadius: 3,
      padding: '0 8px',
      backgroundColor: 'rgba(255,255,255, .7)',
    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;",
      outline: 'none',

    },

    "&>button":{
      border: 'none',
      padding: '20px',
      borderRadius: 3,
      background: 'rgba(66, 7, 110,.9)',
      color: 'white',
      transition: 'background .2s',
      letterSpacing: '.2mm',
      '&:hover':{
        background: 'rgba(66, 7, 110)',
    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;",
    cursor: 'pointer',

      }
    }
  },
  errorDiv:{
    backgroundColor: 'rgba(234, 108, 14, .6)',
    padding: '20px',
    borderRadius: 3,
    fontWeight: 400,
    // position: 'absolute',
    top: '20px',
  },
  guest:{
    color:'linen'
  },
  guestSpan:{
    textDecoration: 'underline'
  },
}));

export default function Login() {
  // oooooooooooo ooooo     ooo ooooo      ooo   .oooooo.   ooooooooooooo ooooo   .oooooo.   ooooo      ooo  .oooooo..o
  // `888'     `8 `888'     `8' `888b.     `8'  d8P'  `Y8b  8'   888   `8 `888'  d8P'  `Y8b  `888b.     `8' d8P'    `Y8
  //  888          888       8   8 `88b.    8  888               888       888  888      888  8 `88b.    8  Y88bo.
  //  888oooo8     888       8   8   `88b.  8  888               888       888  888      888  8   `88b.  8   `"Y8888o.
  //  888    "     888       8   8     `88b.8  888               888       888  888      888  8     `88b.8       `"Y88b
  //  888          `88.    .8'   8       `888  `88b    ooo       888       888  `88b    d88'  8       `888  oo     .d8P
  // o888o           `YbodP'    o8o        `8   `Y8bood8P'      o888o     o888o  `Y8bood8P'  o8o        `8  8""88888P'
  const fetchLogin = async () => {
    try {
      // const res = await fetch(`https://ancient-reef-92615.herokuapp.com/auth/login`, {
      const res = await fetch(`/api/auth/login`, {
      // const res = await fetch(`http://localhost:666/auth/login`, {
        method: "POST",
        body: JSON.stringify({
          mailOrUsername,
          password,
        }),
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await res.json();
      // console.log(data);

      if (data.token) {
        localStorage.token = data.token;
        dispatch({ type: "UPDATE_USERINFO" });
        history.push("/explore");
      }

      if (res.status !== 200) {
        setErrorDiv(true);
      }

      // console.log(data)
    } catch (error) {
      // console.log(error);
    }
  };
  const fetchLoginAsGuest = async () => {
    try {
      // const res = await fetch(`https://ancient-reef-92615.herokuapp.com/auth/login`, {
      const res = await fetch(`/api/auth/login`, {
      // const res = await fetch(`http://localhost:666/auth/login`, {
        method: "POST",
        body: JSON.stringify({
          mailOrUsername:'guest',
          password:'Guest123456',
        }),
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await res.json();
      // console.log(data);

      if (data.token) {
        localStorage.token = data.token;
        dispatch({ type: "UPDATE_USERINFO" });
        history.push("/explore");
      }

      if (res.status !== 200) {
        setErrorDiv(true);
      }

      // console.log(data)
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
  const [mailOrUsername, setMailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorDiv, setErrorDiv] = useState(false);

  // ooooo   ooooo   .oooooo.     .oooooo.   oooo    oooo  .oooooo..o
  // `888'   `888'  d8P'  `Y8b   d8P'  `Y8b  `888   .8P'  d8P'    `Y8
  //  888     888  888      888 888      888  888  d8'    Y88bo.
  //  888ooooo888  888      888 888      888  88888[       `"Y8888o.
  //  888     888  888      888 888      888  888`88b.         `"Y88b
  //  888     888  `88b    d88' `88b    d88'  888  `88b.  oo     .d8P
  // o888o   o888o  `Y8bood8P'   `Y8bood8P'  o888o  o888o 8""88888P'
  const dispatch = useDispatch();
  const history = useHistory();
  const userInfo = useSelector((state) => state.userInfo);
  const classes = useStyles()

                                           
//  .ooooo.   .ooooo.  ooo. .oo.    .oooo.o 
//  d88' `"Y8 d88' `88b `888P"Y88b  d88(  "8 
//  888       888   888  888   888  `"Y88b.  
//  888   .o8 888   888  888   888  o.  )88b 
//  `Y8bod8P' `Y8bod8P' o888o o888o 8""888P' 
if(!userInfo){
  return <div>Loading</div>
}                                          
if(!userInfo.user_info){
  // console.log(user)
  return <div>Loading</div>
}     
if(userInfo.user_info !== 'failed'){
history.push("/landing")

}                                     

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
      <div
        className={clsx(classes.root)}
      >
      {/* {userInfo &&
        userInfo.user_info &&
        userInfo.user_info !== "fail" &&
        history.push("/landing")} */}

        {/* <div
        className={clsx(classes.pageHeader)}
        >
      <div
      className={clsx(classes.pageTitle)}
      >Login</div>

        </div> */}
      <div
      className={clsx(classes.inputCont)}
      >
        <div className={clsx(errorDiv ? classes.active : classes.hidden, classes.errorDiv)}>
          Wrong username or password.
        </div>
        <input
          type="text"
          placeholder="Username/mail"
          onChange={(e) => setMailOrUsername(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchLogin();
            }
          }}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchLogin();
            }
          }}
        />
      <button onClick={() => fetchLogin()}
      >Login</button>
      <div className={clsx(classes.guest)}>Or continue as <span
      onClick={()=>fetchLoginAsGuest()}
      className ={clsx(classes.guestSpan)}>guest</span></div>
      </div>
     
    {/* <div className="info">
      <div>username: guest</div>
      <div>password: Guest123456</div>
      <br />
      <div>username: admin</div>
      <div>password: 12345678Aa</div>
      <br />
      <div>This is a portfolio app of Oren Sayag, junior fullstack web developer.</div>
      <div>Built with react, node.js, express.js, mysql.</div>
    </div> */}
    </div>
    </div>
  );
}
