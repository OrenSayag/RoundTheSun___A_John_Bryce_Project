import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Route,
  Switch,
  useHistory,
  useLocation,
  Link,
  useParams,
} from "react-router-dom";
import moment, { calendar } from "moment";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Send from "@material-ui/icons/Send";
import adminProfilePic from "../tools/adminProfilePic";
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
    padding: "30px",
    minHeight: "calc(100vh - 70px)",
    // width: '100%',
    [theme.breakpoints.down('sm')]: {
      // border: '1px solid blue',
      padding: '7px',

      
    },
  },
  chatMain: {
    //  border: '1px solid pink',
    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
    backgroundColor: "rgba(248, 255, 243,.2)",
    borderRadius: 3,
    padding: "20px",
    height: "60vh",
    overflowY: "scroll",
    display: "flex",
    flexDirection: "column-reverse",
    alignItems: "center",
    "&::-webkit-scrollbar": {
      width: "1em",
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      // outline: '1px solid slategrey'
    },
    [theme.breakpoints.down('sm')]: {
      // border: '1px solid blue',
      padding: '1px',
      height: "70vh",
    },
  },
  messageRoot: {
    // border: '1px solid pink',
    width: "fit-content",
    margin: "20px 0",
    backgroundColor: "rgba(0,0,0,.2)",
    padding: "5px",
    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",

    borderRadius: 3,
    "&>*": {
      // border:'1px solid white',
      padding: "5px",
    },
    "&>*>*": {
      // border:'1px solid red',
    },
    [theme.breakpoints.down('sm')]: {
      // border: '1px solid blue',
      margin: '10px 0'
    },
  },
  messageCont: {
    // border: '1px solid red',
    width: "90%",
    [theme.breakpoints.down('sm')]: {
      width: "95%",
      // border: '1px solid blue'
      
    },
  },
  fromUser: {
    display: "flex",
    justifyContent: "flex-end",
  },
  toUser: {
    display: "flex",
    justifyContent: "flex-start",
  },
  messageImgCont: {
    display: "flex",
    justifyContent: "space-between",
    "&>img": {
      width: "30px",
      borderRadius: "50%",
      marginRight: "5px",
    },
    "&>div": {
      color: "#E4E7E1",
    },
  },
  messageContentText: {
    backgroundColor: "rgba(200,200,200,.2)",
    borderRadius: 3,
    padding: "7px",
    color: "#E4E7E1",
  },
  messageContentDate: {
    color: "#3B3B3B",
  },
  chatInput: {
    border: "1px solid white",
    "&>:first-child": {
      width: "50%",
      padding: "5px",
      borderRadius: 3,
    },
  },
  postCommentCont: {
    "&>div>img": {
      width: "35px",
      height: "35px",
      borderRadius: "50%",
    },
    "&>input": {
      width: "30%",
      height: "35px",
      borderRadius: 3,
      border: "none",
      outline: "none",
      padding: "0 8px",
      
    },
    backgroundColor: "gray",
    borderRadius: 3,
    padding: "10px 15px",
    display: "flex",
    marginTop: "15px",
  },
  postCommentPicCont: {
    display: "flex",
    alignItems: "center",
    marginRight: "17px",
  },
  chatInput: {
    // border: '1px solid white',
    marginTop: "10px",
    position: "relative",
    
    "&>:first-child": {
      width: "50%",
      boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
      borderRadius: 3,
      border: "none",
      height: "1.3rem",
      outline: "none",
      padding: "7px",
      backgroundColor: "rgba(255,255,255,.7)",
      color: "black",
      [theme.breakpoints.down('sm')]: {
        // border: '1px solid blue',
        width: '80%',
      },
    },
    "&>:last-child": {
      marginLeft: "15px",
      fontSize: "2rem",
      position: "absolute",
      color: "rgba(255,255,255,.7)",
    },
  },
  title:{
    // border: '1px solid white',
    height: '5rem',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    fontSize: '2rem',
    fontWweight: 600,
    backgroundColor: 'rgba(255,255,255,.5)',
    borderRadius: 3,
    color: '#005552',
    padding: '15px',
    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
    [theme.breakpoints.down('sm')]: {
      // border: '1px solid blue',
      fontSize: '1rem',
      padding: '5px 10px',
      height: '3rem'
      
    },
  },
}));

