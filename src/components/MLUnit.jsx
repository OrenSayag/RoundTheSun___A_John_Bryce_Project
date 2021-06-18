import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { Route, Switch, useHistory, Link } from "react-router-dom";
import AddLocationMap from "./AddLocationMap";
import { makeStyles } from "@material-ui/core/styles";
import EditIcon from '@material-ui/icons/Edit';
import Delete from "@material-ui/icons/Delete";

// .oooooo..o ooooooooooooo oooooo   oooo ooooo        oooooooooooo  .oooooo..o
// d8P'    `Y8 8'   888   `8  `888.   .8'  `888'        `888'     `8 d8P'    `Y8
// Y88bo.           888        `888. .8'    888          888         Y88bo.
//  `"Y8888o.       888         `888.8'     888          888oooo8     `"Y8888o.
//      `"Y88b      888          `888'      888          888    "         `"Y88b
// oo     .d8P      888           888       888       o  888       o oo     .d8P
// 8""88888P'      o888o         o888o     o888ooooood8 o888ooooood8 8""88888P'
const useStyles = makeStyles(theme=>({
  root: {
    // background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    backgroundColor: '#93602E',
    border: 0,
    borderRadius: 3,
    // boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .9)",
    color: "white",
    height: "fit-content",
    padding: "15px",
    width: "fit-content",
    // margin: "30px",
    width: 'calc(100% - 30px)',
    margin: '20px 0',
    position: 'relative',
    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;",

    [theme.breakpoints.down('sm')]: {
      paddingTop: '55px',

    },
  },
  title:{
    // border: '2px solid white',
    fontSize: '2rem',
    letterSpacing: '.2mm',
    borderBottom: '1px solid white',
    width:'fit-content',
    marginBottom: '15px',
    cursor:'pointer',
  },
  imgCont:{
    display: 'flex',
    justifyContent: 'center',
  },
  img: {
    width: '100%',
    borderRadius: 3,

  },
  info:{
    color: '#02243A    ',
    backgroundColor: '#DADEE1',
    padding: '15px',
    borderRadius: 3,
    margin: '20px 0',
    width: '15rem',
    height: '3rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '45%',
    '&>*':{
      display: 'flex',
      width: '100%',
      minWidth: 'fit-content',
      justifyContent: 'center',
      // border: '1px solid black',

    },

    [theme.breakpoints.down('sm')]: {
      width: '35%',
      fontSize: '1rem',
    },
  },
    infoCont:{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: 'fit-content',
      fontSize: '1.1rem'
    },
    unFavBtn: {
      position: 'absolute',
      right: '15px',
      top: '15px',
      backgroundColor: '#2E174A',
      // backgroundColor: 'linen',
      border: 'none',
      padding: '10px',
      borderRadius: 3,
      color: '#CEA8FC',
      '&:hover':{
        backgroundColor: 'rgba(46, 23, 74,.7)        ',
      },
    },
    editBar:{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      '& > *':{
        // width: '49%',
        height: '55px',
        border: 'none',
        // backgroundColor: '#AD0EAB',
        color: 'white',
        borderRadius: 3,
        padding: '15px',
        fontSize: '1.3rem',
        [theme.breakpoints.down('sm')]: {
          fontSize: '.7rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
    
        },
      },

    
    },
    
    delBtn:{
      backgroundColor:'#360A0A',
      transition: 'background .2s',
      width: '10%',
      '&:hover':{
        
        backgroundColor:'#D31B1B',
      },
      [theme.breakpoints.down('sm')]: {
        width: '40%',
  
      },
      
    },
    editBtn:{
      transition: 'background .2s',
      backgroundColor:'#734601',
      width: '85%',
      '&:hover':{
        backgroundColor:'#DE8C0D',
  
      },
      [theme.breakpoints.down('sm')]: {
        width: '40%',
  
      },
  
    },
    inputCont:{
      // border: '1px solid white',
      // padding: '5px',
      display: 'flex',
      flexDirection:' column',
      '& input':{
        width: '40%',
        height: '2rem',
        padding: '2px 8px',
        border: '1px solid limegreen',
        marginBottom: '10px',
        borderRadius: 3,
        outline: 'none',
        background: 'rgba(250, 255, 217,.6)',
        [theme.breakpoints.down('sm')]: {
          width: 'calc(100% - 16px)',
    
        },
      },
    },
    editActiveBtns:{
      width: '40%',
      width: '20%',

    },
    editMapBtn:{
      width: 'fit-content',
      padding: '15px',
      border: 'none',
      borderRadius: 3,
      background: '#0561D9      ',
      color: '#D6FCFF',
      transition: 'background .2s',
      '&:hover':{
        background: '#176BD9      ',

      },
      marginBottom: '10px',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
  
      },

    }
}));

