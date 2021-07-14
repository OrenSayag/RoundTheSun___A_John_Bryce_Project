import clsx from "clsx";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory, useLocation, Link } from "react-router-dom";
import VacationUnit from "./VacationUnit";
import { makeStyles } from "@material-ui/core/styles";
import ArrowForward from "@material-ui/icons/ArrowForward";
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
    width: "70%",
    // marginTop: '100px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
    minHeight: "150vh",
    padding: '0',
    // border: '1px solid pink',
    [theme.breakpoints.down('sm')]: {
      padding: '5px'
    },
    // boxSizing: 'border-box'
  },
  active: {
    display: "flex",
  },
  hidden: {
    display: "none",
  },
  imgCont: {
    // border: '1px solid white',
    height: "50vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  img: {
    borderRadius: "50%",
    height: "50%",
    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px;",
  },
  flnameDisplay: {
    fontSize: "4rem",
    marginTop: "30px",
    color: "white",
    fontWeight: 600,
    textShadow: "2px 3px 5px rgba(0,0,0,0.5);",
    [theme.breakpoints.down('sm')]: {
      fontSize: '2rem',
      // border: '1px solid white',
    },
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
      color: "#3DCE1A",
      fontWeight: 600,
      display: "flex",
      justifyContent: "center",
    },
    "&>:last-child": {
      display: "flex",
      justifyContent: "center",
    },
    [theme.breakpoints.down('sm')]: {
      position: 'static',
      width: 'calc(100% - 20px)'
    },
  },
  botCont: {
    position: "relative",
    width: '100%',
    // border: '1px solid white',
  },
  upcomingVacationsCont: {
    // border: '1px solid pink',
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    flexDirection: "column",
  },
  ambiTitle: {
    backgroundColor: "white",
    height: "2.2rem",
    margin: "20px 0 50px 0",
    display: "flex",
    alignItems: "center",
    padding: "20px",
    borderRadius: 3,
    fontSize: "1.5rem",
    width: "fit-content",
    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 40px)',
      justifyContent: 'center',
    },
  },
  upcomingVacation: {
    display: "grid",
    // border: '1px solid red',
    gridTemplateColumns: "35% 35% 30%",
    minHeight: "100px",
    minHeight: "fit-content",
    marginBottom: "50px",
    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",

    "&>*": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderLeft: "1px solid #B7EEB7",
      borderRight: "1px solid #B7EEB7",
      padding: "5px",
      textAlign: 'center'
    },
    "&>:first-child": {
      borderLeft: "none",
    },
    "&>:last-child": {
      borderRight: "none",
      justifyContent: "space-evenly",
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',

        
      },
      // padding: '0 100px  '
    },
    // background: 'linear-gradient(to right, #654ea3, #eaafc8);',
    backgroundColor: "#654ea3",
    // backgroundColor: 'linear-gradient(to right, red , yellow);',
    borderRadius: 3,
    fontSize: "1.5rem",
    padding: "15px",
    width: "99%",
    boxSizing: "border-box",
    color: "#B7EEB7",

    [theme.breakpoints.down('sm')]: {
      padding: '1px',
      fontSize: '1rem',
      
    },
  },
  link: {
    cursor: "pointer",
  },
  purchase: {
    // border: '1px solid white',
    // backgroundColor: 'blue',
    display: "grid",
    gridTemplateColumns: "25% 25% 25% 25%",
    "&>*": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderTop: "2px solid #B7EEB7",
      borderRight: "2px solid #B7EEB7",
      padding: "5px",
      flexDirection: 'column',
      // height: '50px',
    },
    "&>:last-child": {
      borderRight: "none",
    },
    borderRadius: 3,
    backgroundColor: "#B9B684",
    minHeight: "4rem",
    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
  },
  tableTitle: {
    backgroundColor: "#959367",
    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
    textAlign:'center',
    height: "4rem",
    display: "grid",
    gridTemplateColumns: "25% 25% 25% 25%",
    borderRadius: 3,
    "&>*": {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      // borderBottom: '2px solid #B7EEB7',
      borderRight: "2px solid #B7EEB7",
      padding: "5px",
      // height: '50px',
    },
    "&>:last-child": {
      borderRight: "none",
    },
    [theme.breakpoints.down('sm')]: {
      
      
    },
  },
  err: {
    backgroundColor: "#2B04CB    ",
    width: "fit-content",
    padding: "15px",
    borderRadius: 3,
    margin: "15px 0",
    color: "linen",
    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
    letterSpacing: ".5mm",
  },
  purchaseHistoryRoot:{
    marginBottom: '50px',
  },
  incomeVacationCell:{
    display: 'flex',
    flexDirection: 'column',
    
    '&>*':{
      margin: '5px 0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    '&>:nth-child(2)':{
      borderTop: '1px solid gray',
      borderBottom: '1px solid gray',
      width: '90%',
      padding: '2px 0',
    }
  },
  incomeDiv:{
    width: '100%',
    // border: '1px solid blue;',

  }
}));

