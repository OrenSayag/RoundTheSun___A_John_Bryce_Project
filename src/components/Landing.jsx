import { useHistory, useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Container from '@material-ui/core/Container';

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
    width: "100%",
    overflow: 'hidden',
    // marginTop: '100px',
    '&>*':{
      backgroundPosition: 'center',
      [theme.breakpoints.down('sm')]: {
          textAlign: 'center',
      },
    }
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
  sellCompany:{
    // border: '1px solid white',
    position: 'relative',
    minHeight: '100vh',
    backgroundImage: 'url(/landing/sellCompany01.jpg)',
    backgroundSize: 'cover',
    position: 'relative',
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
    mixBlendMode: 'lighten',
    // border: '1px solid white',
    [theme.breakpoints.down('sm')]: {
      
    },
  },
  sellCompamyBlurringAgent:{
    // border: '1px solid white',
    height: '25px',
    width: '101%',
    position: 'absolute',
    bottom: '-12.5px',
    filter: 'blur(5px)',
    // backgroundColor: 'rgba(255, 0, 0, 0.5);',
    backgroundColor: 'rgba(255, 255, 255, .8);',
    [theme.breakpoints.down('sm')]: {
      // bottom: '0'
    },
  },
  sellPlanBlurringAgent:{
    // border: '1px solid white',
    height: '25px',
    width: '101%',
    position: 'absolute',
    bottom: '-32.5px',
    filter: 'blur(5px)',
    // backgroundColor: 'rgba(255, 0, 0, 0.5);',
    backgroundColor: 'rgba(255, 255, 255, .8);',

  },
  sellExploreBlurringAgent:{
    // border: '1px solid white',
    height: '25px',
    width: '101%',
    position: 'absolute',
    bottom: '-32.5px',
    filter: 'blur(5px)',
    // backgroundColor: 'rgba(255, 0, 0, 0.5);',
    backgroundColor: 'rgba(255, 255, 255, .8);',


  },
  sellCompanyTitle:{
    // position: 'absolute',
    // marginTop: '500px',
    color: 'white',
    // border: '1px solid pink',
    fontSize: '5rem',
    fontWeight: 100,
    textShadow:
    "0px 4px 3px rgba(0,0,0,0.4), 0px 8px 13px rgba(0,0,0,0.1), 0px 18px 23px rgba(0,0,0,0.1)",
    [theme.breakpoints.down('sm')]: {
      // marginTop: '100px',
      display: 'flex',
      justifyContent: 'center',
      // border: '1px solid white',
      textAlign: 'center',
      lineHeight: '5.5rem',
    },
  },
  sellPlan:{
    // border: '1px solid white',
    height: '100vh',
    backgroundImage: 'url(/landing/sellPlan01.jpg)',
    backgroundSize: 'cover',
    position: 'relative',
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    mixBlendMode: 'lighten',
    textShadow:
    "0px 4px 3px rgba(0,0,0,0.4), 0px 8px 13px rgba(0,0,0,0.1), 0px 18px 23px rgba(0,0,0,0.1)",
    // backgroundBlendMode: 'lighten'
    color: 'white',
    [theme.breakpoints.down('sm')]: {
      fontSize: '3rem',
      // marginTop: '100px',
      display: 'flex',
      justifyContent: 'center',
      // border: '1px solid white',
      textAlign: 'center',
      lineHeight: '3.5rem',
    },
    '&>*':{
      marginBottom: '20px',

    },

  },
  // sellPlanBlurringAgent:{
  //   border: '1px solid white',
  //   height: '25px',
  //   width: '101%',
  //   position: 'absolute',
  //   top: '-12.5px',
  //   filter: 'blur(9px)',
  //   backgroundColor: 'rgba(255, 255, 255, .8);',
  // },
  sellPlanTitle:{
    color: 'white',
    fontSize: '5rem',
    fontWeight: 100,
    textShadow:
    "0px 4px 3px rgba(0,0,0,0.4), 0px 8px 13px rgba(0,0,0,0.1), 0px 18px 23px rgba(0,0,0,0.1)",
  },
  sellPlanBlah1:{
    fontSize: '1.5rem',
  },
  sellPlanBlah2:{
    fontSize: '2rem',
  },
  sellExplore:{
    // border: '1px solid white',
    height: '100vh',
    backgroundImage: 'url(/landing/sellExplore01.jpg)',
    backgroundSize: 'cover',
    position: 'relative',
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    // mixBlendMode: 'lighten',
fontWeight:100,
    mixBlendMode: 'luminosity',
    textShadow:
    "0px 4px 3px rgba(0,0,0,0.4), 0px 8px 13px rgba(0,0,0,0.1), 0px 18px 23px rgba(0,0,0,0.1)",
    // backgroundBlendMode: 'lighten'
    color: 'white',
    '&>*':{
      marginBottom: '20px',

    },
    '&>:first-child':{
      fontSize: '5rem',
      
    },
    '&>:nth-child(2)':{
      fontSize: '3rem',
      marginTop: '30px',
    },

  },
  joinBg:{
    // border: '1px solid white',
    height: '100vh',
    width: '100%',
    backgroundImage: 'url(/landing/join01.jpg)',
    backgroundSize: 'cover',
    position: 'absolute',
    filter: 'blur(5px)',
    display:'flex',
    zIndex: '-1',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    // mixBlendMode: 'lighten',
fontWeight:100,
    mixBlendMode: 'hard-light',
    textShadow:
    "0px 4px 3px rgba(0,0,0,0.4), 0px 8px 13px rgba(0,0,0,0.1), 0px 18px 23px rgba(0,0,0,0.1)",
    // backgroundBlendMode: 'lighten'
    color: 'white',
    '&>*':{
      marginBottom: '20px',

    },
    '&>:first-child':{
      fontSize: '5rem',
      
    },
    '&>:nth-child(2)':{
      fontSize: '1.5rem',
      marginTop: '30px',
    },
    '&>:nth-child(3)':{
      fontSize: '2rem',
      marginTop: '30px',
    },

  },
  joinCont:{
    // border: '1px solid white',
    height: '100vh',
    backgroundSize: 'cover',
    position: 'relative',
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    // mixBlendMode: 'lighten',
fontWeight:100,
    mixBlendMode: 'hard-light',
    textShadow:
    "0px 4px 3px rgba(0,0,0,0.4), 0px 8px 13px rgba(0,0,0,0.1), 0px 18px 23px rgba(0,0,0,0.1)",
    // backgroundBlendMode: 'lighten'
    color: 'white',
    '&>*':{
      // marginBottom: '20px',

    },
    '&>:first-child':{
      fontSize: '5rem',
      
    },
    '&>:nth-child(2)':{
      fontSize: '1.5rem',
      marginTop: '30px',
    },
    '&>:nth-child(3)':{
      fontSize: '2rem',
      marginTop: '30px',
    },

  },
  sellClub:{
    // border: '1px solid white',
    height: '100vh',
    backgroundImage: 'url(/landing/sellClub01.jpg)',
    backgroundSize: 'cover',
    position: 'relative',
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    // mixBlendMode: 'lighten',
fontWeight:100,
    mixBlendMode: 'hard-light',
    textShadow:
    "0px 4px 3px rgba(0,0,0,0.4), 0px 8px 13px rgba(0,0,0,0.1), 0px 18px 23px rgba(0,0,0,0.1)",
    // backgroundBlendMode: 'lighten'
    color: 'white',
    '&>*':{
      marginBottom: '20px',

    },
    '&>:first-child':{
      fontSize: '5rem',
      [theme.breakpoints.down('sm')]: {
       position: 'absolute',
       top: '50px',
        
      },
      
    },
    '&>:nth-child(2)':{
      fontSize: '1.5rem',
      marginTop: '30px',
        [theme.breakpoints.down('sm')]: {
        position: 'absolute',
        bottom: '120px',
        
      },
    },
    '&>:nth-child(3)':{
      fontSize: '2rem',
      marginTop: '30px',
        [theme.breakpoints.down('sm')]: {
        position: 'absolute',
        bottom: '20px',
        
      },
    },

  },
  joinCard:{
    // border: '1px solid black',
    boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',

    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,.7)',
    display:'flex',
    flexDirection: 'column',
    padding: '50px',
    '&>:first-child':{
      fontSize: '3rem',
      fontWeight: 100,
      color: 'inherit',
      textShadow:
      "0px 4px 3px rgba(0,0,0,0.4), 0px 8px 13px rgba(0,0,0,0.1), 0px 18px 23px rgba(0,0,0,0.1)",
      borderRadius: 3,
      border: 'none',
      backgroundColor: 'rgba(0, 155, 88, 1)',
      padding: '30px',
      textTransform: 'uppercase',
      transition: 'background .2s',
    boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
    [theme.breakpoints.down('sm')]: {
      padding: '10px',
      width: '75%',
      fontSize: '2rem',
      lineHeight: '3rem',
    },

      '&:hover':{
        backgroundColor: 'rgba(0, 155, 11, 1)',

      }
    },
    '&>:nth-child(2)':{
      fontSize: '1.5rem',
      marginTop: '30px',
      color: 'gray',
      textShadow: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '10px',
      alignItems: 'center',
      width: '75%',
    },

  },
  joinCardLogin:{
    textDecoration: 'none',
  },

}));

