import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory, useLocation, Link } from "react-router-dom";
import moment, { calendar } from "moment";
import TextField from "@material-ui/core/TextField";
import { closestIndexTo, parseISO, set } from "date-fns";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Divider from '@material-ui/core/Divider';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import randomProfilePic from "../tools/randomProfilePic";
import adminProfilePic from "../tools/adminProfilePic";



// .oooooo..o ooooooooooooo oooooo   oooo ooooo        oooooooooooo  .oooooo..o
// d8P'    `Y8 8'   888   `8  `888.   .8'  `888'        `888'     `8 d8P'    `Y8
// Y88bo.           888        `888. .8'    888          888         Y88bo.
//  `"Y8888o.       888         `888.8'     888          888oooo8     `"Y8888o.
//      `"Y88b      888          `888'      888          888    "         `"Y88b
// oo     .d8P      888           888       888       o  888       o oo     .d8P
// 8""88888P'      o888o         o888o     o888ooooood8 o888ooooood8 8""88888P'
const useStyles = makeStyles(theme=>(({
  root: {
    // background: "linear-gradient(45deg, #126929 30%, #c41bbc 90%)",
    // position: 'relative',
    // width: '1300px',
    // marginTop: '100px'
    backgroundColor: 'linen',
    margin: '20px 0',
    padding: '20px',
    position: 'relative',
    opacity: .8,
    width: 'calc(100% - 40px)',
    overFlowX: 'hidden',
    // backgroundImage: `url(../imgs/vacations/la1.jpg)`,
    // backgroundImage: `url(/vacations/la1.jpg)`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    borderRadius: 3,
    boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px',
  },
  vacationImg:{
    position: 'relative',
    borderRadius: 3,
    width: '100%',
  },
  title:{
    color: '#E57008',
    fontSize: '2rem',
    marginBotton: '20px',
    borderBottom: '.5px solid #D1D1D1',
    width: 'fit-content',
    paddingBottom: '5px',
    cursor: 'pointer'
    // fontWeight: 'bold',
    // letterSpacing: '3mm',
    // textShadow: '2px 7px 5px rgba(0,0,0,0.3), 0px -4px 10px rgba(255,255,255,0.3);'
  },
  vname:{
    width: 'fit-content',
    cursor: 'pointer',
    color: '#922B9E',
    fontSize: '3rem',
    margin: '20px 0',
    fontWeight: '500',
    // letterSpacing: '3mm',
    textShadow: '1px 0px 1px rgba(150, 150, 150, 1);'
  },
  description:{
    color: '#02243A    ',
    backgroundColor: '#DADEE1',
    padding: '15px',
    borderRadius: 3,
    fontSize: '1rem',
    margin: '20px 0',
    fontStyle: 'oblique',
    // backgroundColor: 'gray',
    // fontWeight: 'bold',
    // letterSpacing: '3mm',
    // textShadow: '2px 7px 5px rgba(0,0,0,0.3), 0px -4px 10px rgba(255,255,255,0.3);'
  },
  info:{
    color: '#02243A    ',
    backgroundColor: '#DADEE1',
    padding: '15px',
    borderRadius: 3,
    margin: '20px 0',
    width: '15rem',
    height: '5rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '30%',
    
    [theme.breakpoints.down('sm')]: {
      // border: '1px solid pink',
      height: 'fit-content',
      width: '90%'
    },
  },
  infoCont:{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 'fit-content',
    fontSize: '1.1rem',



    [theme.breakpoints.down('sm')]: {
      // border: '1px solid pink',
      flexDirection: 'column',
    },
    },
  lineThrough:{
    textDecoration: 'line-through'
  },
  dates:{
    flexDirection: 'row',
    alignItems: 'center',
    // padding: '25px',
    padding: '15px 20px',
    fontSize: '1.5rem',
    // boxSizing:'border-box'

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      padding: '15px'
    },
  },
  gold:{
    color: '#3DCE1A',
    fontWeight: '600'
    // backgroundColor: '#5B574F',
  },
  socialBar:{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& > *':{
      width: '33%',
      height: '55px',
      border: 'none',
      backgroundColor: '#AD0EAB',
      color: 'white',
      borderRadius: 3,
      padding: '15px',
      fontSize: '1.3rem',
      transition:'background .2s',
      '&:hover':{
        backgroundColor:'#E513E3'
      },
      [theme.breakpoints.down('sm')]: {
        width: '20%',
        fontSize: '.8rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
    },

  },
  editBar:{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& > *':{
      width: '20%',
      height: '55px',
      border: 'none',
      backgroundColor: '#AD0EAB',
      color: 'white',
      borderRadius: 3,
      padding: '15px',
      fontSize: '1.3rem',
      
      [theme.breakpoints.down('sm')]: {
        fontSize: '.8rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
    }
  },
  socialBtnActive: {
    backgroundColor: '#E513E3',
  },
  like: {
    color: '#9D0909'
  },
  buyNowBtn: {
    // width: '33.333%',
    width: '100%',
    // height: '55px',
    border: 'none',
    backgroundColor: '#FFC300',
    color: '#9D0909',
    borderRadius: 3,
    padding: '15px',
    fontSize: '1.3rem',
    marginTop: '15px',
    fontWight: 'bold',
    '&:hover':{
      background: '#E7FB10'
    }
  },

  commentCont:{
    width: '100%',
    // border: '1px solid black',
    marginTop: '15px',
    // maxHeight: '200px',
    // overflow: 'scroll',
    '&::-webkit-scrollbar':{
      width: 0,
    },
    padding: '5px',

    [theme.breakpoints.down('sm')]: {
      // border: '1px solid pink',
    },
  },
  commentUnit:{
    width: 'fit-content',
    // border: '1px solid black',
    marginTop: '15px',
    display: 'grid',
    position: 'relative',
    '&>button':{
      // margin: '0 5px',
      position: 'absolute',
      right: '-40px',
      top: '2px'
    },
    backgroundColor: '#DADEE1',
    borderRadius: 3,
    padding: '3px',
    gridTemplateColumns: '50px auto',
    gridTemplateAreas: "'pic' 'content'",

    [theme.breakpoints.down('sm')]: {
      // border: '1px solid pink',
    },
  },
  commentDel: {
    position: 'absolute',
      right: '-30px',
      bottom: '2px',

      [theme.breakpoints.down('sm')]: {
        // border: '1px solid pink',
        left: '0px',
      },
  },
  commentUnitPicCont:{
    // backgroundColor: 'red',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '5px',
    '&>img':{
      width: '35px',
      height: '35px',
      borderRadius: '50%',
    }
  },
  commentUnitContentCont:{
    // backgroundColor: 'blue',
    '&>*':{
      margin: '5px'
    }
  },
  CUtext:{
    backgroundColor: 'gray',
    borderRadius: 3,
    padding: '5px',
  },
  postCommentCont:{
    '&>div>img':{
      width: '35px',
      height: '35px',
      borderRadius: '50%',
    },
    '&>input':{
      width: '30%',
      height: '35px',
      borderRadius: 3,
      border: 'none',
      outline: 'none',
      padding: '0 8px',

      [theme.breakpoints.down('sm')]: {
        width: '70%',
      },
    },
    backgroundColor: 'gray',
    borderRadius: 3,
    padding: '10px 15px',
    display: 'flex',
    marginTop: '15px',
  },
  postCommentPicCont:{
    display: 'flex',
    alignItems: 'center',
    marginRight: '17px',

  },
  delUnit:{
    backgroundColor:'#360A0A',
    transition: 'background .2s',
    '&:hover':{
      
      backgroundColor:'#D31B1B',
    }
    
  },
  editUnit:{
    transition: 'background .2s',
    backgroundColor:'#734601',
    '&:hover':{
      backgroundColor:'#DE8C0D',

    }
  },
  editInput:{
    width: '40%',
    height: '2rem',
    padding: '2px 8px',
    border: '1px solid limegreen',
    marginBottom: '10px',
    
    [theme.breakpoints.down('sm')]: {
      width: '90%',
      marginLeft: '2.5%',
    },
  },
  priceingEditInput: {
    height: '1rem',
    marginBottom: '3px',
    width: '60%',
  },
  editLocationResCont: {
    // border: '1px solid blue',
    width: '40%',
    padding: '8px 8px',
    marginBottom: '10px',
    backgroundColor: '#DADEE1',
    flexDirection: 'column',
    '&>*':{
      padding: '3px 0',
      borderBottom: '1px solid gray',
    },
    '&>*:hover':{
      backgroundColor: 'rgba(0,0,0,.2)'
    },
    '& > :last-child':{
      borderTop: 'none',
      borderBottom: 'none',
    },
  },
  active:{
    display:'flex'
  },
  hidden:{
    display:'none'
  },
  noHover:{
    '&:hover':{
      backgroundColor: 'transparent'
    },
    '&>button':{
      border: 'none',
      padding: '6px',
      marginTop: '10px',
      '&:hover':{
        backgroundColor:'rgba(0,0,0,.2)'
      }
    }
  },
  cancelEditBtn:{
    backgroundColor: '#734601'
  },
})));

