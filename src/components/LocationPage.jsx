import { useHistory, useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import Checkbox from "@material-ui/core/Checkbox";
import moment from "moment";
import VacationUnit from "./VacationUnit";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

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
    position: 'relative',
    marginTop: "100px",
    width: "70%",
    [theme.breakpoints.down('sm')]: {
      marginTop: '60px',
      width: '95%',
      padding: '0 5px',
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
      fontSize: '1.2rem'
    },
    // position: 'relative'
    // position: 'absolute',
    // bottom: '15px',
    top: '15px',
    left: '15px',


  },
  infoDivSocial: {
    color: '#02243A    ',
    backgroundColor: '#DADEE1',
    padding: '15px',
    borderRadius: 3,
    // marginTop: '20px',
  display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  favBtn: {
    // position: 'absolute',
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
    [theme.breakpoints.down('sm')]: {
      margin: '20px 0',
    },
  },
  locationInfoFilterCont: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative',
    // width: '50%',
  },
  filterCont: {
    backgroundColor: '#0B7015',
    width: 'calc(100% - 30px)',
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
    // bottom: '15px',
    // right: '15px',
    

    color: '#02243A    ',
    '&>:first-child':{
      display: 'flex',
      alignItems: 'center',
    position: 'absolute',
      top: '15px',
      left: '15px'
    },

    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '300px',
    },
  },
  filterCb:{
    border: 'none',
    height: '25px',
    width: '25px',
    color: 'violet',
    // backgroundColor: 'black'
    '&$checked':{
      // color: green[600],
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
  locationImg:{
    width: '100%',
    borderRadius: 3,
  },
  infoAndFilterCont:{
    position: 'relative',
  },
  topCont:{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      
    },
    '&>*':{
      width: '29%',
      height: '70px',
      boxSizing: 'border-box',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1rem',
        // border: '1px solid yellow',
        width: '100%',
      },
    },

  },
  errDiv:{
    backgroundColor: '#2B04CB    ',
    width: 'fit-content',
    padding: '15px',
    borderRadius: 3,
    margin: '15px 0',
    color: 'linen',
    boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
    letterSpacing: '.5mm'
  },
  // filterCont:{
    
  // },
}));

