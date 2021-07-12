import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory, useLocation } from "react-router";
import Header from './components/Header'
import Signup from './components/Signup'
import Login from './components/Login'
import Footer from './components/Footer'
import Landing from './components/Landing'
import Pay from './components/Pay'
import Plan from './components/Plan'
import Club from './components/Club'
import Profile from './components/Profile'
import LocationPage from './components/LocationPage'
import FavoriteLocations from './components/FavoriteLocations'
import ControlPanel from './components/ControlPanel'
import Explore from './components/Explore'
import AddVacation from './components/AddVacation'
import AddLocation from './components/AddLocation'
import { Link } from "react-router-dom";
import AddClubProduct from "./components/AddClubProduct";
import Conversation from "./components/Conversation";
import ContactUs from "./components/ContactUs";
import Blog from "./components/Blog";
import VacationPage from "./components/VacationPage";
import AddBlogPost from "./components/AddBlogPost";
import { makeStyles } from "@material-ui/core/styles";
import clsx from 'clsx'

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
    width: '100%',
    overflowX: 'hidden',
    minHeight: "100vh"
  },
  cont:{
    // width: '100%',
    display: 'flex',
    justifyContent: 'center',
    background:'linear-gradient(to right, #159957, #155799)',
    // height: '100vh',
    overflowX: 'hidden',
    minHeight: '100vh',
    // boxSizing: 'border-box'
    // overflowX: 'hidden'
  },
});

export default function App() {

  // ooooo   ooooo   .oooooo.     .oooooo.   oooo    oooo  .oooooo..o
  // `888'   `888'  d8P'  `Y8b   d8P'  `Y8b  `888   .8P'  d8P'    `Y8
  //  888     888  888      888 888      888  888  d8'    Y88bo.
  //  888ooooo888  888      888 888      888  88888[       `"Y8888o.
  //  888     888  888      888 888      888  888`88b.         `"Y88b
  //  888     888  `88b    d88' `88b    d88'  888  `88b.  oo     .d8P
  // o888o   o888o  `Y8bood8P'   `Y8bood8P'  o888o  o888o 8""88888P'
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation()
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
    dispatch({ type: "UPDATE_USERINFO" })
    dispatch({ type: "PROFILE_PICS_RUN" })
  }, []);



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
      {(userInfo.user_info == 'failed' && (location.pathname!=='/landing' && location.pathname!=='/login' && location.pathname!=='/signup' && location.pathname!=='/blog' && location.pathname!=='/contactUs')) && history.push('/landing')}
      {/* {console.\log('userInfo:',userInfo.user_info)} */}
      <Header />
      <Switch>
        <Route path="/signup" exact component={Signup}/> {/* if good token kick */}
        <Route path="/login" exact component={Login} />{/* if good token kick */}

        <Route path="/plan" exact component={Plan}/>
        <Route path="/pay/clubProduct/:id" exact component={Pay}/> {/*user only*/}
        <Route path="/pay/vacation/:id" exact component={Pay}/> {/*user only*/}
        <Route path="/club" exact component={Club}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/location/:id" exact component={LocationPage}/>
        <Route path="/vacation/:id" exact component={VacationPage} userInfo={userInfo}/>
        <Route path="/favoriteLocations" exact component={FavoriteLocations}/> {/*user only*/}

        {/* <Route path="/controlPanel/manageClub/add" exact component={AddClubProduct}/> */}
        {/* <Route path="/controlPanel/inbox/conversation/:userId" exact component={Conversation}/> */}

        <Route path="/controlPanel" component={ControlPanel}/> {/*admin only*/}
        <Route path="/explore" exact component={()=><div className={clsx(classes.cont)}>{Explore()}</div>}/>
        <Route path="/explore/add" exact component={AddVacation}/>
        <Route path="/contactUs" exact component={ContactUs}/>
        <Route path="/blog" exact component={Blog}/>
        <Route path="/blog/newPost" exact component={AddBlogPost}/>

        <Route path="/" component={Landing}/>
      </Switch>
      <Footer />
  </div>
  );
}