export default function Conversation({  }) {
  // oooooooooooo ooooo     ooo ooooo      ooo   .oooooo.   ooooooooooooo ooooo   .oooooo.   ooooo      ooo  .oooooo..o
  // `888'     `8 `888'     `8' `888b.     `8'  d8P'  `Y8b  8'   888   `8 `888'  d8P'  `Y8b  `888b.     `8' d8P'    `Y8
  //  888          888       8   8 `88b.    8  888               888       888  888      888  8 `88b.    8  Y88bo.
  //  888oooo8     888       8   8   `88b.  8  888               888       888  888      888  8   `88b.  8   `"Y8888o.
  //  888    "     888       8   8     `88b.8  888               888       888  888      888  8     `88b.8       `"Y88b
  //  888          `88.    .8'   8       `888  `88b    ooo       888       888  `88b    d88'  8       `888  oo     .d8P
  // o888o           `YbodP'    o8o        `8   `Y8bood8P'      o888o     o888o  `Y8bood8P'  o8o        `8  8""88888P'
  const fetchConversationArr = async () => {
    try {
      const res = await fetch(
        `https://ancient-reef-92615.herokuapp.com/inbox/conversation/${user_name}`,
        // `http://localhost:666/inbox/conversation/${user_name}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            authorization: localStorage.token,
          },
        }
      );

      const data = await res.json();

      if (res.status !== 200) {
        console.log(data.fail);
      }

      setConversationArr(data.conversation);
      setUserId(data.conversartionUserInfo);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchReply = async () => {
    try {
      const res = await fetch(`https://ancient-reef-92615.herokuapp.com/inbox/reply`, {
      // const res = await fetch(`http://localhost:666/inbox/reply`, {
        method: "POST",
        body: JSON.stringify({
          text: replyInput,
          userId: conversartionUserInfo.id,
        }),
        headers: {
          "content-type": "application/json",
          authorization: localStorage.token,
        },
      });

      if (res.status !== 200) {
        const data = await res.json();
        console.log(data.fail);
      }

      setUpdate(!update);
    } catch (error) {
      console.log(error);
    }
  };
  const isToday = (someDate) => {
    const today = new Date()
    return someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
  }
  
  //  .oooooo..o ooooooooooooo       .o.       ooooooooooooo oooooooooooo
  //  d8P'    `Y8 8'   888   `8      .888.      8'   888   `8 `888'     `8
  //  Y88bo.           888          .8"888.          888       888
  //   `"Y8888o.       888         .8' `888.         888       888oooo8
  //       `"Y88b      888        .88ooo8888.        888       888    "
  //  oo     .d8P      888       .8'     `888.       888       888       o
  //  8""88888P'      o888o     o88o     o8888o     o888o     o888ooooood8
  const [update, setUpdate] = useState(false);
  const [replyInput, setReplyInput] = useState("");
  const [conversationArr, setConversationArr] = useState([]);
  const [conversartionUserInfo, setUserId] = useState(0);
  const [profilePic, setProfilePic] = useState("")
  // ooooo   ooooo   .oooooo.     .oooooo.   oooo    oooo  .oooooo..o
  // `888'   `888'  d8P'  `Y8b   d8P'  `Y8b  `888   .8P'  d8P'    `Y8
  //  888     888  888      888 888      888  888  d8'    Y88bo.
  //  888ooooo888  888      888 888      888  88888[       `"Y8888o.
  //  888     888  888      888 888      888  888`88b.         `"Y88b
  //  888     888  `88b    d88' `88b    d88'  888  `88b.  oo     .d8P
  // o888o   o888o  `Y8bood8P'   `Y8bood8P'  o888o  o888o 8""88888P'
  const history = useHistory();
  const userInfo = useSelector((state) => state.userInfo);
  const { user_name } = useParams();
  const replyInputRef = useRef(null);
  const classes = useStyles();

  // oooooooooooo oooooooooooo oooooooooooo oooooooooooo   .oooooo.   ooooooooooooo
  // `888'     `8 `888'     `8 `888'     `8 `888'     `8  d8P'  `Y8b  8'   888   `8
  //  888          888          888          888         888               888
  //  888oooo8     888oooo8     888oooo8     888oooo8    888               888
  //  888    "     888    "     888    "     888    "    888               888
  //  888       o  888          888          888       o `88b    ooo       888
  // o888ooooood8 o888o        o888o        o888ooooood8  `Y8bood8P'      o888o
  useEffect(() => {
    // fetchConversations();
    fetchConversationArr();
    setProfilePic(randomProfilePic())
  }, [update]);

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
      <div
      className={clsx(classes.title)}
      >{user_name}</div>
      <div className={clsx(classes.chatCont)}>
        <div className={clsx(classes.chatMain)}>
          {userInfo.user_info &&
            userInfo.user_info.userInfo.type !== "admin" &&
            history.push("/explore")}

          {conversationArr.map((message) => (
            <div
            key={message.id}
              className={clsx(
                classes.messageCont,
                message.type === "touser" ? classes.toUser : classes.fromUser
              )}
            >
              <div className={clsx(classes.messageRoot)}>
                <div className={clsx(classes.messageImgCont)}>
                  <img
                    src={message.type === "touser" ? (adminProfilePic) : ( conversartionUserInfo.img_src ||
                      profilePic)}
                  // src={"https://randomuser.me/api/portraits/women/53.jpg"}
                    // src="/profilePics/member2.jpg"
                    alt="profile pic"
                  />
                </div>
                <div
                className={clsx(classes.messageContentCont)}
                >
                  <div
                className={clsx(classes.messageContentText)}
                >{message.text}</div>
                  <div
                className={clsx(classes.messageContentDate)}
                >
                   {`Sent on ${!isToday(new Date(message.date_time)) ? moment(
                      message.date_time.toLocaleString()
                    ).format("DD/MM/YYYY ,hh:mm") : moment(
                      message.date_time.toLocaleString()
                    ).format("hh:mm")}`}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div  className={clsx(classes.chatInput)}
          >
          <input
            type="text"
            placeholder="reply"
            ref={replyInputRef}
            onChange={(e) => {
              setReplyInput(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.target.value = "";
                fetchReply();
              }
            }}
          />
          <Send
            onClick={() => {
              fetchReply();
              replyInputRef.current.value = "";
            }}
          >
            Submit
          </Send>
        </div>
      </div>
    </div>
  );
}