export default function MLUnit({ location, setUpdate, update }) {
  // oooooooooooo ooooo     ooo ooooo      ooo   .oooooo.   ooooooooooooo ooooo   .oooooo.   ooooo      ooo  .oooooo..o
  // `888'     `8 `888'     `8' `888b.     `8'  d8P'  `Y8b  8'   888   `8 `888'  d8P'  `Y8b  `888b.     `8' d8P'    `Y8
  //  888          888       8   8 `88b.    8  888               888       888  888      888  8 `88b.    8  Y88bo.
  //  888oooo8     888       8   8   `88b.  8  888               888       888  888      888  8   `88b.  8   `"Y8888o.
  //  888    "     888       8   8     `88b.8  888               888       888  888      888  8     `88b.8       `"Y88b
  //  888          `88.    .8'   8       `888  `88b    ooo       888       888  `88b    d88'  8       `888  oo     .d8P
  // o888o           `YbodP'    o8o        `8   `Y8bood8P'      o888o     o888o  `Y8bood8P'  o8o        `8  8""88888P'
  const fetchEditLocation = async () => {
    // console.log(name);
    // console.log(country);
    try {
      const res = await fetch(
        `https://ancient-reef-92615.herokuapp.com/controlPanel/manageLocations`,
        {
          method: "PUT",
          body: JSON.stringify({
            id: location.id,
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
      }
      // console.log(res.status);

      setUpdate(!update);
    } catch (error) {
      // console.log(error);
    }
  };
  const fetchDelLocation = async () => {
    try {
      const res = await fetch(
        `https://ancient-reef-92615.herokuapp.com/controlPanel/manageLocations`,
        {
          method: "DELETE",
          body: JSON.stringify({
            id: location.id,
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
      }
      setUpdate(!update);
    } catch (error) {
      // console.log(error);
    }
  };
  const fetchFavLocation = async () => {
    try {
      const res = await fetch(
        `https://ancient-reef-92615.herokuapp.com/location/fav`,
        {
          method: "POST",
          body: JSON.stringify({
            id: location.id,
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
      }
      // console.log(res.status);

      setUpdate(!update);
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
  const [x, setX] = useState(location.x);
  const [y, setY] = useState(location.y);
  const [imgSrc, setImgSrc] = useState("");
  const [editTog, setEditTog] = useState(false);
  const [editMapTog, setEditMapTog] = useState(false);
  

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

  // oooooooooooo oooooooooooo oooooooooooo oooooooooooo   .oooooo.   ooooooooooooo
  // `888'     `8 `888'     `8 `888'     `8 `888'     `8  d8P'  `Y8b  8'   888   `8
  //  888          888          888          888         888               888
  //  888oooo8     888oooo8     888oooo8     888oooo8    888               888
  //  888    "     888    "     888    "     888    "    888               888
  //  888       o  888          888          888       o `88b    ooo       888
  // o888ooooood8 o888o        o888o        o888ooooood8  `Y8bood8P'      o888o
  useEffect(() => {
    // fetchLocations()
  }, [x, y, name, imgSrc, country]);

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
      className={clsx(classes.inputCont)}
      >

      {!editTog ? (
        <div 
        className={clsx(classes.title)}
        onClick={()=>{
          history.push(`/location/${location.id}`)
        }}
        >{location.name}, {location.country}</div>
      ) : (
        <input
          type="text"
          placeholder={`Location name: ${location.name}`}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      )}
      {/* bg of location */}

      {!editTog ? (
        <div></div>
      ) : (
        <input
          type="text"
          placeholder={`Country: ${location.country}`}
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        />
      )}

      {!editTog ?
      <div className={clsx(classes.imgCont)}>
        <img className={clsx(classes.img)} src={location.img_src} />
      </div>
      
      :(
        
        <input
          type="text"
          placeholder={`Img url: ${location.img_src}`}
          onChange={(e) => {
            setImgSrc(e.target.value);
          }}
        />
      )}

      {editTog && (
        <button
        className={clsx(classes.editMapBtn)}
          onClick={() => {
            setEditMapTog(!editMapTog);
          }}
        >
          Edit Map Coordinates
        </button>
      )}
      </div>

      {editMapTog && (
        <div>
          <AddLocationMap
            myZoom={10}
            height={"200px"}
            width={"100%"}
            x={x}
            y={y}
            MLU={true}
            setY={setY}
            setX={setX}
          />
        </div>
      )}

      <div 
        className={clsx(classes.infoCont)}
      
      >
        
      <div
        className={clsx(classes.info)}
      
      >
        <span>Vacations:</span>
        <span>{location.numOfVacations}</span>
      </div>

      <div
        className={clsx(classes.info)}
      
      >
        <span>Favorited By:</span>
        <span>{location.numOfFavs}</span>
      </div>
      </div>

      <div
        className={clsx(classes.editBar)}
      >
      { userInfo.user_info.userInfo.type === 'admin' &&  <button
        className={clsx(classes.editBtn, editTog && classes.editActiveBtns)}

        onClick={() => {
          setEditTog(!editTog);
          setEditMapTog(false);
        }}
      >
        {editTog ? "Cancel" : <EditIcon />}
      </button>}

      {editTog && (
        <button
        className={clsx(editTog && classes.editActiveBtns, classes.editBtn)}
          onClick={() => {
            setEditTog(!editTog);
            setEditMapTog(false);
            fetchEditLocation();
          }}
        >
          Save Changes
        </button>
      )}

     {userInfo.user_info.userInfo.type === 'admin' &&  <button
        className={clsx(classes.delBtn)}

        onClick={() => {
          fetchDelLocation();
        }}
      >
        <Delete />
      </button>}

      </div>



      {userInfo.user_info.userInfo.type !== 'admin' &&  <button
        className={clsx(classes.unFavBtn)}

        onClick={() => {
          fetchFavLocation();
        }}
      >
        Unfavorite
      </button>}
    </div>
  );
}
