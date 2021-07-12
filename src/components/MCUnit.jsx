import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory, useLocation, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import moment from "moment";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import EditIcon from '@material-ui/icons/Edit';


import clsx from "clsx";
import Delete from "@material-ui/icons/Delete";
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
    // background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    background:'linear-gradient(to right, #12c2e9, #c471ed, #f64f59);',
    border: 0,
    borderRadius: 3,
    // boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .9)",
    color: "white",
    height: "fit-content",
    padding: "15px",
    width: "fit-content",
    // margin: "30px",
    width: '100%',
    boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',

    [theme.breakpoints.down('sm')]: {
      width: "70%",
      padding: '5px',
      width: 'calc(100% - 40px)',
      padding: '20px',
    },

  },
  img:{
    width: '100%',
    borderRadius: 3,

  },
  title:{
    color: 'white',
    fontSize: '1.5rem',
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
    fontSize: '2rem',
    margin: '20px 0',
    fontWeight: '500',
    // letterSpacing: '3mm',
    textShadow: '1px 0px 1px rgba(150, 150, 150, 1);'
  },
  info:{
    color: '#02243A    ',
    backgroundColor: '#DADEE1',
    padding: '5px 10px',
    borderRadius: 3,
    margin: '20px 0',
    width: '15rem',
    height: '5rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '30%',
    alignItems: 'center',
  },
  infoCont:{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 'fit-content',
    letterSpacing: '.2mm',
    fontSize: '1.1rem',

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      '&>*':{
        width: '90%',
      }
    },
  },
  dates:{
    flexDirection: 'row',
    alignItems: 'center',
    // padding: '25px',
    // padding: '5px 10px',
    fontSize: '1.4rem',
    justifyContent: 'space-evenly',
    width: '60%',
    // boxSizing:'border-box'
    [theme.breakpoints.down('sm')]: {
      width: '90%',
      fontSize: '1rem',
      flexDirection: 'column',
      height: '200px',

    },
  },
  gold:{
    color: '#3DCE1A',
    fontWeight: '600',
    letterSpacing: '.2mm'
    // backgroundColor: '#5B574F',
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
    // marginTop: '5px',
    fontWight: 'bold',
    '&:hover':{
      background: '#E7FB10'
    }
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
    }
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
    backgroundColor:'rgba(199, 135, 236, .8)      ',
    color: 'white',
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 16px)',

    },
    },
  },
  editLocationResCont: {
    // border: '1px solid blue',
    borderRadius: 3,
    width: '40%',
    padding: '8px 8px',
    marginBottom: '10px',
    backgroundColor: '#DADEE1',
    flexDirection: 'column',
    color: 'black',
    '&>*':{
      borderRadius: 3,
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
  width100:{
    width:'100%',
  },


}));