export default function LocationPage() {
  // oooooooooooo ooooo     ooo   .oooooo.   ooooo      ooo ooooooooooooo ooooo   .oooooo.   ooooo      ooo  .oooooo..o
  // `888'     `8 `888'     `8'  d8P'  `Y8b  `888b.     `8' 8'   888   `8 `888'  d8P'  `Y8b  `888b.     `8' d8P'    `Y8
  //  888          888       8  888           8 `88b.    8       888       888  888      888  8 `88b.    8  Y88bo.
  //  888oooo8     888       8  888           8   `88b.  8       888       888  888      888  8   `88b.  8   `"Y8888o.
  //  888    "     888       8  888           8     `88b.8       888       888  888      888  8     `88b.8       `"Y88b
  //  888          `88.    .8'  `88b    ooo   8       `888       888       888  `88b    d88'  8       `888  oo     .d8P
  // o888o           `YbodP'     `Y8bood8P'  o8o        `8      o888o     o888o  `Y8bood8P'  o8o        `8  8""88888P'
  const fetchVacations = async () => {
    const res = await fetch(`https://ancient-reef-92615.herokuapp.com/location/vacationsFiltered`, {
    // const res = await fetch(`http://localhost:666/location/vacationsFiltered`, {
      method: "POST",
      body: JSON.stringify({
        id,
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

    setVacations(data.locationVacations);
    setUpdate(!update);
    // console.log(data.location);
  };
  const fetchFavLocation = async () => {
    const res = await fetch(`https://ancient-reef-92615.herokuapp.com/location/fav`, {
    // const res = await fetch(`http://localhost:666/location/fav`, {
      method: "POST",
      body: JSON.stringify({
        id,
      }),
      headers: {
        "content-type": "application/json",
        authorization: localStorage.token,
      },
    });
    
    if (res.status !== 200) {
      const data = await res.json();
      // console.log(data.fail);
      return;
    }

    setUpdate(!update)
  };
  const kickInvalidToken = () =>{
    dispatch({ type: "UPDATE_USERINFO" })


    userInfo && userInfo.user_info && userInfo.user_info=='failed'&&history.push('/landing')
  }
  

  // ooooo   ooooo   .oooooo.     .oooooo.   oooo    oooo  .oooooo..o
  // `888'   `888'  d8P'  `Y8b   d8P'  `Y8b  `888   .8P'  d8P'    `Y8
  //  888     888  888      888 888      888  888  d8'    Y88bo.
  //  888ooooo888  888      888 888      888  88888[       `"Y8888o.
  //  888     888  888      888 888      888  888`88b.         `"Y88b
  //  888     888  `88b    d88' `88b    d88'  888  `88b.  oo     .d8P
  // o888o   o888o  `Y8bood8P'   `Y8bood8P'  o888o  o888o 8""88888P'
  const { id } = useParams();
  const userInfo = useSelector((state) => state.userInfo);
  const classes = useStyles();
  const dispatch = useDispatch()
  const history =useHistory()

  //  .oooooo..o ooooooooooooo       .o.       ooooooooooooo oooooooooooo
  //  d8P'    `Y8 8'   888   `8      .888.      8'   888   `8 `888'     `8
  //  Y88bo.           888          .8"888.          888       888
  //   `"Y8888o.       888         .8' `888.         888       888oooo8
  //       `"Y88b      888        .88ooo8888.        888       888    "
  //  oo     .d8P      888       .8'     `888.       888       888       o
  //  8""88888P'      o888o     o88o     o8888o     o888o     o888ooooood8
  const [location, setLocation] = useState({});
  const [vacations, setVacations] = useState({});
  const [update, setUpdate] = useState(false);
  const [startDateInput, setStartDateInput] = useState(0);
  const [endDateInput, setEndDateInput] = useState(0);
  const [filterTog, setFilterTog] = useState(false);

  // oooooooooooo oooooooooooo oooooooooooo oooooooooooo   .oooooo.   ooooooooooooo
  // `888'     `8 `888'     `8 `888'     `8 `888'     `8  d8P'  `Y8b  8'   888   `8
  //  888          888          888          888         888               888
  //  888oooo8     888oooo8     888oooo8     888oooo8    888               888
  //  888    "     888    "     888    "     888    "    888               888
  //  888       o  888          888          888       o `88b    ooo       888
  // o888ooooood8 o888o        o888o        o888ooooood8  `Y8bood8P'      o888o
  useEffect(() => {
    // console.log("effect");
    (async () => {
      const res = await fetch(`https://ancient-reef-92615.herokuapp.com/location`, {
      // const res = await fetch(`http://localhost:666/location`, {
        method: "POST",
        body: JSON.stringify({
          id,
        }),
        headers: {
          "content-type": "application/json",
          authorization: localStorage.token,
        },
      });
      const data = await res.json();
      // console.log(data);
      if (res.status !== 200) {
        // console.log(data.fail);
        return;
      }

      await setLocation(data.location);
      if(!filterTog){
        await setVacations(data.locationVacations);

      }
      // console.log(data.location);
    })();
  }, [update]);

  //   .oooooo.     .oooooo.   ooooo      ooo  .oooooo..o
  //  d8P'  `Y8b   d8P'  `Y8b  `888b.     `8' d8P'    `Y8
  // 888          888      888  8 `88b.    8  Y88bo.
  // 888          888      888  8   `88b.  8   `"Y8888o.
  // 888          888      888  8     `88b.8       `"Y88b
  // `88b    ooo  `88b    d88'  8       `888  oo     .d8P
  //  `Y8bood8P'   `Y8bood8P'  o8o        `8  8""88888P'
  if(!userInfo){
    return <div>loading</div>
  }
  if(!userInfo.user_info){
    return <div>loading</div>
  }
  if(!userInfo.user_info.userInfo){
    return <div>loading</div>
  }
  if(!vacations){
    return <div>loading</div>
  }
  if(!location){
    return <div>loading</div>
  }
  if(!location.favoredBy){
    return <div>loading</div>
  }
  const ok = () => {
    if (vacations.length > 0) {
      return vacations.map((vacation) => (
        <VacationUnit
        key={vacation.id}
          vacation={vacation}
          update={update}
          setUpdate={setUpdate}
        />
      ));
    } else {
      return <div className={clsx(classes.errDiv)}>No vacations</div>;
    }
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
        {location.favoredBy.some(favoriter=>favoriter.user_id===userInfo.user_info.userInfo.id) ?
         'Favorited' : 'Favorite'}
      </button>
    );
  };
  const favBtnOld = () => {
    if(userInfo.user_info.userInfo.type !== 'admin'){
      return <button
        onClick={()=>{
            fetchFavLocation()

        }}
        >{location.favoredBy.some(favoriter=>favoriter.user_id===userInfo.user_info.userInfo.id) ? 'Favorited' : 'Favorite'}</button>
    }
  }
  const locationInfoDiv = () => {
    if (!location) {
      return <div
      className={clsx(classes.selectALocation)}
      >Loading...</div>;
    }
    return (
      <div
      className={clsx(classes.infoDiv)}
      
      >
        <div>{location.name} ,{location.country}</div>
        
      </div>
    );
  };

  const filterDiv = () => {
    if (!location) {
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
              setUpdate(!update)
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
              
            }}
            disabled={!filterTog}
          >
            Filter Vacations
          </button>}
      </div>
    );
  };

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
      {/* <div>{`${location.name}, ${location.country}`}</div> */}

      

      {/* {favBtn()} */}
      <div
      className={clsx(classes.topCont)}
      >
        {/* <img src={location.img_src || '/locations/mounjia_nigeria.jpeg'} alt="img" className={clsx(classes.locationImg)} /> */}
        {locationInfoDiv()}
        <div className={(clsx(classes.infoDivSocial))}
        
        >
        <div>Favorited By: {location.favoredBy.length}</div>
        {/* <div>Favorited By: {location.locationFavoredBy.length}</div> */}
        <div>Vacations: {vacations.length}</div>
        </div>
    {favBtn()}
        </div>

        <img src={location.img_src || 'https://images.pexels.com/photos/3316266/pexels-photo-3316266.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'} alt="img" className={clsx(classes.locationImg)} />
    {filterDiv()}



      {/* <div>
        <div>
          <span>Filter: </span>
          <input
            type="checkbox"
            onChange={() => {
              setFilterTog(!filterTog);
              fetchVacations();
              setUpdate(!update)
            }}
          />
        </div>
        <div>
          <TextField
            id="date"
            label="From:"
            type="date"
            className={"ok"}
            disabled={!filterTog}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              setStartDateInput(e.target.value);
              console.log(startDateInput);
            }}
          />
        </div>
        <div>
          {/* {console.log(parseISO(vacation.end_date))} */}
          {/* <TextField
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
        </div> */}
        {/* <button
          onClick={() => {
            fetchVacations();
          }}
        >
          Filter Vacations
        </button>
      </div> */} 
      <div>
        {ok()}
      </div>
    </div>
    </div>
  );
}
