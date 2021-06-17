import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory, useLocation, Link } from "react-router-dom";
import Charts from "./Charts";
import ManageLocations from "./ManageLocations";
import ManageDiscounts from "./ManageDiscounts";
import AddLocation from "./AddLocation";
import ManageClub from "./ManageClub";
import Inbox from "./Inbox";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import AddClubProduct from "./AddClubProduct";
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
    display: 'grid',
    gridTemplateColumns: '20% auto',
    minHeight: "calc(100vh - 70px)",
    '&>*':{
      // border: '1px solid white',
    },
    '&>:first-child':{
      backgroundColor: 'rgba(236, 217, 158,.7)',
      display: 'flex',
      flexDirection: 'column',
      // padding: '10px',
      '&>*':{
        // marginBottom: '20px',
        // border: '1px solid pink',
        padding: '15px',
        // borderRadius: 3,
        // backgroundColor: 'rgba(255,255,255,.7)',
        textDecoration: 'none',
        color: '#005552',
        fontSize: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        height: '3rem',
        '&:hover':{
          backgroundColor:'rgba(177, 236, 158,.4)'
        },
        [theme.breakpoints.down('sm')]: {
          fontSize: '.8rem',
    
        },
      }
    },
    '&>:last-child':{
      // border:'1px solid pink',
      padding: 0
    },
    width: "70%",
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      // border: '1px solid red',
    gridTemplateColumns: '100%',
    gridTemplateRows: '15rem auto',

    },
  },
  cont: {
    // width: '100%',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "linear-gradient(to right, #159957, #155799)",
    // height: '100vh',
    minHeight: "calc(100vh - 70px)",
    // boxSizing: 'border-box'
  },
  active: {
    display: "flex",
  },
  hidden: {
    display: "none",
  },
  chosenLink:{
    backgroundColor:'rgba(177, 236, 158,.4)'
  },
}));

export default function ControlPanel() {
  // oooooooooooo ooooo     ooo ooooo      ooo   .oooooo.   ooooooooooooo ooooo   .oooooo.   ooooo      ooo  .oooooo..o
  // `888'     `8 `888'     `8' `888b.     `8'  d8P'  `Y8b  8'   888   `8 `888'  d8P'  `Y8b  `888b.     `8' d8P'    `Y8
  //  888          888       8   8 `88b.    8  888               888       888  888      888  8 `88b.    8  Y88bo.
  //  888oooo8     888       8   8   `88b.  8  888               888       888  888      888  8   `88b.  8   `"Y8888o.
  //  888    "     888       8   8     `88b.8  888               888       888  888      888  8     `88b.8       `"Y88b
  //  888          `88.    .8'   8       `888  `88b    ooo       888       888  `88b    d88'  8       `888  oo     .d8P
  // o888o           `YbodP'    o8o        `8   `Y8bood8P'      o888o     o888o  `Y8bood8P'  o8o        `8  8""88888P'
  const fetchSearchExplore = async () => {
    try {
      const res = await fetch(`http://localhost:666/explore/search`, {
        method: "POST",
        body: JSON.stringify({
        //   input,
        }),
        headers: {
          "content-type": "application/json",
          authorization: localStorage.token,
        },
      });
      const data = await res.json();
      // console.log(data);

    } catch (error) {
      // console.log(error);
    }
  };
  const fetchVacations = async () => {
    try {
      const res = await fetch(`http://localhost:666/explore`, {
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
  const dispatch = useDispatch()
  const classes = useStyles();
  const location = useLocation();

  // oooooooooooo oooooooooooo oooooooooooo oooooooooooo   .oooooo.   ooooooooooooo
  // `888'     `8 `888'     `8 `888'     `8 `888'     `8  d8P'  `Y8b  8'   888   `8
  //  888          888          888          888         888               888
  //  888oooo8     888oooo8     888oooo8     888oooo8    888               888
  //  888    "     888    "     888    "     888    "    888               888
  //  888       o  888          888          888       o `88b    ooo       888
  // o888ooooood8 o888o        o888o        o888ooooood8  `Y8bood8P'      o888o
  useEffect(() => {
    // kickInvalidToken()
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
          <div
          className={clsx(classes.root)}
          >

            {(userInfo.user_info && userInfo.user_info.userInfo.type !== 'admin' && history.push('/explore'))}
            <div>
                <Link
                className={clsx( location.pathname.split('/')[2] == 'charts' && classes.chosenLink)}
                to='/controlPanel/charts'>Charts</Link>
                <Link
                className={clsx( location.pathname.split('/')[2] == 'manageLocations' && classes.chosenLink)}
                to='/controlPanel/manageLocations'>Manage Locations</Link>
                <Link
                className={clsx( location.pathname.split('/')[2] == 'manageDiscounts' && classes.chosenLink)}
                to='/controlPanel/manageDiscounts'>Manage Discounts</Link>
                <Link
                className={clsx( location.pathname.split('/')[2] == 'manageClub' && classes.chosenLink)}
                to='/controlPanel/manageClub'>Manage Club</Link>
                <Link
                className={clsx( location.pathname.split('/')[2] == 'inbox' && classes.chosenLink)}
                to='/controlPanel/inbox'>Inbox</Link>
            </div>
            <div>

            <Switch>
                <Route path='/controlPanel/charts' component={Charts} />
                <Route path='/controlPanel/manageLocations/add' exact component={AddLocation} />
                <Route path='/controlPanel/manageLocations' component={ManageLocations} />
                <Route path='/controlPanel/manageDiscounts' component={ManageDiscounts} />
                <Route path='/controlPanel/manageClub/add' exact component={AddClubProduct} />
                <Route path='/controlPanel/manageClub' component={ManageClub} />
                <Route path='/controlPanel/inbox' component={Inbox} />
            </Switch>

            </div>
          </div>
        </div>
    )
}
