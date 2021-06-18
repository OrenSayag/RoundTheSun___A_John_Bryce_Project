import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory, useLocation, Link } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import SendIcon from '@material-ui/icons/Send';
import randomProfilePic from "../tools/randomProfilePic";
import adminProfilePic from "../tools/adminProfilePic";


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
    width: "70%",
    // marginTop: '100px',
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
    minHeight: "100vh",
    // boxSizing: 'border-box'
  },
  active: {
    display: "flex",
  },
  hidden: {
    display: "none",
  },
  pageHeader: {
    //  border: '1px solid white',
    height: "15vh",
    //  display: 'flex',
    padding: "20px",
    color: "linen",
    borderRadius: 3,
    backgroundColor: "rgba(0,0,0,.2)",
    margin: "20px 0",
    [theme.breakpoints.down('sm')]: {
      height: '12vh',
    },
  },
  pageHeaderTitle: {
    fontSize: "3rem",
    fontWeight: 500,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5rem',
    },
  },
  pageHeaderBlah: {
    fontSize: "1.2rem",
    marginTop: "20px",
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },
  chatCont: {
    // border: "1px solid white",
  },
  chatMain: {
    //  border: '1px solid pink',
    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
    backgroundColor: "rgba(248, 255, 243,.2)",
    borderRadius: 3,
    padding: '20px',
    height: '60vh',
    overflowY: 'scroll',
    display: 'flex',
    flexDirection: 'column-reverse',
    alignItems: 'center',
    '&::-webkit-scrollbar': {
      width: '1em'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      // outline: '1px solid slategrey'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '0px'
    },
  },
  messageRoot:{
    // border: '1px solid pink',
    width: 'fit-content',
    margin: '20px 0',
    backgroundColor: 'rgba(0,0,0,.2)',
    padding: '5px',
    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",

    borderRadius:3,
    '&>*':{
      // border:'1px solid white',
      padding: '5px',
    },
    '&>*>*':{
      // border:'1px solid red',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '10px 0',
    },
  },
  messageCont:{
    // border: '1px solid red',
    width: '90%',
    [theme.breakpoints.down('sm')]: {
      width: '95%',
    },
  },
  fromUser:{
    display: 'flex',
    justifyContent: 'flex-end',
  },
  toUser:{
    display: 'flex',
    justifyContent: 'flex-start',
  },
  messageImgCont:{
    display:'flex',
    justifyContent: 'space-between',
    '&>img':{
      width: '30px',
      borderRadius: '50%',
      marginRight: '5px',
    },
    '&>div':{
      color: '#E4E7E1',
    }
  },
  messageContentText:{
    backgroundColor: 'rgba(200,200,200,.2)',
    borderRadius: 3,
    padding: '7px',
    color: '#E4E7E1',

  },
  messageContentDate:{
    color:"#3B3B3B"
  },
  chatInput:{
    border: '1px solid white',
    '&>:first-child':{
      width: '50%',
      padding: '5px',
      borderRadius: 3,
    }
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
  chatInput: {
    // border: '1px solid white',
    marginTop: '10px',
    position: 'relative',
    '&>:first-child':{
      width: '50%',
      borderRadius: 3,
      border: 'none',
      height: '1.3rem',
      outline: 'none',
      padding: '7px',
      backgroundColor:'rgba(255,255,255,.7)',
      color: 'black',
      [theme.breakpoints.down('sm')]: {
        width: 'calc(100% - 4rem)'
        
      },

    },
    '&>:last-child':{
      marginLeft: '15px',
      fontSize: '2rem',
      position: 'absolute',
      color: 'rgba(255,255,255,.7)'


    }
  }
}));