export default function Landing() {
  // oooooooooooo ooooo     ooo   .oooooo.   ooooo      ooo ooooooooooooo ooooo   .oooooo.   ooooo      ooo  .oooooo..o
  // `888'     `8 `888'     `8'  d8P'  `Y8b  `888b.     `8' 8'   888   `8 `888'  d8P'  `Y8b  `888b.     `8' d8P'    `Y8
  //  888          888       8  888           8 `88b.    8       888       888  888      888  8 `88b.    8  Y88bo.
  //  888oooo8     888       8  888           8   `88b.  8       888       888  888      888  8   `88b.  8   `"Y8888o.
  //  888    "     888       8  888           8     `88b.8       888       888  888      888  8     `88b.8       `"Y88b
  //  888          `88.    .8'  `88b    ooo   8       `888       888       888  `88b    d88'  8       `888  oo     .d8P
  // o888o           `YbodP'     `Y8bood8P'  o8o        `8      o888o     o888o  `Y8bood8P'  o8o        `8  8""88888P'

  // ooooo   ooooo   .oooooo.     .oooooo.   oooo    oooo  .oooooo..o
  // `888'   `888'  d8P'  `Y8b   d8P'  `Y8b  `888   .8P'  d8P'    `Y8
  //  888     888  888      888 888      888  888  d8'    Y88bo.
  //  888ooooo888  888      888 888      888  88888[       `"Y8888o.
  //  888     888  888      888 888      888  888`88b.         `"Y88b
  //  888     888  `88b    d88' `88b    d88'  888  `88b.  oo     .d8P
  // o888o   o888o  `Y8bood8P'   `Y8bood8P'  o888o  o888o 8""88888P'
  const history = useHistory();
  const classes = useStyles();

  //  .oooooo..o ooooooooooooo       .o.       ooooooooooooo oooooooooooo
  //  d8P'    `Y8 8'   888   `8      .888.      8'   888   `8 `888'     `8
  //  Y88bo.           888          .8"888.          888       888
  //   `"Y8888o.       888         .8' `888.         888       888oooo8
  //       `"Y88b      888        .88ooo8888.        888       888    "
  //  oo     .d8P      888       .8'     `888.       888       888       o
  //  8""88888P'      o888o     o88o     o8888o     o888o     o888ooooood8

  // oooooooooooo oooooooooooo oooooooooooo oooooooooooo   .oooooo.   ooooooooooooo
  // `888'     `8 `888'     `8 `888'     `8 `888'     `8  d8P'  `Y8b  8'   888   `8
  //  888          888          888          888         888               888
  //  888oooo8     888oooo8     888oooo8     888oooo8    888               888
  //  888    "     888    "     888    "     888    "    888               888
  //  888       o  888          888          888       o `88b    ooo       888
  // o888ooooood8 o888o        o888o        o888ooooood8  `Y8bood8P'      o888o
  useEffect(() => {

  }, []);

  //   .oooooo.     .oooooo.   ooooo      ooo  .oooooo..o
  //  d8P'  `Y8b   d8P'  `Y8b  `888b.     `8' d8P'    `Y8
  // 888          888      888  8 `88b.    8  Y88bo.
  // 888          888      888  8   `88b.  8   `"Y8888o.
  // 888          888      888  8     `88b.8       `"Y88b
  // `88b    ooo  `88b    d88'  8       `888  oo     .d8P
  //  `Y8bood8P'   `Y8bood8P'  o8o        `8  8""88888P'







  //    oooo  .oooooo..o ooooooo  ooooo
  //    `888 d8P'    `Y8  `8888    d8'
  //     888 Y88bo.         Y888..8P
  //     888  `"Y8888o.      `8888'
  //     888      `"Y88b    .8PY888.
  //     888 oo     .d8P   d8'  `888b
  // .o. 88P 8""88888P'  o888o  o88888o
  // `Y888P
  return (
    <div className={clsx(classes.cont)}>
      <div className={clsx(classes.root)}>
        <div
        className={clsx(classes.sellCompany)}
        >
          <div className={clsx(classes.sellCompanyTitle)}>
          ONCE MORE 'ROUND THE SUN
          </div>
            <div
              className={clsx(classes.sellCompamyBlurringAgent)}
            >

            </div>
          </div>
        <div
        className={clsx(classes.sellPlan)}
        >
           <div
              className={clsx(classes.sellPlanBlurringAgent)}
            >

            </div>
          <div
          className={clsx(classes.sellPlanTitle)}
          >Plan.</div>
          <div
          className={clsx(classes.sellPlanBlah1)}
          >We offer a rich variety of premium vacations, around the globe.</div>
          <div
          className={clsx(classes.sellPlanBlah2)}
          >Using our advanced technologies, planning the perfect travel had never been easier!</div>

        </div>
        <div
        className={clsx(classes.sellExplore)}
        >
          <div>Explore.</div>
          <div>Comment, like, and follow vacations that catch your eye.</div>
          <div
              className={clsx(classes.sellExploreBlurringAgent)}
            >

            </div>

        </div>
        <div
        className={clsx(classes.sellClub)}
        >
          <div>Earn.</div>
          <div>Get Club Credits for joining us on vacations.</div>
          <div>Use them to travel even more!</div>
          <div
              className={clsx(classes.sellExploreBlurringAgent)}
            >

            </div>

        </div>
        <div className={clsx(classes.joinCont)}>
          <div
          className={clsx(classes.joinCard)}
          >
          <button
            onClick={() => {
              history.push("/signup");
            }}
          >
            Join Us Today!
          </button>
          <div>
            Already have an account? <Link className={clsx(classes.joinCardLogin)} to="/login">Login</Link>
          </div>

          </div>
        <div
        className={clsx(classes.joinBg)}
        ></div>
        </div>
      </div>
    </div>
  );
}
