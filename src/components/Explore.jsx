import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory, useLocation, Link } from "react-router-dom";
import VacationUnit from "./VacationUnit";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import FormControl from 'react-bootstrap/FormControl'
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import ControlPointIcon from '@material-ui/icons/ControlPoint';


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
    width: '70%',
    marginTop: '100px',
    position:'relative',
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 40px)',
      padding: '20px',
    },
  },
  pageTitle: {
    display: "flex",
    justifyContent: "center",
    fontSize: "3rem",
    color: "white",
    textShadow:
      "0px 4px 3px rgba(0,0,0,0.4), 0px 8px 13px rgba(0,0,0,0.1), 0px 18px 23px rgba(0,0,0,0.1)",
    
  },
  searchInputCont: {
    display: "flex",
    justifyContent: "center",
  },
  searchInput: {
    padding: '5px 5px 5px 10px',
    borderRadius: 3,
    border: 'none',
    backgroundColor: 'white',
    opacity: .8,
    outline: 'none',
    height: '2rem',
    width: '200px',
    boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
  },
  searchResCont:{
    backgroundColor:'white',
    width: '215px',

  },
  searchBoxContCont:{
    display: 'flex',
    justifyContent: 'center',
  },
  active:{
    display: 'flex'
  },
  hidden:{
    display: 'none'
  },
  searchTitle: {
    backgroundColor: '#1d4d99',
    padding: '3px',
    opacity: .6,
    color: 'white'
  },
  searchRes: {
    backgroundColor: '#40bec2',
    padding: '3px',
    opacity: .6,
    color: 'white',
    borderBottom: '.5px solid gray' ,
    borderWidth: '10px',
    '&:hover':{
      backgroundColor:'blue',
    }
  },
  temp:{
    position:'relative'
  },
  addBtn: {
    position: 'absolute',
    top: '25px',
    right: '0',
    height: '50px',
    // width: '50px',
    color:'#DEF1F1',
    backgroundColor:'rgba(4, 15, 99,.8)',
    border: 'none',
    borderRadius: 3,
    width: '10rem',
    '&:hover':{
      backgroundColor:'rgba(4, 15, 99,.9)',
    boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
      
    },




    [theme.breakpoints.down('sm')]: {
      top: '-20px',
      // left: '0px',
      position: 'static',
      marginTop: '20px',
      width: '100%',
      // border: '1px solid red',
    },

  },
  ambiTitle: {
    backgroundColor: 'white',
    height: '2.2rem',
    marginTop: '20px',
    display: 'flex',
    alignItems: 'center',
    padding: '20px',
    borderRadius: 3,
    fontSize: '1.5rem',
    width: 'fit-content',
    boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',

    [theme.breakpoints.down('sm')]: {
      // marginLeft: '5px',
    },
  },
}));

