import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory, useLocation, Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import PlanMap from "./PlanMap";
import VacationUnit from "./VacationUnit";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Checkbox from '@material-ui/core/Checkbox';
import { green } from '@material-ui/core/colors';



// .oooooo..o ooooooooooooo oooooo   oooo ooooo        oooooooooooo  .oooooo..o
// d8P'    `Y8 8'   888   `8  `888.   .8'  `888'        `888'     `8 d8P'    `Y8
// Y88bo.           888        `888. .8'    888          888         Y88bo.
//  `"Y8888o.       888         `888.8'     888          888oooo8     `"Y8888o.
//      `"Y88b      888          `888'      888          888    "         `"Y88b
// oo     .d8P      888           888       888       o  888       o oo     .d8P
// 8""88888P'      o888o         o888o     o888ooooood8 o888ooooood8 8""88888P'
const useStyles = makeStyles(theme=>({
  rootTop: {
    // background: "linear-gradient(45deg, #126929 30%, #c41bbc 90%)",
    // position: 'relative',
    width: "70%",
    marginTop: "100px",
  },
  rootBot: {
    // background: "linear-gradient(45deg, #126929 30%, #c41bbc 90%)",
    // position: 'relative',
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
  pageTitle: {
    display: "flex",
    justifyContent: "center",
    fontSize: "3rem",
    color: "white",
    textShadow:
      "0px 4px 3px rgba(0,0,0,0.4), 0px 8px 13px rgba(0,0,0,0.1), 0px 18px 23px rgba(0,0,0,0.1)",
  },
  selectALocation: {
    backgroundColor: '#2B04CB    ',
    width: 'fit-content',
    padding: '15px',
    borderRadius: 3,
    margin: '15px 0',
    color: 'linen',
    boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
    letterSpacing: '.5mm',
    
  },
  infoDiv: {
    backgroundColor: 'linen',
    width: '25%',
    padding: '15px',
    borderRadius: 3,
    margin: '15px 0',
    // color: 'gold',
    boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
    // letterSpacing: '.5mm',
    color: '#02243A    ',
    '&>:first-child':{
      color: '#E57008',
      fontSize: '1.2rem',
    },
    position: 'relative',

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '90%',
      '&>*':{
        // border: '1px solid yellow',
      }
    },

  },
  infoDivSocial: {
    color: '#02243A    ',
    backgroundColor: '#DADEE1',
    padding: '15px',
    borderRadius: 3,
    marginTop: '20px',
  display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  favBtn: {
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
    }
  },
  locationInfoFilterCont: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      '&>*':{
        // border: '1px solid yellow',
      }
    },
  },
  filterCont: {
    backgroundColor: '#0B7015',
    width: '65%',
    padding: '15px',
    borderRadius: 3,
    margin: '15px 0',
    // color: 'gold',
    boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
    position: 'relative',
    // letterSpacing: '.5mm',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',


    color: '#02243A    ',
    '&>:first-child':{
      display: 'flex',
      alignItems: 'center',
    position: 'absolute',
      top: '15px',
      left: '15px',
      
    },

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '300px',
      '&>*':{
        // border: '1px solid yellow',
      }
    },
  },
  filterCb:{
    border: 'none',
    height: '25px',
    width: '25px',
    color: 'violet',
    // backgroundColor: 'black'
    '&$checked':{
      color: green[600],
    }
  },
  filterTitle:{
    color: 'white',
    paddingBottom: '3px'
  },
  filterBtn: {
    position: 'absolute',
    right: '15px',
    bottom: '15px',
    border: 'none',
    height: '40px',
    borderRadius: 3,
    padding: '13px',
    backgroundColor: '#F3B71C',
    color: '#0B7015',
    '&$disabled':{
      backgroundColor:'rgba(28, 243, 49, .2)'
    },
    '&:hover':{
      backgroundColor: 'rgba(28, 243, 49, .8)'
    }
  },
  dateFilter: {
    display: 'flex',
    backgroundColor: 'bisque',
    borderRadius: 3,
    width: '50%',
    justifyContent: 'space-between',
    height: '70px',
    alignItems: 'center',
    padding: '15px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      height: '150px',
      width: '90%',
      '&>*':{
        // border: '1px solid yellow',
      }
    },

  },
  vacationDiv:{
    // padding: '5px',
  },
}));