export default function ContactUs() {
  // oooooooooooo ooooo     ooo ooooo      ooo   .oooooo.   ooooooooooooo ooooo   .oooooo.   ooooo      ooo  .oooooo..o
  // `888'     `8 `888'     `8' `888b.     `8'  d8P'  `Y8b  8'   888   `8 `888'  d8P'  `Y8b  `888b.     `8' d8P'    `Y8
  //  888          888       8   8 `88b.    8  888               888       888  888      888  8 `88b.    8  Y88bo.
  //  888oooo8     888       8   8   `88b.  8  888               888       888  888      888  8   `88b.  8   `"Y8888o.
  //  888    "     888       8   8     `88b.8  888               888       888  888      888  8     `88b.8       `"Y88b
  //  888          `88.    .8'   8       `888  `88b    ooo       888       888  `88b    d88'  8       `888  oo     .d8P
  // o888o           `YbodP'    o8o        `8   `Y8bood8P'      o888o     o888o  `Y8bood8P'  o8o        `8  8""88888P'
  const fetchSendMessage = async () => {
    const res = await fetch("https://ancient-reef-92615.herokuapp.com/inbox/message", {
      method: "POST",
      body: JSON.stringify({
        text: textInput,
      }),
      headers: {
        "content-type": "application/json",
        authorization: localStorage.token,
      },
    });

    if (res.status === 500) {
      return console.log("server error");
    }

    setUpdate(!update);
  };
  const fetchConversation = async () => {
    const res = await fetch("https://ancient-reef-92615.herokuapp.com/inbox/user/conversation", {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.token,
      },
    });

    if (res.status === 500) {
      return console.log("server error");
    }

    const data = await res.json();

    setConversation(data.conversation.reverse());
    setConversationUserInfo(data.conversartionUserInfo);
  };
  const isToday = (someDate) => {
    const today = new Date()
    return someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
  }
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
  const [textInput, setTextInput] = useState("");
  const [conversation, setConversation] = useState([]);
  const [update, setUpdate] = useState(false);
  const [conversationUserInfo, setConversationUserInfo] = useState();
  
  
  // ooooo   ooooo   .oooooo.     .oooooo.   oooo    oooo  .oooooo..o
  // `888'   `888'  d8P'  `Y8b   d8P'  `Y8b  `888   .8P'  d8P'    `Y8
  //  888     888  888      888 888      888  888  d8'    Y88bo.
  //  888ooooo888  888      888 888      888  88888[       `"Y8888o.
  //  888     888  888      888 888      888  888`88b.         `"Y88b
  //  888     888  `88b    d88' `88b    d88'  888  `88b.  oo     .d8P
  // o888o   o888o  `Y8bood8P'   `Y8bood8P'  o888o  o888o 8""88888P'
  const replyInputRef = useRef("");
  const userInfo = useSelector((state) => state.userInfo);
  const memberPic = useSelector((state) => state.profilePicsReducer.memberPic);
  const history = useHistory();
  const location = useLocation()
  const dispatch = useDispatch();
  const classes = useStyles();
  
  
  // oooooooooooo oooooooooooo oooooooooooo oooooooooooo   .oooooo.   ooooooooooooo
  // `888'     `8 `888'     `8 `888'     `8 `888'     `8  d8P'  `Y8b  8'   888   `8
  //  888          888          888          888         888               888
  //  888oooo8     888oooo8     888oooo8     888oooo8    888               888
  //  888    "     888    "     888    "     888    "    888               888
  //  888       o  888          888          888       o `88b    ooo       888
  // o888ooooood8 o888o        o888o        o888ooooood8  `Y8bood8P'      o888o
  useEffect(() => {
    fetchConversation();
    // kickInvalidToken()
  }, [update]);

  //   .oooooo.     .oooooo.   ooooo      ooo oooooooooo.   ooooo ooooooooooooo ooooo   .oooooo.   ooooo      ooo oooooooooooo ooooooooo.
  //  d8P'  `Y8b   d8P'  `Y8b  `888b.     `8' `888'   `Y8b  `888' 8'   888   `8 `888'  d8P'  `Y8b  `888b.     `8' `888'     `8 `888   `Y88.
  // 888          888      888  8 `88b.    8   888      888  888       888       888  888      888  8 `88b.    8   888          888   .d88'
  // 888          888      888  8   `88b.  8   888      888  888       888       888  888      888  8   `88b.  8   888oooo8     888ooo88P'
  // 888          888      888  8     `88b.8   888      888  888       888       888  888      888  8     `88b.8   888    "     888`88b.
  // `88b    ooo  `88b    d88'  8       `888   888     d88'  888       888       888  `88b    d88'  8       `888   888       o  888  `88b.
  //  `Y8bood8P'   `Y8bood8P'  o8o        `8  o888bood8P'   o888o     o888o     o888o  `Y8bood8P'  o8o        `8  o888ooooood8 o888o  o888o
  if (replyInputRef.current === undefined) {
    return <div>Loading</div>;
  }
  if(!conversationUserInfo){
    return <div>Loading...</div>
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

    
    
    <div className={clsx(classes.cont)}>
    {userInfo.user_info.userInfo.type==='admin'&&history.push('/explore')}  
      <div className={clsx(classes.root)}>
        <div className={clsx(classes.pageHeader)}>
          <div className={clsx(classes.pageHeaderTitle)}>Contact Us</div>
          <div className={clsx(classes.pageHeaderBlah)}>
            Send us a message and we will reply shortly
          </div>
        </div>
        <div className={clsx(classes.chatCont)}>
          <div className={clsx(classes.chatMain)}>
            {conversation.map((message) => (
              
              <div
                className={clsx(classes.messageCont, message.type==='touser' ? classes.toUser : classes.fromUser)}
              >
                <div
                className={clsx(classes.messageRoot)}
                >

                <div
                className={clsx(classes.messageImgCont)}

                >
                  <img
                    // src={message.from_user && conversationUserInfo.img_src}
                    src={message.type === "fromuser" ? (userInfo.user_info.userInfo.img_src || memberPic) : adminProfilePic}
                    alt="profile pic"
                  />
                  <div>
                    {message.type==='fromuser' ? message.user_name : 'Admin'}
                  </div>
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

          <div className={clsx(classes.chatInput)}>
            <input
              type="text"
              placeholder="Message"
              ref={replyInputRef}
              onChange={(e) => {
                setTextInput(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.target.value = "";
                  fetchSendMessage();
                }
              }}
              />
            <SendIcon
              disabled={replyInputRef.current.value == ""}
              onClick={() => {
                fetchSendMessage();
                replyInputRef.current.value = "";
              }}
              >
            </SendIcon>
          </div>



        </div>
      </div>
    </div>
  );
}