export default function VacationUnit({ vacation, setUpdate, update }) {
  // oooooooooooo ooooo     ooo ooooo      ooo   .oooooo.   ooooooooooooo ooooo   .oooooo.   ooooo      ooo  .oooooo..o
  // `888'     `8 `888'     `8' `888b.     `8'  d8P'  `Y8b  8'   888   `8 `888'  d8P'  `Y8b  `888b.     `8' d8P'    `Y8
  //  888          888       8   8 `88b.    8  888               888       888  888      888  8 `88b.    8  Y88bo.
  //  888oooo8     888       8   8   `88b.  8  888               888       888  888      888  8   `88b.  8   `"Y8888o.
  //  888    "     888       8   8     `88b.8  888               888       888  888      888  8     `88b.8       `"Y88b
  //  888          `88.    .8'   8       `888  `88b    ooo       888       888  `88b    d88'  8       `888  oo     .d8P
  // o888o           `YbodP'    o8o        `8   `Y8bood8P'      o888o     o888o  `Y8bood8P'  o8o        `8  8""88888P'
  const fetchFollowVacation = async (id) => {
    try {
      const res = await fetch(`https://ancient-reef-92615.herokuapp.com/vacation/follow`, {
      // const res = await fetch(`http://localhost:666/vacation/follow`, {
        method: "PUT",
        body: JSON.stringify({
          id,
        }),
        headers: {
          "content-type": "application/json",
          authorization: localStorage.token,
        },
      });

      setUpdate(!update);
    } catch (error) {
      // console.log(error);
    }
  };
  const fetchLikeVacation = async (id) => {
    try {
      const res = await fetch(`https://ancient-reef-92615.herokuapp.com/vacation/like`, {
      // const res = await fetch(`http://localhost:666/vacation/like`, {
        method: "PUT",
        body: JSON.stringify({
          id,
        }),
        headers: {
          "content-type": "application/json",
          authorization: localStorage.token,
        },
      });

      setUpdate(!update);
    } catch (error) {
      // console.log(error);
    }
  };
  const fetchCommentVacation = async (id, text) => {
    try {
      const res = await fetch(`https://ancient-reef-92615.herokuapp.com/vacation/comment`, {
      // const res = await fetch(`http://localhost:666/vacation/comment`, {
        method: "POST",
        body: JSON.stringify({
          id,
          text,
        }),
        headers: {
          "content-type": "application/json",
          authorization: localStorage.token,
        },
      });

      //   if (res.status !== 200) {
      //     const data = await res.json();
      //     console.log(data);
      //     setErrorDiv(true);
      //     setErrorDivText(data.fail);
      //     return 1;
      //   }

      setUpdate(!update);
    } catch (error) {
      // console.log(error);
    }
  };
  const fetchDelCommentVacation = async (id) => {
    try {
      const res = await fetch(`https://ancient-reef-92615.herokuapp.com/vacation/comment`, {
      // const res = await fetch(`http://localhost:666/vacation/comment`, {
        method: "DELETE",
        body: JSON.stringify({
          id,
        }),
        headers: {
          "content-type": "application/json",
          authorization: localStorage.token,
        },
      });

      //   if (res.status !== 200) {
      //     const data = await res.json();
      //     console.log(data);
      //     setErrorDiv(true);
      //     setErrorDivText(data.fail);
      //     return 1;
      //   }

      setUpdate(!update);
    } catch (error) {
      // console.log(error);
    }
  };
  const fetchDelVacation = async (id) => {
    try {
      await fetch(`https://ancient-reef-92615.herokuapp.com/vacation`, {
      // await fetch(`http://localhost:666/vacation`, {
        method: "DELETE",
        body: JSON.stringify({
          id,
        }),
        headers: {
          "content-type": "application/json",
          authorization: localStorage.token,
        },
      });

      setUpdate(!update);
    } catch (error) {
      // console.log(error);
    }
  };
  const fetchEditVacation = async () => {
    try {
      const res = await fetch(`https://ancient-reef-92615.herokuapp.com/vacation/`, {
      // const res = await fetch(`http://localhost:666/vacation/`, {
        method: "PUT",
        body: JSON.stringify({
          id: vacation.id,
          price,
          name,
          start_date,
          end_date,
          location_id,
          discount,
          img_src,
          credits,
          description
        }),
        headers: {
          "content-type": "application/json",
          authorization: localStorage.token,
        },
      });

      if (res.status !== 200) {
        const data = await res.json();
        // console.log(data);
        // setErrorDiv(true);
        // setErrorDivText(data.fail);
        return 1;
      }

      setUpdate(!update);
    } catch (error) {
      // console.log(error);
    }
  };
  const fetchSearchLocations = async () => {
    try {
      const res = await fetch(`https://ancient-reef-92615.herokuapp.com/explore/search`, {
      // const res = await fetch(`http://localhost:666/explore/search`, {
        method: "POST",
        body: JSON.stringify({
          input,
        }),
        headers: {
          "content-type": "application/json",
          authorization: localStorage.token,
        },
      });
      const data = await res.json();
      // console.log(data);

      setLocationsSearchResults(data.locationsSearchResults);
    } catch (error) {
      // console.log(error);
    }
  };
  const isToday = (someDate) => {
    const today = new Date()
    return someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
  }
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

  //  .oooooo..o ooooooooooooo       .o.       ooooooooooooo oooooooooooo
  //  d8P'    `Y8 8'   888   `8      .888.      8'   888   `8 `888'     `8
  //  Y88bo.           888          .8"888.          888       888
  //   `"Y8888o.       888         .8' `888.         888       888oooo8
  //       `"Y88b      888        .88ooo8888.        888       888    "
  //  oo     .d8P      888       .8'     `888.       888       888       o
  //  8""88888P'      o888o     o88o     o8888o     o888o     o888ooooood8
  const [commentDiv, setCommentDiv] = useState(false);
  const [location_id, setLocationId] = useState(0);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [start_date, setStartDate] = useState(null);
  const [refreshUnit, setRefreshUnit] = useState(false);
  const [end_date, setEndDate] = useState(null);
  const [credits, setCredits] = useState(0);
  const [img_src, setImgSrc] = useState("");
  const [editTog, setEditTog] = useState(false);
  const [input, setInput] = useState("");
  const [locationsSearchResults, setLocationsSearchResults] = useState([]);
  const [chosenResultEditLocation, setChosenResultEditLocation] =
    useState(false);
  const [chosenResultEditLocationText, setChosenResultEditLocationText] =
    useState("");
const [description, setDescription] = useState('')
  // ooooo   ooooo   .oooooo.     .oooooo.   oooo    oooo  .oooooo..o
  // `888'   `888'  d8P'  `Y8b   d8P'  `Y8b  `888   .8P'  d8P'    `Y8
  //  888     888  888      888 888      888  888  d8'    Y88bo.
  //  888ooooo888  888      888 888      888  88888[       `"Y8888o.
  //  888     888  888      888 888      888  888`88b.         `"Y88b
  //  888     888  `88b    d88' `88b    d88'  888  `88b.  oo     .d8P
  // o888o   o888o  `Y8bood8P'   `Y8bood8P'  o888o  o888o 8""88888P'
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const userInfo = useSelector((state) => state.userInfo);
  const memberPic = useSelector((state) => state.profilePicsReducer.memberPic);
  const classes = useStyles();


//   .oooooo.     .oooooo.   ooooo      ooo  .oooooo..o 
//  d8P'  `Y8b   d8P'  `Y8b  `888b.     `8' d8P'    `Y8 
// 888          888      888  8 `88b.    8  Y88bo.      
// 888          888      888  8   `88b.  8   `"Y8888o.  
// 888          888      888  8     `88b.8       `"Y88b 
// `88b    ooo  `88b    d88'  8       `888  oo     .d8P 
//  `Y8bood8P'   `Y8bood8P'  o8o        `8  8""88888P'  
  const followBtnCon = () => {
    if(userInfo.user_info){
      if(userInfo.user_info.userInfo.type!=='admin'){
        return <button className={clsx(vacation.follows.some(
          (like) => like.user_id === userInfo.user_info.userInfo.id
        ) && classes.socialBtnActive)}
              onClick={() => {
                fetchFollowVacation(vacation.id);
              }}
            >
              {vacation.follows.some(
                (like) => like.user_id === userInfo.user_info.userInfo.id
              )
                ? "Following"
                : "Follow"}
            </button>
      }

    }
  }
  const likeBtnCon = () => {
    if(userInfo.user_info){

      if(userInfo.user_info.userInfo.type!=='admin'){
        return  <button className={clsx(vacation.likes.some(
          (like) => like.user_id === userInfo.user_info.userInfo.id
        ) && classes.socialBtnActive)}
        onClick={() => {
          fetchLikeVacation(vacation.id);
        }}
      >
        {/* Like */}
        {vacation.likes.some(
          (like) => like.user_id === userInfo.user_info.userInfo.id
        )
          ? <FavoriteIcon className={clsx(classes.like)}/ >
          :<FavoriteBorderIcon />}
      </button>
      }
    }
  }


  
  // oooooooooooo oooooooooooo oooooooooooo oooooooooooo   .oooooo.   ooooooooooooo
  // `888'     `8 `888'     `8 `888'     `8 `888'     `8  d8P'  `Y8b  8'   888   `8
  //  888          888          888          888         888               888
  //  888oooo8     888oooo8     888oooo8     888oooo8    888               888
  //  888    "     888    "     888    "     888    "    888               888
  //  888       o  888          888          888       o `88b    ooo       888
  // o888ooooood8 o888o        o888o        o888ooooood8  `Y8bood8P'      o888o
  useEffect(() => {
    setCommentDiv(false);
    setEditTog(true);
  }, [refreshUnit]);
  
  if(!userInfo.user_info || !vacation.comments){
    return <div>Loading!</div>
  }
  console.log(vacation.comments)
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
      {editTog ? (
        <div
        className={clsx(classes.title)}
        onClick={()=>{
          history.push(`/location/${vacation.location_id}`)
        }}
        >{`${vacation.location_name}, ${vacation.country}`}</div>
      ) : (
        <div>
        {!chosenResultEditLocation &&  <input
            type="text"
            className={clsx(chosenResultEditLocation ? "hidden" : "active", classes.editInput)}
            placeholder={"Location name: " + vacation.location_name + ". Enter location and select from results."}
           
            onChange={async (e) => {
              setInput(e.target.value);
              if(e.target.value==''){
                  setLocationsSearchResults(false)
                } else {
                    await fetchSearchLocations();
              }
            }}
          />}
          <div className={clsx(classes.editLocationResCont, locationsSearchResults && locationsSearchResults.length>0 ? 'active' : 'hidden')}>
          {locationsSearchResults && (!chosenResultEditLocation ? (
              locationsSearchResults.map((location) => (
                <div
                  key={location.id}
                  onClick={() => {
                    setChosenResultEditLocation(true);
                    setChosenResultEditLocationText(
                      `${location.name}, ${location.country}`
                    );
                    setLocationId(location.id);
                  }}
                >
                  {location.name}
                </div>
              ))
            ) : (
              <div
              className={clsx(classes.noHover)}
              >
                <div>{chosenResultEditLocationText}</div>
                <button
                  
                  onClick={() => {
                    setChosenResultEditLocation(false);

                    setLocationId(0);
                  }}
                >
                  cancel
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

{/* <Divider /> */}

      {editTog ? (
        <div
        className={clsx(classes.vname)}
        onClick={()=>{
          history.push(`/vacation/${vacation.id}`)
        }}
        >{vacation.name}</div>
      ) : (
        <div>
          <input
            className={clsx(classes.editInput)}
            type="text"
            placeholder={`Vacation name: ${vacation.name}`}
            onChange={(e) => {
              setName(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                fetchEditVacation();
                setRefreshUnit(!refreshUnit);
              }
            }}
          />
        </div>
      )}

      {editTog ? (
        <div
        className={clsx(classes.description, vacation.description ? 'active' : 'hidden')}
        onClick={()=>{
          history.push(`/vacation/${vacation.id}`)
        }}
        >{vacation.description}</div>
      ) : (
        <div>
          <input
            className={clsx(classes.editInput)}

            type="text"
            placeholder={`Vacation description: ${vacation.description || 'No description yet'}`}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                fetchEditVacation();
                setRefreshUnit(!refreshUnit);
              }
            }}
          />
        </div>
      )}

      
      {editTog ? (
        <img src={vacation.img_src || 'https://images.pexels.com/photos/1412235/pexels-photo-1412235.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'} className={clsx(classes.vacationImg)} alt="Vacation img" />
      ) : (
        <div>
            <input
            className={clsx(classes.editInput)}

              type="text"
              placeholder={`Img src: ${vacation.img_src || 'No image'}`}
              onChange={(e) => {
                setImgSrc(e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  fetchEditVacation();
                  setRefreshUnit(!refreshUnit);
                }
              }}
              />
        </div>
      )}
      
      <div className={clsx(classes.infoCont)}>

      <div className={clsx(classes.info)}>
        {editTog ? (
          <div className={vacation.discount && clsx(classes.lineThrough)}>Price: ${numberWithCommas(vacation.price)}</div>
        ) : (
          <div>
            <input
            className={clsx(classes.priceingEditInput, classes.editInput)}

              type="text"
              placeholder={"Price: $" + vacation.price}
              onChange={(e) => {
                setPrice(+e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  fetchEditVacation();
                  setRefreshUnit(!refreshUnit);
                }
              }}
            />
          </div>
        )}

        {editTog ? (
          <div className={vacation.discount ? "active" : "hidden"}>
            Discount: ${vacation.discount && numberWithCommas(vacation.discount)}
          </div>
        ) : (
          <div>
            <div>
              <input
            className={clsx(classes.priceingEditInput, classes.editInput)}

                type="text"
                placeholder={"Discount: $" + vacation.discount}
                onChange={(e) => {
                  if(e.target.value==0){
                    setDiscount(0.1)
                    return
                  }
                  setDiscount(+e.target.value);
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    fetchEditVacation();
                    setRefreshUnit(!refreshUnit);
                  }
                }}
              />
            </div>
          </div>
        )}

        
        {editTog ? (
          <div
          className={vacation.credits ? 'active' : 'hidden'}
          >Credits Earned: {vacation.credits && numberWithCommas(vacation.credits)}<span className={clsx(classes.gold)}> &nbsp;Club Credits!</span></div>
        ) : (
          <div>
            <input
            className={clsx(classes.priceingEditInput, classes.editInput)}

              type="text"
              placeholder={"Credits Earned: " + vacation.credits + " Club Credits!"}
              onChange={(e) => {
                if(e.target.value==0){
                  setCredits(0.1)
                  return
                }
                setCredits(+e.target.value);
              }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  fetchEditVacation();
                  setRefreshUnit(!refreshUnit);
                }
              }}
            />
          </div>
        )}
        </div>

        <div className={clsx(classes.info, classes.dates)}>

        {editTog ? (
          <div>{moment(vacation.start_date).format("L")}</div>
        ) : (
          <div>
            <TextField
              id="date"
              label="Start Date"
              type="date"
              defaultValue={
                moment(parseISO(vacation.start_date)).format().split("T")[0]
              }
              className={"ok"}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                setStartDate(+e.target.value.split("-").join(""));
              }}
            />
          </div>
        )}

        <ArrowForwardIcon />

        {editTog ? (
          <div>{moment(vacation.end_date).format("L")}</div>
        ) : (
          <div>
            <TextField
              id="date"
              label="End Date"
              type="date"
              defaultValue={
                moment(parseISO(vacation.end_date)).format().split("T")[0]
              }
              className={"ok"}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                setEndDate(+e.target.value.split("-").join(""));
              }}
            />
          </div>
        )}

      </div>


      <div className={clsx(classes.info)}>
        <div>{vacation.follows && numberWithCommas(vacation.follows.length)} Followers</div>
        <div className={clsx(classes.flexAling)}>{vacation.likes && numberWithCommas(vacation.likes.length)} Likes</div>
        <div>{vacation.comments && numberWithCommas(vacation.comments.length)} Comments</div>
      </div>
      </div>




      <div className={clsx(editTog ? classes.socialBar : classes.editBar)}>
        {followBtnCon()}
        {likeBtnCon()}
        {userInfo.user_info.userInfo.type === "admin" && (
          <button
            className={clsx(classes.editUnit)}
            onClick={() => {
              setEditTog(!editTog);
              if (!editTog) {
                fetchEditVacation();
                setRefreshUnit(!refreshUnit);
                // console.log(img_src)
              }
            }}
          >
            {!editTog ? "Save" : <EditIcon />}
          </button>
        )}
        {userInfo.user_info.userInfo.type === "admin" && !editTog && (
          <button
          className={clsx(classes.cancelEditBtn)}
            onClick={() => {
              setEditTog(!editTog);
            }}
          >
            Cancel
          </button>
        )}
        {userInfo.user_info.userInfo.type === "admin" && (
          <button
            className={clsx(classes.delUnit)}
            onClick={() => {
              fetchDelVacation(vacation.id);
            }}
          >
            <DeleteIcon />
          </button>
        )}
        <button className={clsx(commentDiv && classes.socialBtnActive)}
          onClick={() => {
            setCommentDiv(!commentDiv);
          }}
        >
          <ChatBubbleOutlineIcon />
        </button>
      </div>
      {userInfo.user_info.userInfo.type !== "admin"
          &&

          <button
          onClick={()=>{history.push(`/pay/vacation/${vacation.id}`)}}
          className={clsx(classes.buyNowBtn)}
          >Buy Now!</button>
          }
      <div className={clsx(commentDiv ? classes.active : classes.hidden)}>
        {/* commnets */}
        <div className={clsx(classes.commentCont)}>
          {vacation.comments.map((comment) => (



            <div key={comment.id} className={clsx(classes.commentUnit)}>
              <div className={clsx(classes.commentUnitPicCont)}>
                {/* <img src={userInfo.user_info.userInfo.img_src || 'https://www.pngix.com/pngfile/big/270-2709413_default-avatar-profile-picture-placeholder-round-hd-png.png'} */}
                <img src={(comment.user_id===userInfo.user_info.userInfo.id && userInfo.user_info.userInfo.type!=='admin') ? memberPic : ((userInfo.user_info.userInfo.type==='admin' && comment.user_id===1) ? adminProfilePic : randomProfilePic())}
                alt="Profile Pic" />
              </div>
              <div className={clsx(classes.commentUnitContentCont)}>
                <div className={clsx(classes.CUusername)}>
                  {comment.user_name}
                </div>
                <div className={clsx(classes.CUtext)}>{comment.text}</div>
                <div className={clsx(classes.CUdate)}>{isToday(new Date(comment.date)) ?'Today, ' + moment(comment.date).format('HH:mm') : moment(comment.date).format('MM/DD/YYYY, HH:mm')}</div>

              </div>
              {(userInfo.user_info.userInfo.type === "admin" ||
                userInfo.user_info.userInfo.id === comment.user_id) && (
                <DeleteIcon
                  className={clsx(classes.commentDel)}
                  onClick={() => {
                    fetchDelCommentVacation(comment.id);
                  }}
                />
              )}
            </div>
          ))}
          <div className={clsx(classes.postCommentCont)}>
            <div className={clsx(classes.postCommentPicCont)}>
              <img
                src={userInfo.user_info.userInfo.img_src || memberPic}
                alt="Profile Pic"
              />
            </div>
            <input
              type="text"
              placeholder='Press enter to comment'
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  fetchCommentVacation(vacation.id, e.target.value);
                  e.target.value = "";
                }
              }}
            />
          </div>
         

          
        </div>
      </div>
    </div>
  );
}
