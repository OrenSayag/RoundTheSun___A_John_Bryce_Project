import { useHistory, useParams } from "react-router";
import React, { useEffect, useState } from "react";
import VacationUnit from "./VacationUnit";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { useDispatch } from "react-redux";
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
    marginTop: "100px",
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
}));

export default function VacationPage({userInfo}) {
  // oooooooooooo ooooo     ooo   .oooooo.   ooooo      ooo ooooooooooooo ooooo   .oooooo.   ooooo      ooo  .oooooo..o
  // `888'     `8 `888'     `8'  d8P'  `Y8b  `888b.     `8' 8'   888   `8 `888'  d8P'  `Y8b  `888b.     `8' d8P'    `Y8
  //  888          888       8  888           8 `88b.    8       888       888  888      888  8 `88b.    8  Y88bo.
  //  888oooo8     888       8  888           8   `88b.  8       888       888  888      888  8   `88b.  8   `"Y8888o.
  //  888    "     888       8  888           8     `88b.8       888       888  888      888  8     `88b.8       `"Y88b
  //  888          `88.    .8'  `88b    ooo   8       `888       888       888  `88b    d88'  8       `888  oo     .d8P
  // o888o           `YbodP'     `Y8bood8P'  o8o        `8      o888o     o888o  `Y8bood8P'  o8o        `8  8""88888P'
  const fetchGetVacation = async () => {
    const res = await fetch(`http://localhost:666/vacation`, {
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

    if (res.status !== 200) {
      // console.log(data.fail);
      return;
    }

    setVacation(data.vacation);
    // console.log(data.vacation)
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
  const dispatch = useDispatch()
  const { id } = useParams();
  const history = useHistory();
  const classes = useStyles();

  //  .oooooo..o ooooooooooooo       .o.       ooooooooooooo oooooooooooo
  //  d8P'    `Y8 8'   888   `8      .888.      8'   888   `8 `888'     `8
  //  Y88bo.           888          .8"888.          888       888
  //   `"Y8888o.       888         .8' `888.         888       888oooo8
  //       `"Y88b      888        .88ooo8888.        888       888    "
  //  oo     .d8P      888       .8'     `888.       888       888       o
  //  8""88888P'      o888o     o88o     o8888o     o888o     o888ooooood8
  const [vacation, setVacation] = useState({});
  const [update, setUpdate] = useState(false);
  const [commentDiv, setCommentDiv] = useState(false);
  
//   .oooooo.     .oooooo.   ooooo      ooo  .oooooo..o 
//  d8P'  `Y8b   d8P'  `Y8b  `888b.     `8' d8P'    `Y8 
// 888          888      888  8 `88b.    8  Y88bo.      
// 888          888      888  8   `88b.  8   `"Y8888o.  
// 888          888      888  8     `88b.8       `"Y88b 
// `88b    ooo  `88b    d88'  8       `888  oo     .d8P 
//  `Y8bood8P'   `Y8bood8P'  o8o        `8  8""88888P'  
const vacationUnitCon = ()=>{
  if(vacation){
    return <VacationUnit vacation={vacation} update={update} setUpdate={setUpdate} />
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
    fetchGetVacation();
  }, [update]);
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

      {vacationUnitCon()}
</div>
    </div>
  );
}
