import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory, useLocation, Link } from "react-router-dom";
import MCUnit from "./MCUnit";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import numberWithCommas from "../tools/numberWithCommas";

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
    // marginTop: '100px',
    width: "70%",
    [theme.breakpoints.down('sm')]: {
      padding: '5px',
      width: 'calc(100% - 40px)',
      padding: '20px',
    },
  },
  cont: {
    // width: '100%',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "linear-gradient(to right, #159957, #155799)",
    // height: '100vh',
    minHeight: "150vh",
    // boxSizing: 'border-box'
  },
  active: {
    display: "flex",
  },
  hidden: {
    display: "none",
  },
  pageTitle: {
    display: "flex",
    justifyContent: "center",
    fontSize: "3rem",
    color: "white",
    textShadow:
      "0px 4px 3px rgba(0,0,0,0.4), 0px 8px 13px rgba(0,0,0,0.1), 0px 18px 23px rgba(0,0,0,0.1)",
  },
  sell: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "2rem",
    color: "gold",
    textShadow:
      "0px 4px 3px rgba(0,0,0,0.4), 0px 8px 13px rgba(0,0,0,0.1), 0px 18px 23px rgba(0,0,0,0.1)",
    backgroundColor: "blue",
    height: "80vh",
    // padding: '50px',
    boxSizing: "border-box",
    backgroundImage: 'url("sell/club.jpg")',
    backgroundSize: "cover",
    backgroundPosition: 'center',
    marginTop: "20px",
    width: "100%",
    position: "relative",
    textTransform: "uppercase",
    letterSpacing: ".7mm",
    borderRadius: 3,
    "&>*>*": {
      backgroundColor: "rgba(0,0,0,.2)",
      borderRadius: 3,
      [theme.breakpoints.down('sm')]: {
        position: 'static',
        textAlign: 'center',
        width: '100%',
        left: 0,
      },
    },
    zIndex: 1,


  },
  sellLove: {
    position: "absolute",
    top: "50px",
    left: "50px",
    "&>span": {
      color: "red",
    },
    [theme.breakpoints.down('sm')]: {
      left: '0'
    },
  },
  sellSpend: {
    position: "absolute",
    bottom: "50px",
    right: "50px",
    "&>span": {
      color: "pink",
    },
  },
  sellEarn: {
    "&>span": {
      color: "#3DCE1A",
      fontWeight: 600,
    },
  },
  clubProds: {
    // backgroundColor: '#D33EF3',
    backgroundColor: "rgba(64, 25, 176)",
    marginTop: "15px",
    borderRadius: 3,
    opacity: 0.9,
    height: "100%",
    position: "relative",
    padding: '15px'
  },
  clubPordsFilter: {
    borderRadius: 3,
    backgroundColor: "rgba(51, 17, 15,      .5)",
    position: "relative",
    // height: '100%',
    width: "100%",
    border: "1px solid black",
    zIndex: 3,
  },
  yourCreditsCont: {
    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;",
    position: "absolute",
    top: "20px",
    right: "20px",
    backgroundColor: "linen",
    padding: "10px",
    borderRadius: 3,
    textTransform: "uppercase",
    letterSpacing: ".1mm",
    // textShadow:
    // "0px 4px 3px rgba(0,0,0,0.4), 0px 8px 13px rgba(0,0,0,0.1), 0px 18px 23px rgba(0,0,0,0.1)",
    // zIndex: 99999,
    "&>:first-child": {
      marginBottom: "5px",
    },
    "&>:last-child": {
      display: "flex",
      justifyContent: "center",
    },
  },
  clubProductsTitle: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
    fontSize: "2rem",
  },
  test: {
    height: "120px",
  },
  unitCont:{
    width: '100%',
    // border: '1px solid white',
    display: 'flex',
    justifyContent: 'center',
  },
  prodCont:{
    padding: '5px',
  }
}));

