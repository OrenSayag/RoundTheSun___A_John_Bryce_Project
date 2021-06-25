import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory, useLocation, Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx'
import defaultProfilePic from '../imgs/defaultProfilePic.png'
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';


// .oooooo..o ooooooooooooo oooooo   oooo ooooo        oooooooooooo  .oooooo..o 
// d8P'    `Y8 8'   888   `8  `888.   .8'  `888'        `888'     `8 d8P'    `Y8 
// Y88bo.           888        `888. .8'    888          888         Y88bo.      
//  `"Y8888o.       888         `888.8'     888          888oooo8     `"Y8888o.  
//      `"Y88b      888          `888'      888          888    "         `"Y88b 
// oo     .d8P      888           888       888       o  888       o oo     .d8P 
// 8""88888P'      o888o         o888o     o888ooooood8 o888ooooood8 8""88888P'  
const useStyles = makeStyles(theme=>({
  root: {
    background: 'linear-gradient(45deg, #126929 30%, #c41bbc 90%)',
    // background: '#126929',
    // border: '1px solid white',
    // borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: '70px',
    width: '98%',
    padding: '0 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: 'rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;',
    position: 'relative',
    // width: '100vw',
    '& > *': {
      textDecoration: 'none',
      color: 'white',
      // border: '1px solid pink',
      // padding: 0,
      // width: '100%',
    },
    '& > * > *': {
      textDecoration: 'none',
      color: 'white',
      // border: '1px solid red',
      // padding: 0,
      // width: '100%',
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      minHeight: '140px',
      padding: '0',
      width: '100%',
    },
    '& *':{
      // border: '1px solid yellow',
      // padding: '0',
      // margin: '0',
    }
  },
  mid: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'green',
    width: '70%',
    height:'140px',
    position: 'relative',
    // border:'1px solid white',
    '& > *': {
      textDecoration: 'none',
      color: 'white',
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      height: '70px',
      padding: '0',
      width: '100%',

    },
  },
  logo:{
    top: 'auto',
    // top: 'auto',
    left: '15px',
    textDecoration: 'none',
    color: 'white',
    letterSpacing: '.2mm',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      // position: 'initial',
      height: '140px',
      alignItems: 'center',
      justifyContent: 'center',
    },
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      // border: '1px solid red',
      // position: 'absolute',
      height: '70px',
      width: '250px',

      // width:'150px',
      alignItems: 'center',

    },
  },
  midLeft:{
    display: 'flex',
    padding: '0 15px',
    justifyContent: 'space-between',
    // backgroundColor: 'gray',
    height: '70px',
    alignItems: 'center',
    width: '25%',

    '& > *':{
      textDecoration: 'none',
      color: 'white',
      // border: '1px solid pink',
      height: '70px'
    },

    [theme.breakpoints.down('sm')]: {
      padding: '0',
    },
  },
  midRight:{
    display: 'flex',
    justifyContent: 'space-between',
    // backgroundColor: 'gray',
    padding: '0 15px',
    width: '20%',
    
    '& > *':{
      // border: '1px solid yellow',
      textDecoration: 'none',
      color: 'white',
      // border: '1px solid red',

    },
    '&>*>*':{
      // border: '1px solid yellow',

    },

    alignItems: 'center',
    height: '70px',
    [theme.breakpoints.down('sm')]: {
      padding: '0',
    },
  },
  unloggedBar: {
    display: 'flex',
    justifyContent: 'space-between',
    // backgroundColor: 'gray',
    padding: '0 15px',
    width: '20%',
    '& > *':{
      textDecoration: 'none',
      color: 'white',
      // border: '1px solid white',
      width: '33%',
      height: '70px',
    },
    alignItems: 'center',
    height: '70px', // always set manually equal to root
    // position: 'absolute',
    right: '20px',
    [theme.breakpoints.down('sm')]: {
      position: 'initial',
      width: '100%',
      padding: '0'
    },
  },
  midRightIn: {
    width: '100%',
    height: '70px',
    alignItems: 'center',
    '& > *': {
      alignItems: 'center',
      display: 'flex',
      height: '70px',
    }
  },
  flexSB: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  white:{
    backgroundColor: 'white',
  },
  profilePic:{
    height: '60px',
    borderRadius: '50%',
    marginLeft: '15px'
  },
  burgerMenu: {
    position: 'absolute',
    backgroundColor: 'green',
    height: 'fit-content',
    borderRadius: 3,
    width: '100px',
    right: 0,
    top: '30px',
    display: 'flex',
    flexDirection: 'column',
    // padding: '0 10px',
    // paddingTop: '40px',
    transition: 'width .3s, height .3s',
    '& > *':{
      // marginTop: '10px'
    },
    zIndex: 3,
    // animation:'$slide 1s linear',
    // transform: 'rotate(180deg)'
    [theme.breakpoints.down('sm')]: {
      top: 0
      
    },
  },
  firstBurgerLink:{
    marginTop: '70px'
  },
  active: {
    display: 'flex'
  },
  hidden: {
    // display: 'none'
    width: 0,
    height: 0,
  },
  close: {
    position: 'absolute',
    right: '15px',
    top: '22px',
    cursor: 'point',
    // transform: 'rotate(120deg)',
    
  },
  hoverLink: {
    // backgroundColor: 'blue',
    // height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 10px',
    transition: 'background .1s',
    '&:hover':{
      backgroundColor:'#E57008',
    }
  },
  menuLink: {
    textDecoration: 'none',
    color: 'white',
    // border: '1px solid white',
    display: 'flex',
    justifyContent: 'start',
    height: '70px',
    // backgroundColor: 'blue'
  },
  
  logout: {
    color: 'white',
    cursor: 'point',
    '&:hover':{
      backgroundColor:'red',
    }
  },
  chosenLink:{
    backgroundColor:'#E57008',
  },
  profileLinkFather:{
    // height: '50px',
    padding: 0,
    height: '70px',
    // marginRight: '20px',
  },
  phoneBar:{
    [theme.breakpoints.down('sm')]: {
      flexDirection:'column-reverse',
      minHeight: '140px',
      padding: '0',
      '&>*':{
        width: '100%',
      },
    },
  },
  phoneKiller:{
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  phoneRowReverse:{
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'row-reverse'
    },
  },
  hoverLinkProfilePhone:{
    textDecoration: 'underline',
    backgroundColor: "transparent",
    
  
  },
}));