export default function Profile() {
  // oooooooooooo ooooo     ooo ooooo      ooo   .oooooo.   ooooooooooooo ooooo   .oooooo.   ooooo      ooo  .oooooo..o
  // `888'     `8 `888'     `8' `888b.     `8'  d8P'  `Y8b  8'   888   `8 `888'  d8P'  `Y8b  `888b.     `8' d8P'    `Y8
  //  888          888       8   8 `88b.    8  888               888       888  888      888  8 `88b.    8  Y88bo.
  //  888oooo8     888       8   8   `88b.  8  888               888       888  888      888  8   `88b.  8   `"Y8888o.
  //  888    "     888       8   8     `88b.8  888               888       888  888      888  8     `88b.8       `"Y88b
  //  888          `88.    .8'   8       `888  `88b    ooo       888       888  `88b    d88'  8       `888  oo     .d8P
  // o888o           `YbodP'    o8o        `8   `Y8bood8P'      o888o     o888o  `Y8bood8P'  o8o        `8  8""88888P'
  const fetchProfileData = async () => {
    try {
      // const res = await fetch(`https://ancient-reef-92615.herokuapp.com/profile`, {
      const res = await fetch(`/api/profile`, {
      // const res = await fetch(`http://localhost:666/profile`, {
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

      setIncome(data.purchaseHistory);
      setPurchaseHistory(data.purchaseHistory);
      setUpcomingVacations(data.upcomingVacations);
      setProfileInfo(data.userInfo);
    } catch (error) {
      // console.log(error);
    }
  };
  const fetchUserCredits = async () => {
    try {
      // const res = await fetch(`https://ancient-reef-92615.herokuapp.com/club/userCredits`, {
      const res = await fetch(`/api/club/userCredits`, {
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
      console.log(data);
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
  const [income, setIncome] = useState([]);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [upcomingVacations, setUpcomingVacations] = useState([]);
  const [credits, setCredits] = useState(0);
  const [profileInfo, setProfileInfo] = useState([]);
  const [update, setUpdate] = useState(false);
  const [userCredits, setUserCredits] = useState(0)

  // ooooo   ooooo   .oooooo.     .oooooo.   oooo    oooo  .oooooo..o
  // `888'   `888'  d8P'  `Y8b   d8P'  `Y8b  `888   .8P'  d8P'    `Y8
  //  888     888  888      888 888      888  888  d8'    Y88bo.
  //  888ooooo888  888      888 888      888  88888[       `"Y8888o.
  //  888     888  888      888 888      888  888`88b.         `"Y88b
  //  888     888  `88b    d88' `88b    d88'  888  `88b.  oo     .d8P
  // o888o   o888o  `Y8bood8P'   `Y8bood8P'  o888o  o888o 8""88888P'
  const userInfo = useSelector((state) => state.userInfo);
  const classes = useStyles();
  const memberPic = useSelector((state) => state.profilePicsReducer.memberPic);
  const history = useHistory();
  const dispatch = useDispatch()

  // oooooooooooo oooooooooooo oooooooooooo oooooooooooo   .oooooo.   ooooooooooooo
  // `888'     `8 `888'     `8 `888'     `8 `888'     `8  d8P'  `Y8b  8'   888   `8
  //  888          888          888          888         888               888
  //  888oooo8     888oooo8     888oooo8     888oooo8    888               888
  //  888    "     888    "     888    "     888    "    888               888
  //  888       o  888          888          888       o `88b    ooo       888
  // o888ooooood8 o888o        o888o        o888ooooood8  `Y8bood8P'      o888o
  useEffect(() => {
    fetchProfileData();
    fetchUserCredits();
    // kickInvalidToken();
  }, [update]);

  //   .oooooo.     .oooooo.   ooooo      ooo oooooooooo.   ooooo ooooooooooooo ooooo   .oooooo.   ooooo      ooo oooooooooooo ooooooooo.
  //  d8P'  `Y8b   d8P'  `Y8b  `888b.     `8' `888'   `Y8b  `888' 8'   888   `8 `888'  d8P'  `Y8b  `888b.     `8' `888'     `8 `888   `Y88.
  // 888          888      888  8 `88b.    8   888      888  888       888       888  888      888  8 `88b.    8   888          888   .d88'
  // 888          888      888  8   `88b.  8   888      888  888       888       888  888      888  8   `88b.  8   888oooo8     888ooo88P'
  // 888          888      888  8     `88b.8   888      888  888       888       888  888      888  8     `88b.8   888    "     888`88b.
  // `88b    ooo  `88b    d88'  8       `888   888     d88'  888       888       888  `88b    d88'  8       `888   888       o  888  `88b.
  //  `Y8bood8P'   `Y8bood8P'  o8o        `8  o888bood8P'   o888o     o888o     o888o  `Y8bood8P'  o8o        `8  o888ooooood8 o888o  o888o
  if (
    !userInfo ||
    ((!purchaseHistory || !upcomingVacations || credits === undefined) &&
      !income)
  ) {
    return <div>Loading</div>;
  }
  if (!userInfo.user_info) {
    return <div>Loading</div>;
  }
  const clubCreditsDisplay = () => {
    if (userInfo.user_info.userInfo.type !== "admin") {
      return (
        <div className={clsx(classes.yourCreditsCont)}>
          <div>Club Credits:</div>
          <div>{userCredits && numberWithCommas(userCredits) || "0"}</div>
        </div>
      );
    }
  };
  const travelHistoryDisplayDiv = () => {
    if (userInfo.user_info.userInfo.type !== "admin") {
      return (
        <div className={clsx(classes.purchaseHistoryRoot)}>
          <div className={clsx(classes.ambiTitle)}>Purchase History</div>
          {purchaseHistory.length > 0 ? (
            <div>
              <div className={clsx(classes.tableTitle)}>
                <div>Name</div>
                <div>Price</div>
                <div>Dates</div>
                <div>Purchased On</div>
              </div>
              {purchaseHistory.map((purchase) => (
                <div key={purchase.id} className={clsx(classes.purchase)}>
                  <div>
                    {purchase.vacation_name || purchase.club_product_name} ({purchase.location_name} ,{purchase.country})
                  </div>
                  <div>
                    {purchase.vacation_id ? `$` : ""}
                    {purchase.amount_of_currency && numberWithCommas(purchase.amount_of_currency)}
                    {!purchase.vacation_id && " Club Credits"}
                  </div>
                  <div
                  
                  >
                    <div>
                      {moment(
                        purchase.start_date || purchase.CBStart_date
                      ).format("DD/MM/YYYY")}
                    </div>
                    <ArrowForward />
                    <div>
                      {moment(purchase.end_date || purchase.CBEnd_date).format(
                        "DD/MM/YYYY"
                      )}
                    </div>
                  </div>
                  <div>
                    {moment(purchase.date).format("DD/MM/YYYY, HH:mm")}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={clsx(classes.err)}> Take the step! </div>
          )}
        </div>
      );
    }
  };

  const upcomingVacationsDiv = () => {
    if (userInfo.user_info.userInfo.type !== "admin") {
      return (
        <div className={clsx(classes.upcomingVacationsCont)}>
          <div className={clsx(classes.ambiTitle)}>Upcoming Vacations</div>
          {upcomingVacations.length > 0 ? (
            <div>
              {upcomingVacations.map((vacation) => (
                <div key={vacation.id} className={clsx(classes.upcomingVacation)}>
                  {/* {console.log(vacation)} */}
                  <div
                    className={clsx(classes.link)}
                    onClick={() => {
                      history.push(`/vacation/${vacation.vacation_id}`);
                    }}
                  >
                    {vacation.vacation_name || vacation.club_product_name}
                  </div>
                  <div
                    className={clsx(classes.link)}
                    onClick={() => {
                      history.push(`/location/${vacation.location_id}`);
                    }}
                  >{`${vacation.location_name}, ${vacation.country}`}</div>
                  <div>
                    <div>
                      {moment(
                        vacation.start_date || vacation.CBStart_date
                      ).format("DD/MM/YYYY")}{" "}
                    </div>
                    <ArrowForward />
                    <div>
                      {moment(vacation.end_date || vacation.CBEnd_date).format(
                        "DD/MM/YYYY"
                      )}{" "}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={clsx(classes.err)}> Nothing coming up! </div>
          )}
        </div>
      );
    }
  };

  const incomeDiv = () => {
    if (userInfo.user_info.userInfo.type === "admin") {
      return (
        <div
        className={clsx(classes.incomeDiv)}
        >
          <div
          className={clsx(classes.ambiTitle)}
          >Purchase History:</div>

          <div>
          <div className={clsx(classes.tableTitle)}>
                <div>Vacation</div>
                <div>Price</div>
                <div>By User(id)</div>
                <div>Purchased On</div>
              </div>
            {income.map((vacation) => (
              <div
              key={vacation.id}
              className={clsx(classes.purchase)}
              >
                <div
                className={clsx(classes.incomeVacationCell)}
                >
                  <div>{vacation.vacation_name || vacation.club_product_name}</div>
                  <div>{`${vacation.location_name}, ${vacation.country}`}</div>
                  <div
                  
                  className={clsx(classes.incomeVacationCell)}
                  >

                    {moment(
                      vacation.start_date || vacation.CBStart_date
                    ).format("DD/MM/YYYY")}{" "}
                  <ArrowForward />

                   
                    {moment(vacation.end_date || vacation.CBEnd_date).format(
                      "DD/MM/YYYY"
                    )}{" "}
                  </div>
                </div>
                  <div>
                    {vacation.vacation_id ? `$` : ""}
                    {vacation.amount_of_currency}
                    {!vacation.vacation_id && " Club Credits"}
                  </div>
                  <div>{vacation.user_id}</div>
                  <div>
                   {moment(vacation.date).format("DD/MM/YYYY, HH:mm")}
                  </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
  };

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
        <div className={clsx(classes.imgCont)}>
          <img
            className={clsx(classes.img)}
            src={userInfo.user_info.userInfo.img_src || memberPic } alt="Profile Pic"
            // src={"/profilePics/member2.jpg"}
            alt="Profile Pic"
          />
          <div className={clsx(classes.flnameDisplay)}>
            {profileInfo.f_name} {profileInfo.l_name}
          </div>
      </div>

        <div className={clsx(classes.botCont)}>
          {clubCreditsDisplay()}

          {upcomingVacationsDiv()}
          {travelHistoryDisplayDiv()}
          {incomeDiv()}
        </div>
      </div>
    </div>
  );
}