export default function Club() {
  // oooooooooooo ooooo     ooo ooooo      ooo   .oooooo.   ooooooooooooo ooooo   .oooooo.   ooooo      ooo  .oooooo..o
  // `888'     `8 `888'     `8' `888b.     `8'  d8P'  `Y8b  8'   888   `8 `888'  d8P'  `Y8b  `888b.     `8' d8P'    `Y8
  //  888          888       8   8 `88b.    8  888               888       888  888      888  8 `88b.    8  Y88bo.
  //  888oooo8     888       8   8   `88b.  8  888               888       888  888      888  8   `88b.  8   `"Y8888o.
  //  888    "     888       8   8     `88b.8  888               888       888  888      888  8     `88b.8       `"Y88b
  //  888          `88.    .8'   8       `888  `88b    ooo       888       888  `88b    d88'  8       `888  oo     .d8P
  // o888o           `YbodP'    o8o        `8   `Y8bood8P'      o888o     o888o  `Y8bood8P'  o8o        `8  8""88888P'
  const fetchClubProds = async () => {
    try {
      const res = await fetch(`https://ancient-reef-92615.herokuapp.com/club/creditProds`, {
      // const res = await fetch(`http://localhost:666/club/creditProds`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: localStorage.token,
        },
      });

      if (res.status === 500) {
        return console.log("server error");
      }

      const data = await res.json();
      setClubProds(data.clubProducts);
    } catch (error) {
      // console.log(error);
    }
  };
  const fetchUserCredits = async () => {
    try {
      const res = await fetch(`https://ancient-reef-92615.herokuapp.com/club/userCredits`, {
      // const res = await fetch(`http://localhost:666/club/userCredits`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: localStorage.token,
        },
      });

      if (res.status === 500) {
        // return console.log("server error");
      }

      const data = await res.json();
      // console.log(data);
      setUserCredits(data.userCredits);
    } catch (error) {
      // console.log(error);
    }
  };
  const kickInvalidToken = () =>{
    dispatch({ type: "UPDATE_USERINFO" })
    
    
    userInfo && userInfo.user_info && userInfo.user_info=='failed'&&history.push('/landing')
  }
  //  .oooooo..o ooooooooooooo       .o.       ooooooooooooo oooooooooooo
  //  d8P'    `Y8 8'   888   `8      .888.      8'   888   `8 `888'     `8
  //  Y88bo.           888          .8"888.          888       888
  //   `"Y8888o.       888         .8' `888.         888       888oooo8
  //       `"Y88b      888        .88ooo8888.        888       888    "
  //  oo     .d8P      888       .8'     `888.       888       888       o
  //  8""88888P'      o888o     o88o     o8888o     o888o     o888ooooood8
  const [update, setUpdate] = useState(false);
  const [clubProds, setClubProds] = useState([]);
  const [userCredits, setUserCredits] = useState();
  
  
  // ooooo   ooooo   .oooooo.     .oooooo.   oooo    oooo  .oooooo..o
  // `888'   `888'  d8P'  `Y8b   d8P'  `Y8b  `888   .8P'  d8P'    `Y8
  //  888     888  888      888 888      888  888  d8'    Y88bo.
  //  888ooooo888  888      888 888      888  88888[       `"Y8888o.
  //  888     888  888      888 888      888  888`88b.         `"Y88b
  //  888     888  `88b    d88' `88b    d88'  888  `88b.  oo     .d8P
  // o888o   o888o  `Y8bood8P'   `Y8bood8P'  o888o  o888o 8""88888P'
  const userInfo = useSelector((state) => state.userInfo);
  const classes = useStyles();
  const history = useHistory()
  const dispatch = useDispatch()

  // oooooooooooo oooooooooooo oooooooooooo oooooooooooo   .oooooo.   ooooooooooooo
  // `888'     `8 `888'     `8 `888'     `8 `888'     `8  d8P'  `Y8b  8'   888   `8
  //  888          888          888          888         888               888
  //  888oooo8     888oooo8     888oooo8     888oooo8    888               888
  //  888    "     888    "     888    "     888    "    888               888
  //  888       o  888          888          888       o `88b    ooo       888
  // o888ooooood8 o888o        o888o        o888ooooood8  `Y8bood8P'      o888o
  useEffect(() => {
    fetchUserCredits();
    fetchClubProds();
    // kickInvalidToken()
  }, [update]);

  //   .oooooo.     .oooooo.   ooooo      ooo oooooooooo.   ooooo ooooooooooooo ooooo   .oooooo.   ooooo      ooo oooooooooooo ooooooooo.
  //  d8P'  `Y8b   d8P'  `Y8b  `888b.     `8' `888'   `Y8b  `888' 8'   888   `8 `888'  d8P'  `Y8b  `888b.     `8' `888'     `8 `888   `Y88.
  // 888          888      888  8 `88b.    8   888      888  888       888       888  888      888  8 `88b.    8   888          888   .d88'
  // 888          888      888  8   `88b.  8   888      888  888       888       888  888      888  8   `88b.  8   888oooo8     888ooo88P'
  // 888          888      888  8     `88b.8   888      888  888       888       888  888      888  8     `88b.8   888    "     888`88b.
  // `88b    ooo  `88b    d88'  8       `888   888     d88'  888       888       888  `88b    d88'  8       `888   888       o  888  `88b.
  //  `Y8bood8P'   `Y8bood8P'  o8o        `8  o888bood8P'   o888o     o888o     o888o  `Y8bood8P'  o8o        `8  o888ooooood8 o888o  o888o
  if (!userInfo) {
    return <div>Loading</div>;
  }
  if (!userInfo.user_info) {
    return <div>Loading</div>;
  }
  if (
    (!userCredits || !clubProds) &&
    !userInfo.user_info.userInfo.type === "admin"
  ) {
    return <div>Loading</div>;
  }
  const userCreditsDisplayDiv = () => {
    if (userInfo.user_info.userInfo.type !== "admin") {
      return (
        <div>
          <div className={clsx(classes.yourCreditsCont)}>
            <div>Your Credits:</div>
            <div>{userCredits && numberWithCommas(userCredits) || 0}</div>
          </div>
        </div>
      );
    }
  };
  // const travelHistoryDisplayDiv = () => {
  //   if(userInfo.user_info.userInfo.type!=='admin'){
  //       return <div>
  //           <div>Purchase History</div>

  //       </div>
  //   }
  // }

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
        <div className={clsx(classes.sell)}>
          <div>
            <div className={clsx(classes.sellLove)}>
              We <span>love</span> our friends.
            </div>
            <div className={clsx(classes.sellEarn)}>
              Earn <span>Club Credits</span> for traveling with us
            </div>
            <div className={clsx(classes.sellSpend)}>
              and <span>spend</span> it on more vacations!
            </div>
          </div>
        </div>

        <div className={clsx(classes.clubProds)}>
            <div className={clsx(classes.test)}>
              
            </div>
          <Grid container
          className={clsx(classes.prodCont)}
          spacing={3} 
          >
            {/* <div
                className={clsx(classes.clubPordsFilter)}
                >
                  </div> */}
            {/* <div
                    className={clsx(classes.clubProductsTitle)}
                    >Club Products</div> */}
            {userCreditsDisplayDiv()}
            {clubProds.map((clubProduct) => (
              <Grid key={clubProduct.id}  item xs={12} sm={12} >
                <div className={clsx(classes.unitCont)}>
                <MCUnit
                  display={true}
                  className={clsx(classes.unit)}
                  clubProduct={clubProduct}
                  update={update}
                  setUpdate={setUpdate}
                />
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
          <div className={clsx(classes.test)}></div>
      </div>
    </div>
  );
}