export default function MCUnit({ clubProduct, update, setUpdate, display }) {
  // oooooooooooo ooooo     ooo ooooo      ooo   .oooooo.   ooooooooooooo ooooo   .oooooo.   ooooo      ooo  .oooooo..o
  // `888'     `8 `888'     `8' `888b.     `8'  d8P'  `Y8b  8'   888   `8 `888'  d8P'  `Y8b  `888b.     `8' d8P'    `Y8
  //  888          888       8   8 `88b.    8  888               888       888  888      888  8 `88b.    8  Y88bo.
  //  888oooo8     888       8   8   `88b.  8  888               888       888  888      888  8   `88b.  8   `"Y8888o.
  //  888    "     888       8   8     `88b.8  888               888       888  888      888  8     `88b.8       `"Y88b
  //  888          `88.    .8'   8       `888  `88b    ooo       888       888  `88b    d88'  8       `888  oo     .d8P
  // o888o           `YbodP'    o8o        `8   `Y8bood8P'      o888o     o888o  `Y8bood8P'  o8o        `8  8""88888P'
  const fetchAllLocations = async () => {
    try {
      const res = await fetch(
        // `https://ancient-reef-92615.herokuapp.com/controlPanel/manageLocations`,
        `/api/controlPanel/manageLocations`,
        // `http://localhost:666/controlPanel/manageLocations`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            authorization: localStorage.token,
          },
        }
      );
      const data = await res.json();
      // console.log(data);

      if (res.status !== 200) {
        // console.log("FAILED TO FETCH");
        return 1;
      }

      setAllLocations(data.locationsArr);
    } catch (error) {
      // console.log(error);
    }
  };
  const fetchSearchLocations = async () => {
    try {
      // const res = await fetch(`https://ancient-reef-92615.herokuapp.com/explore/search`, {
      const res = await fetch(`/api/explore/search`, {
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
  const fetchDelClubProduct = async () => {
    try {
      // await fetch(`https://ancient-reef-92615.herokuapp.com/controlPanel/manageClub`, {
      await fetch(`/api/controlPanel/manageClub`, {
      // await fetch(`http://localhost:666/controlPanel/manageClub`, {
        method: "DELETE",
        body: JSON.stringify({
          id: clubProduct.id,
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
  const fetchEditClubProduct = async () => {
    try {
      // const res = await fetch(`https://ancient-reef-92615.herokuapp.com/controlPanel/manageClub`, {
      const res = await fetch(`/api/controlPanel/manageClub`, {
      // const res = await fetch(`http://localhost:666/controlPanel/manageClub`, {
        method: "PUT",
        body: JSON.stringify({
          id: clubProduct.id,
          price,
          name,
          start_date,
          end_date,
          location_id,
          img_src: imgSrc,
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
  //  .oooooo..o ooooooooooooo       .o.       ooooooooooooo oooooooooooo
  //  d8P'    `Y8 8'   888   `8      .888.      8'   888   `8 `888'     `8
  //  Y88bo.           888          .8"888.          888       888
  //   `"Y8888o.       888         .8' `888.         888       888oooo8
  //       `"Y88b      888        .88ooo8888.        888       888    "
  //  oo     .d8P      888       .8'     `888.       888       888       o
  //  8""88888P'      o888o     o88o     o8888o     o888o     o888ooooood8
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [start_date, setStartDate] = useState("");
  const [end_date, setEndDate] = useState("");
  const [location_id, setLocationId] = useState(0);
  const [imgSrc, setImgSrc] = useState("");
  const [allLocations, setAllLocations] = useState([]);
  const [editTog, setEditTog] = useState(false);
  const [input, setInput] = useState("");
  const [locationsSearchResults, setLocationsSearchResults] = useState([]);
  const [chosenResultEditLocation, setChosenResultEditLocation] =
    useState(false);
  const [chosenResultEditLocationText, setChosenResultEditLocationText] =
    useState("");

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
    if(!display){
      fetchAllLocations();
    }
  }, []);

    //   .oooooo.     .oooooo.   ooooo      ooo oooooooooo.   ooooo ooooooooooooo ooooo   .oooooo.   ooooo      ooo oooooooooooo ooooooooo.   
    //  d8P'  `Y8b   d8P'  `Y8b  `888b.     `8' `888'   `Y8b  `888' 8'   888   `8 `888'  d8P'  `Y8b  `888b.     `8' `888'     `8 `888   `Y88. 
    // 888          888      888  8 `88b.    8   888      888  888       888       888  888      888  8 `88b.    8   888          888   .d88' 
    // 888          888      888  8   `88b.  8   888      888  888       888       888  888      888  8   `88b.  8   888oooo8     888ooo88P'  
    // 888          888      888  8     `88b.8   888      888  888       888       888  888      888  8     `88b.8   888    "     888`88b.    
    // `88b    ooo  `88b    d88'  8       `888   888     d88'  888       888       888  `88b    d88'  8       `888   888       o  888  `88b.  
    //  `Y8bood8P'   `Y8bood8P'  o8o        `8  o888bood8P'   o888o     o888o     o888o  `Y8bood8P'  o8o        `8  o888ooooood8 o888o  o888o  
    if(!userInfo){
      return <div>Loading</div>
    }
    if(!userInfo.user_info){
      return <div>Loading</div>
    }
    if(clubProduct===undefined || update===undefined || setUpdate===undefined){
      // console.log('go')
        return <div>Loading</div>
    }
    const buyBtn = ()=>{
      if(userInfo.user_info.userInfo.type!=='admin'){
        return <div>
          <button
          className={clsx(classes.buyNowBtn)}
          onClick={()=>{
            history.push(`/pay/clubProduct/${clubProduct.id}`)
          }}
          >Get Now!</button>
        </div>
      }
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
    <div className={classes.root}>
      <div
      className={clsx(classes.inputCont)}
      >

      {!editTog ? (
        <div
        className={clsx(classes.title)}
        >{clubProduct.location_name}, {clubProduct.country}</div>
      ) : (
        <div>
         {!chosenResultEditLocation && <input
            type="text"
            className={clsx(chosenResultEditLocation ? classes.hidden : classes.active)}
            placeholder={"Location name: " + clubProduct.location_name}
            onChange={async (e) => {
                
              setInput(e.target.value);
              if(e.target.value==''){
                  setLocationsSearchResults(false)
                } else {
                    await fetchSearchLocations();
              }
            }}
          />}


        {locationsSearchResults && locationsSearchResults.length>0 &&  <div
          className={clsx(classes.editLocationResCont)}
          >
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
                  Cancel
                </button>
              </div>
            ))}
          </div>}
        </div>
      )}
      {!editTog ? (
        <div
        className={clsx(classes.vname)}
        >{clubProduct.name}</div>
      ) : (
          <input
            placeholder={`Club Product name: ${clubProduct.name}`}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
      )}

      {!editTog ?
      <img src={clubProduct.img_src || '/clubProducts/greece.jpg'} alt="Club Product" className={clsx(classes.img)} />  
      :
      <input placeholder={`Img Src: ${clubProduct.img_src || 'No Image'}`} 
          onChange={e=>{
              setImgSrc(e.target.value)
          }}
          />
    }

    {editTog &&   <input
            placeholder={`Price: ${clubProduct.price} Club Credits`}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />}
      </div>

    <div
      className={clsx(classes.infoCont)}
    >

      {!editTog ? (
        <div
        className={clsx(classes.info)}
        >
          {/* <div>Price:</div> */}
          <div>{clubProduct.price && numberWithCommas(clubProduct.price)} </div>
           <div><span className={clsx(classes.gold)}>Club Credits</span></div>
          </div>
      ) : (
        <div>
        
        </div>
      )}

      <div
        className={clsx(classes.info, classes.dates, editTog && classes.width100)}
      >

      {!editTog ? (
        <div
        
        >
         {moment(clubProduct.start_date).format("YYYY/MM/DD")}
        </div>
      ) : (
        <div
        >
          <TextField
            id="date"
            label="Start Date"
            type="date"
            defaultValue={moment(clubProduct.start_date).format("YYYY-MM-DD")}
            className={classes.textField}
            onChange={(e) => {
              setStartDate(e.target.value);
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      )}
      { <div><ArrowForwardIcon /></div>}
      {!editTog ? (
        <div
        >{moment(clubProduct.end_date).format("YYYY/MM/DD")}</div>
      ) : (
        <div>
          <TextField
            id="date"
            label="End Date"
            type="date"
            defaultValue={moment(clubProduct.end_date).format("YYYY-MM-DD")}
            className={classes.textField}
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      )}
      </div>
    </div>



    <div
    className={clsx(classes.editBar)}
    >

      {userInfo.user_info.userInfo.type === "admin" && (
        <button
        className={clsx(classes.editBtn)}

          onClick={() => {
            setEditTog(!editTog);
            if(editTog){
                fetchEditClubProduct()
            }
          }}
        >
          {editTog ? "Save" : <EditIcon />}
        </button>
      )}

      {userInfo.user_info.userInfo.type === "admin" && (
        <button
        className={clsx(classes.delBtn)}
          onClick={() => {
            // setEditTog(!editTog);
            fetchDelClubProduct()
          }}
        >
          <Delete />
        </button>
      )}
    </div>
    

      {buyBtn()}
    </div>
  );
}