export default function Header() {
  // oooooooooooo ooooo     ooo ooooo      ooo   .oooooo.   ooooooooooooo ooooo   .oooooo.   ooooo      ooo  .oooooo..o
  // `888'     `8 `888'     `8' `888b.     `8'  d8P'  `Y8b  8'   888   `8 `888'  d8P'  `Y8b  `888b.     `8' d8P'    `Y8
  //  888          888       8   8 `88b.    8  888               888       888  888      888  8 `88b.    8  Y88bo.
  //  888oooo8     888       8   8   `88b.  8  888               888       888  888      888  8   `88b.  8   `"Y8888o.
  //  888    "     888       8   8     `88b.8  888               888       888  888      888  8     `88b.8       `"Y88b
  //  888          `88.    .8'   8       `888  `88b    ooo       888       888  `88b    d88'  8       `888  oo     .d8P
  // o888o           `YbodP'    o8o        `8   `Y8bood8P'      o888o     o888o  `Y8bood8P'  o8o        `8  8""88888P'
  const logout = () => {
    localStorage.token = "";
    dispatch({type:'UPDATE_USERINFO'})
    setBurger(false)
    history.push('/landing')
  };
  //  .oooooo..o ooooooooooooo       .o.       ooooooooooooo oooooooooooo
  //  d8P'    `Y8 8'   888   `8      .888.      8'   888   `8 `888'     `8
  //  Y88bo.           888          .8"888.          888       888
  //   `"Y8888o.       888         .8' `888.         888       888oooo8
  //       `"Y88b      888        .88ooo8888.        888       888    "
  //  oo     .d8P      888       .8'     `888.       888       888       o
  //  8""88888P'      o888o     o88o     o8888o     o888o     o888ooooood8
  const [burger, setBurger] = useState(false);
  const [update, setUpdate] = useState(false)
  const [open, setOpen] = React.useState(false);
  
  
  
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
  const memberPic = useSelector((state) => state.profilePicsReducer.memberPic);
  const classes = useStyles();
  const location = useLocation()

  // oooooooooooo oooooooooooo oooooooooooo oooooooooooo   .oooooo.   ooooooooooooo
  // `888'     `8 `888'     `8 `888'     `8 `888'     `8  d8P'  `Y8b  8'   888   `8
  //  888          888          888          888         888               888
  //  888oooo8     888oooo8     888oooo8     888oooo8    888               888
  //  888    "     888    "     888    "     888    "    888               888
  //  888       o  888          888          888       o `88b    ooo       888
  // o888ooooood8 o888o        o888o        o888ooooood8  `Y8bood8P'      o888o
  useEffect(() => {
    setBurger(false)
  }, [update])

  //   oooo  .oooooo..o ooooooo  ooooo
  //   `888 d8P'    `Y8  `8888    d8'
  //    888 Y88bo.         Y888..8P
  //    888  `"Y8888o.      `8888'
  //    888      `"Y88b    .8PY888.
  //    888 oo     .d8P   d8'  `888b
  // .o. 88P 8""88888P'  o888o  o88888o
  // `Y888P
  return (
    <div className={clsx(classes.root)}>
      {!userInfo.user_info || userInfo.user_info === 'failed' && <Link className={classes.logo} to={userInfo.user_info ? (userInfo.user_info !== "failed" ? '/explore' : '/landing'): '/landing'}>Once More 'Round the Sun</Link>}
      {userInfo.user_info !== 'failed' &&<div></div>}

      {userInfo.user_info && userInfo.user_info !== "failed" && (
        <div className={clsx(classes.mid, userInfo.user_info!=='failed' && classes.phoneBar)}>
          <div className={classes.midLeft}>
            {/* {console.log(location.pathname.split('/')[1])} */}
            <Link className={clsx(classes.hoverLink,  location.pathname.split('/')[1] == 'explore' && classes.chosenLink)} to="/explore">Explore</Link>
            <Link className={clsx(classes.hoverLink, location.pathname.split('/')[1] == 'plan' && classes.chosenLink)} to="/plan">Plan</Link>
            <Link className={clsx(classes.hoverLink, location.pathname.split('/')[1] == 'club' && classes.chosenLink)} to="/club">Club</Link>
            {userInfo.user_info.userInfo.type === "admin" && (
              <Link className={clsx(classes.hoverLink, location.pathname.split('/')[1] == 'controlPanel' && classes.chosenLink)} to="/controlPanel/charts">Control Panel</Link>
            )}
            {userInfo.user_info.userInfo.type !== "admin" && (
              <Link className={clsx(classes.hoverLink, location.pathname.split('/')[1] == 'favoriteLocations' && classes.chosenLink)} to="/favoriteLocations">Favorite Locations</Link>
            )}
          </div>

          <div className={clsx(classes.midRight)}>
            <div className={clsx(classes.flexSB, classes.midRightIn)}>
              <div
              className={clsx(classes.profileLinkFather, classes.phoneRowReverse)}
              >
                <span className={clsx(classes.phoneKiller)}>{'Hello, \xa0'}</span>
                <Link className={clsx(classes.menuLink, classes.hoverLink, (location.pathname.split('/')[1] == 'profile' && classes.hoverLinkProfilePhone))} to={`/profile/${userInfo.user_info.userInfo.user_name}`}>
                  {userInfo.user_info.userInfo.user_name}
                  {/* {console.log(window.innerWidth)} */}
                </Link>
                <img
                  // src={userInfo.user_info.userInfo.img_src}
                  // src={userInfo.user_info.userInfo.user_name.img_src || defaultProfilePic}
                  src={userInfo.user_info.userInfo.img_src || memberPic}
                  alt="Profile Pic"
                  className={classes.profilePic}
                  onClick={()=>{history.push(`/profile/${userInfo.user_info.userInfo.user_name}`)}}
                />
              </div>
                <div>
                <MenuIcon 
                onClick={()=>{setBurger(!burger)}}
                >Burger</MenuIcon>
                </div>
            </div>
          </div>

            {burger && <div className={clsx(burger ? classes.active : classes.hidden, classes.burgerMenu)}>
                {burger && <div className={clsx(classes.close)}><CloseIcon
                
                onClick={()=>{setBurger(false);setUpdate(!update)}}
                ></CloseIcon></div>}
               {userInfo && userInfo.user_info && userInfo.user_info.userInfo.type!=='admin' && <Link 
                onClick={()=>setBurger(false)}
                className={clsx(classes.menuLink, classes.firstBurgerLink, classes.hoverLink)}
                to='/contactUs'>{burger && 'Chat With Us'}</Link>}
                <Link 
                onClick={()=>setBurger(false)}
                className={clsx(classes.menuLink, classes.hoverLink)}
                to='/blog'>{burger && 'Blog'}</Link>
                {/* <Link to='/FriendsTell'>Friends Tell</Link> */}
                <div
                className={clsx(classes.logout, classes.menuLink, classes.hoverLink)}
                onClick={()=>logout()}
                >{burger && 'Logout'}</div>
            </div>}
        </div>
      )}


      {(!userInfo.user_info || userInfo.user_info === "failed") && (
        <div className={classes.unloggedBar}>
          <Link to="/signup" className={clsx(classes.hoverLink, location.pathname.split('/')[1] == 'signup' && classes.chosenLink)}>Signup</Link>
          <Link to="/login" className={clsx(classes.hoverLink, location.pathname.split('/')[1] == 'login' && classes.chosenLink)}>Login</Link>
        <Link to='/blog' className={clsx(classes.hoverLink, location.pathname.split('/')[1] == 'blog' && classes.chosenLink)}>Blog</Link>
      </div>
      ) }

{userInfo.user_info !== 'failed' &&<div></div>}

    </div>
  );
}