export default function Explore() {
  // oooooooooooo ooooo     ooo ooooo      ooo   .oooooo.   ooooooooooooo ooooo   .oooooo.   ooooo      ooo  .oooooo..o
  // `888'     `8 `888'     `8' `888b.     `8'  d8P'  `Y8b  8'   888   `8 `888'  d8P'  `Y8b  `888b.     `8' d8P'    `Y8
  //  888          888       8   8 `88b.    8  888               888       888  888      888  8 `88b.    8  Y88bo.
  //  888oooo8     888       8   8   `88b.  8  888               888       888  888      888  8   `88b.  8   `"Y8888o.
  //  888    "     888       8   8     `88b.8  888               888       888  888      888  8     `88b.8       `"Y88b
  //  888          `88.    .8'   8       `888  `88b    ooo       888       888  `88b    d88'  8       `888  oo     .d8P
  // o888o           `YbodP'    o8o        `8   `Y8bood8P'      o888o     o888o  `Y8bood8P'  o8o        `8  8""88888P'
  const fetchSearchExplore = async () => {
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

      setVacationsSearchResults(data.vacationsSearchResults);
      setLocationsSearchResults(data.locationsSearchResults);
    } catch (error) {
      // console.log(error);
    }
  };
  const fetchVacations = async () => {
    try {
      // const res = await fetch(`https://ancient-reef-92615.herokuapp.com/explore`, {
      const res = await fetch(`/api/explore`, {
      // const res = await fetch(`http://localhost:666/explore`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: localStorage.token,
        },
      });
      const data = await res.json();

      if (res.status !== 200) {
        return 1;
      }

      setFollowedVacations(data.vacationsFollowedByUser);
      setRestOfVacations(data.restOfVactions);
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
  const [input, setInput] = useState("");
  const [vacationsSearchResults, setVacationsSearchResults] = useState([]);
  const [locationsSearchResults, setLocationsSearchResults] = useState([]);
  const [followedVacations, setFollowedVacations] = useState([]);
  const [restOfVacations, setRestOfVacations] = useState([]);
  const [update, setUpdate] = useState(false);
  
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
  const searchInputRef = useRef('')
  const dispatch = useDispatch()
  
  // oooooooooooo oooooooooooo oooooooooooo oooooooooooo   .oooooo.   ooooooooooooo
  // `888'     `8 `888'     `8 `888'     `8 `888'     `8  d8P'  `Y8b  8'   888   `8
  //  888          888          888          888         888               888
  //  888oooo8     888oooo8     888oooo8     888oooo8    888               888
  //  888    "     888    "     888    "     888    "    888               888
  //  888       o  888          888          888       o `88b    ooo       888
  // o888ooooood8 o888o        o888o        o888ooooood8  `Y8bood8P'      o888o
  useEffect(() => {
    fetchVacations();
    // kickInvalidToken()
  }, [update]);

  const checkRes = () => {
    if(vacationsSearchResults===undefined){
      return <div>loading</div>
    }
    if(locationsSearchResults===undefined){
      return <div>loading</div>
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
    

    <div className={clsx(classes.root)}>
      <div className={clsx(classes.temp)}>{"\xa0"}</div>
      <h1 className={clsx(classes.pageTitle)}>Explore</h1>
      <div className={clsx(classes.searchInputCont)}>
      <input
      id="outlined-basic"  variant="outlined"
        className={clsx(classes.searchInput)}
        type="text"
        placeholder={'Search'}
        onChange={async (e) => {
          setInput(e.target.value);
          fetchSearchExplore();
        }}
      />
      </div>
      {(locationsSearchResults && vacationsSearchResults) && <div className={clsx(input !== '' && (locationsSearchResults.length>0 || vacationsSearchResults.length>0)? classes.active : classes.hidden, classes.searchBoxContCont)}>
        <div className={clsx(classes.searchResCont)}>
          {locationsSearchResults.length>0 && <div className={clsx(classes.searchTitle)}>Locations:</div>}
          <div>
            {locationsSearchResults &&
              locationsSearchResults.map((location) => (
                <div
                key={location.id}
                >
                  <div
                    className={clsx(classes.searchRes)}
                    onClick={() => {
                      history.push(`/location/${location.id}`);
                    }}
                  >
                    {location.name}
                  </div>
                </div>
              ))}
          </div>
          {vacationsSearchResults.length>0 && <div className={clsx(classes.searchTitle)}>Vacations:</div>}
          <div>
            {vacationsSearchResults &&
              vacationsSearchResults.map((vacation) => (
                <div
                key={vacation.id}
                >
                  <div
                    className={clsx(classes.searchRes)}
                    onClick={() => {
                      history.push(`/vacation/${vacation.id}`);
                    }}
                  >
                    {vacation.name}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>}
      {userInfo.user_info && userInfo.user_info.userInfo.type === "admin" && (
        <button className={clsx(classes.addBtn)} 
        onClick={()=>{
          history.push('/explore/add')
        }}
        >Add Vacation</button>
      )}
      {userInfo.user_info && userInfo.user_info.userInfo.type !== "admin" ? (
        <div>
          <div>
           {followedVacations.length>0 && <div className={clsx(classes.ambiTitle)}>You Follow</div>}
            <div>
              {followedVacations &&
                followedVacations.map((vacation) => (
                  <VacationUnit
                  key={vacation.id}
                    vacation={vacation}
                    setUpdate={setUpdate}
                    update={update}
                  />
                ))}
            </div>
          </div>
          <div>
            <div className={clsx(classes.ambiTitle)}>More Vacations</div>
            <div>
              {restOfVacations &&
                restOfVacations.map((vacation) => (
                  <VacationUnit
                  key={vacation.id}
                    vacation={vacation}
                    setUpdate={setUpdate}
                    update={update}
                  />
                ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className={clsx(classes.ambiTitle)}>Vacations</div>
          <div>
            {restOfVacations &&
              restOfVacations.map((vacation) => (
                <VacationUnit
                key={vacation.id}
                  vacation={vacation}
                  setUpdate={setUpdate}
                  update={update}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