export default function Plan() {
  // oooooooooooo ooooo     ooo ooooo      ooo   .oooooo.   ooooooooooooo ooooo   .oooooo.   ooooo      ooo  .oooooo..o
  // `888'     `8 `888'     `8' `888b.     `8'  d8P'  `Y8b  8'   888   `8 `888'  d8P'  `Y8b  `888b.     `8' d8P'    `Y8
  //  888          888       8   8 `88b.    8  888               888       888  888      888  8 `88b.    8  Y88bo.
  //  888oooo8     888       8   8   `88b.  8  888               888       888  888      888  8   `88b.  8   `"Y8888o.
  //  888    "     888       8   8     `88b.8  888               888       888  888      888  8     `88b.8       `"Y88b
  //  888          `88.    .8'   8       `888  `88b    ooo       888       888  `88b    d88'  8       `888  oo     .d8P
  // o888o           `YbodP'    o8o        `8   `Y8bood8P'      o888o     o888o  `Y8bood8P'  o8o        `8  8""88888P'
  const fetchAllLocations = async () => {
    try {
      const res = await fetch(`https://ancient-reef-92615.herokuapp.com/location`, {
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
      //   console.log(data);
      setLocationsArr(data.locations);
    } catch (error) {
      // console.log(error);
    }
  };
  const fetchFavLocation = async () => {
    try {
      const res = await fetch(`https://ancient-reef-92615.herokuapp.com/location/fav`, {
        method: "POST",
        body: JSON.stringify({
          id: chosenLocation.id,
        }),
        headers: {
          "content-type": "application/json",
          authorization: localStorage.token,
        },
      });

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
  const fetchVacations = async () => {
    const res = await fetch(`https://ancient-reef-92615.herokuapp.com/location/vacationsFiltered`, {
      method: "POST",
      body: JSON.stringify({
        id: chosenLocation.id,
        start: startDateInput,
        end: endDateInput,
      }),
      headers: {
        "content-type": "application/json",
        authorization: localStorage.token,
      },
    });
    const data = await res.json();

    if (res.status !== 200) {
      // console.log(data.fail);
      return;
    }

    // setLocation(data.location);
    setVacations(data.locationVacations);
    setUpdate(!update);
    // console.log("location vacations:", data.locationVacations);
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
  const [locationsArr, setLocationsArr] = useState([]);
  const [vacations, setVacations] = useState([]);
  const [chosenLocation, setChosenLocation] = useState(0);
  const [filterTog, setFilterTog] = useState(false);
  const [startDateInput, setStartDateInput] = useState(0);
  const [endDateInput, setEndDateInput] = useState(0);
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
    fetchAllLocations();
    // kickInvalidToken();
    // setFilterTog(false)
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
  const locationInfoDiv = () => {
    if (chosenLocation === 0) {
      return <div
      className={clsx(classes.selectALocation)}
      >Select a location</div>;
    }
    return (
      <div
      className={clsx(classes.infoDiv)}
      
      >
        <div>{chosenLocation.name} ,{chosenLocation.country}</div>
        <div className={(clsx(classes.infoDivSocial))}
        
        >
        {/* <div>Favorited By: {chosenLocation.locationFavoredBy.length}</div> */}
        <div>Favorited By: {locationsArr.find(location=>location.id===chosenLocation.id).locationFavoredBy.length}</div>
        <div>Vacations: {chosenLocation.locationVacations.length}</div>
        </div>
        {favBtn()}
      </div>
    );
  };
  const filterDiv = () => {
    if (chosenLocation === 0) {
      return;
    }
    return (
      <div
      className={clsx(classes.filterCont)}
      >
        <div
          className={clsx(classes.filterCbCont)}
        >
          <Checkbox
          className={clsx(classes.filterCb)}
            type="checkbox"
            onChange={(e) => {
              setFilterTog(!filterTog);
              // setUpdate(!update)
            }}
          />
          <span
          className={clsx(classes.filterTitle)}
          >Filter Vacations</span>
        </div>
          <div className={clsx(classes.dateFilter)}>

          <div>
            {/* {console.log(parseISO(vacation.end_date))} */}
            <TextField
              id="date"
              label="From:"
              type="date"
              // defaultValue={vacation.end_date.split('T')[0]}
              className={"ok"}
              disabled={!filterTog}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                setStartDateInput(e.target.value);
                // console.log(startDateInput);
              }}
            />
          </div>
          <div>
            {/* {console.log(parseISO(vacation.end_date))} */}
            <TextField
              id="date"
              label="To:"
              type="date"
              disabled={!filterTog}
              // defaultValue={vacation.end_date.split('T')[0]}
              className={"ok"}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                setEndDateInput(e.target.value);
              }}
            />
          </div>
          </div>
          {filterTog && <button
          className={clsx(classes.filterBtn)}
            onClick={() => {
              fetchVacations();
              
              // setUpdate(!update)
            }}
            disabled={!filterTog}
          >
            Filter Vacations
          </button>}
      </div>
    );
  };

  const favBtn = () => {
    if (userInfo.user_info.userInfo.type === "admin") {
      return;
    }
    return (
      <button
        className={clsx(classes.favBtn)}
        onClick={() => {
          fetchFavLocation();
          setUpdate(!update);
        }}
      >
        {locationsArr
          .find((location) => location.id === chosenLocation.id)
          .locationFavoredBy.some(
            (favoriter) => favoriter.id === userInfo.user_info.userInfo.id
          )
          ? `Favorited`
          : `Favorite`}
      </button>
    );
  };

  const vacationsDiv = () => {
    if (chosenLocation === 0) {
      return;
    }
    if (filterTog) {
      return (
        <div
        className={clsx(classes.vacationDiv)}
        >
          {vacations.map((vacation) => (
            <VacationUnit
              vacation={vacation}
              setUpdate={setUpdate}
              update={update}
            />
          ))}
        </div>
      );
    } else {
      return (
        <div>
          {locationsArr
            .find((location) => location.id === chosenLocation.id)
            .locationVacations.map((vacation) => (
              <VacationUnit
                vacation={vacation}
                setUpdate={setUpdate}
                update={update}
              />
            ))}
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
      <div className={clsx(classes.rootTop)}>
        <h1 className={clsx(classes.pageTitle)}>Plan</h1>
      </div>
      <PlanMap
      
        setChosenLocation={setChosenLocation}
        locationsArr={locationsArr}
        height={'50vh'}
        width={"95vw"}
      />
      <div className={clsx(classes.rootBot)}>
        <div
        className={clsx(classes.locationInfoFilterCont)}
        >
        {locationInfoDiv()}
        {filterDiv()}
        </div>
        {vacationsDiv()}
      </div>
    </div>
  );
}
