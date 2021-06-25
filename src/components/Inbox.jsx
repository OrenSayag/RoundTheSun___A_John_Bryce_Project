import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory, useLocation, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Conversation from "./Conversation";
import clsx from "clsx";
import randomProfilePic from "../tools/randomProfilePic";
// .oooooo..o ooooooooooooo oooooo   oooo ooooo        oooooooooooo  .oooooo..o
// d8P'    `Y8 8'   888   `8  `888.   .8'  `888'        `888'     `8 d8P'    `Y8
// Y88bo.           888        `888. .8'    888          888         Y88bo.
//  `"Y8888o.       888         `888.8'     888          888oooo8     `"Y8888o.
//      `"Y88b      888          `888'      888          888    "         `"Y88b
// oo     .d8P      888           888       888       o  888       o oo     .d8P
// 8""88888P'      o888o         o888o     o888ooooood8 o888ooooood8 8""88888P'
const useStyles = makeStyles(theme=>({
  root: {
    backgroundColor: "rgba(177, 236, 158,.4)",
    // border: "1px solid transparent",
    minHeight: "calc(100vh - 70px)",
  },
  conversationsCont: {
    padding: "10px 30px",
    // border: '1px solid white',
    minHeight: "calc(100vh - 90px)",
    
  },
  conversationUnit: {
    // border: '1px solid pink',
    display: "grid",
    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
    gridTemplateRows: "50% auto",
    margin: "20px 0",
    height: "200px",
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,.2)",
    "&>*": {
      // border: '1px solid red',
      // padding: '5px',
    },
    "&>:first-child": {
      // border: '1px solid red',
      // padding: '5px',
      display: "grid",
      gridTemplateColumns: "35% auto",
      
      "&>*": {
        // border: '1px solid blue',
        padding: "10px",
      },
      "&>:first-child": {
        display: "flex",
        justifyContent: "center",
        [theme.breakpoints.down('sm')]: {
          alignItems: 'center',
          
        },
      },
      "&>:last-child": {
        display: "flex",
        alignItems: "center",
        
      },
      [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: "35% auto",
        
        
      },
    },
    "&>:last-child": {
      padding: "10px",
      // border: '1px solid blue',
      display: "grid",
      gridTemplateColumns: "10% auto",
      "&>:last-child": {
        background: "rgba(238, 238, 238, .3)",
        borderRadius: 3,
        padding: "15px",

      },
      gridTemplateColumns: "10% auto",
      [theme.breakpoints.down('sm')]: {
        // width: '40%',
        gridTemplateColumns: "100%",
        
      },
    },
  },
  img: {
    borderRadius: "50%",
    maxWidth: "60px",
    maxHeight: "60px",
    [theme.breakpoints.down('sm')]: {
      maxWidth: "30px",
      maxHeight: "30px",
      

    },
  },
  memberName: {
    textDecoration: "none",
    color: "rgba(238, 238, 238, 1)",
  },
}));

export default function Inbox() {
  // oooooooooooo ooooo     ooo ooooo      ooo   .oooooo.   ooooooooooooo ooooo   .oooooo.   ooooo      ooo  .oooooo..o
  // `888'     `8 `888'     `8' `888b.     `8'  d8P'  `Y8b  8'   888   `8 `888'  d8P'  `Y8b  `888b.     `8' d8P'    `Y8
  //  888          888       8   8 `88b.    8  888               888       888  888      888  8 `88b.    8  Y88bo.
  //  888oooo8     888       8   8   `88b.  8  888               888       888  888      888  8   `88b.  8   `"Y8888o.
  //  888    "     888       8   8     `88b.8  888               888       888  888      888  8     `88b.8       `"Y88b
  //  888          `88.    .8'   8       `888  `88b    ooo       888       888  `88b    d88'  8       `888  oo     .d8P
  // o888o           `YbodP'    o8o        `8   `Y8bood8P'      o888o     o888o  `Y8bood8P'  o8o        `8  8""88888P'
  const fetchConversations = async () => {
    try {
      // const res = await fetch(`https://ancient-reef-92615.herokuapp.com/inbox`, {
      const res = await fetch(`http://localhost:666/inbox`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: localStorage.token,
        },
      });

      const data = await res.json();

      if (res.status !== 200) {
        // console.log(data.fail);
      }
      // console.log(data);
      setConversations(data.conversations);
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
  const [conversations, setConversations] = useState({});
  const [chosenUserName, setChosenUserName] = useState("");
  // ooooo   ooooo   .oooooo.     .oooooo.   oooo    oooo  .oooooo..o
  // `888'   `888'  d8P'  `Y8b   d8P'  `Y8b  `888   .8P'  d8P'    `Y8
  //  888     888  888      888 888      888  888  d8'    Y88bo.
  //  888ooooo888  888      888 888      888  88888[       `"Y8888o.
  //  888     888  888      888 888      888  888`88b.         `"Y88b
  //  888     888  `88b    d88' `88b    d88'  888  `88b.  oo     .d8P
  // o888o   o888o  `Y8bood8P'   `Y8bood8P'  o888o  o888o 8""88888P'
  const classes = useStyles();
  // oooooooooooo oooooooooooo oooooooooooo oooooooooooo   .oooooo.   ooooooooooooo
  // `888'     `8 `888'     `8 `888'     `8 `888'     `8  d8P'  `Y8b  8'   888   `8
  //  888          888          888          888         888               888
  //  888oooo8     888oooo8     888oooo8     888oooo8    888               888
  //  888    "     888    "     888    "     888    "    888               888
  //  888       o  888          888          888       o `88b    ooo       888
  // o888ooooood8 o888o        o888o        o888ooooood8  `Y8bood8P'      o888o
  useEffect(() => {
    fetchConversations();
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
    <div className={clsx(classes.root)}>
      <Switch>
        <Route
          path="/controlPanel/inbox"
          exact
          component={() => {
            return (
              <div className={clsx(classes.conversationsCont)}>
                {Object.entries(conversations).map((conversation) => {
                  return (
                    <div key={conversation.id} className={clsx(classes.conversationUnit)}>
                      <Link
                        className={clsx(classes.memberName)}
                        to={`/controlPanel/inbox/conversation/${conversation[1][0].user_name}`}
                        onClick={() => {
                          setChosenUserName(conversation[1][0].user_name);
                        }}
                      >
                        <div>
                          <img
                            className={clsx(classes.img)}
                            src={
                              conversation[1][0].img_src ||
                              randomProfilePic()
                            }
                            alt=""
                          />
                        </div>
                        <div>{conversation[0]}</div>
                      </Link>
                      <div>
                        <div></div>
                        <div>{conversation[1].reverse()[0].text}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          }}
        />
        <Route
          path="/controlPanel/inbox/conversation/:user_name"
          exact
          component={() => {
            return <Conversation />;
          }}
        />
      </Switch>

      {/* {conversations.map(conversation=><Conversation conversation={conversation}/>)} */}
      {/* {console.log(Object.entries(conversations))} */}
    </div>
  );
}
