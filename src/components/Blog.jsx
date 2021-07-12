import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory, useLocation, Link } from "react-router-dom";
import PostUnit from "./PostUnit";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
// .oooooo..o ooooooooooooo oooooo   oooo ooooo        oooooooooooo  .oooooo..o
// d8P'    `Y8 8'   888   `8  `888.   .8'  `888'        `888'     `8 d8P'    `Y8
// Y88bo.           888        `888. .8'    888          888         Y88bo.
//  `"Y8888o.       888         `888.8'     888          888oooo8     `"Y8888o.
//      `"Y88b      888          `888'      888          888    "         `"Y88b
// oo     .d8P      888           888       888       o  888       o oo     .d8P
// 8""88888P'      o888o         o888o     o888ooooood8 o888ooooood8 8""88888P'
const useStyles = makeStyles((theme) => ({
  root: {
    // background: "linear-gradient(45deg, #126929 30%, #c41bbc 90%)",
    position: "relative",
    // marginTop: '100px',
    width: "70%",
    // minHeight: "100vh",
    // height: "1000px",
    [theme.breakpoints.down("sm")]: {
      padding: "5px",
      width: "calc(100% - 40px)",
      padding: "20px",
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
    // height: "1000px",
    width: "100%",
    // boxSizing: 'border-box'
  },
  active: {
    display: "flex",
  },
  hidden: {
    display: "none",
  },
  pageTitle: {
    fontSize: "5rem",
    // border: '1px solid red',
    padding: "25px",
    fontWeight: 100,
    display: "flex",
    justifyContent: "center",
    color: "white",
    textShadow:
      "0px 4px 3px rgba(0,0,0,0.4), 0px 8px 13px rgba(0,0,0,0.1), 0px 18px 23px rgba(0,0,0,0.1)",
  },
  addBtn: {
    position: "absolute",
    top: "25px",
    right: "20px",
    height: "50px",
    // width: '50px',
    color: "#DEF1F1",
    backgroundColor: "rgba(4, 15, 99,.8)",
    border: "none",
    borderRadius: 3,
    width: "10rem",
    "&:hover": {
      backgroundColor: "rgba(4, 15, 99,.9)",
      boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
    },
    [theme.breakpoints.down("sm")]: {
      position: "static",
      width: "calc(100% - 40px)",
      marginLeft: "20px",
    },
  },
  postsCont: {
    // border: '1px solid pink',
    minHeight: "80vh",
  },
  errorDiv: {
    backgroundColor: '#2B04CB    ',
    width: 'fit-content',
    padding: '15px',
    borderRadius: 3,
    margin: '15px 0',
    color: 'linen',
    boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
    letterSpacing: '.5mm',
    
  },
}));

export default function Blog() {
  // oooooooooooo ooooo     ooo ooooo      ooo   .oooooo.   ooooooooooooo ooooo   .oooooo.   ooooo      ooo  .oooooo..o
  // `888'     `8 `888'     `8' `888b.     `8'  d8P'  `Y8b  8'   888   `8 `888'  d8P'  `Y8b  `888b.     `8' d8P'    `Y8
  //  888          888       8   8 `88b.    8  888               888       888  888      888  8 `88b.    8  Y88bo.
  //  888oooo8     888       8   8   `88b.  8  888               888       888  888      888  8   `88b.  8   `"Y8888o.
  //  888    "     888       8   8     `88b.8  888               888       888  888      888  8     `88b.8       `"Y88b
  //  888          `88.    .8'   8       `888  `88b    ooo       888       888  `88b    d88'  8       `888  oo     .d8P
  // o888o           `YbodP'    o8o        `8   `Y8bood8P'      o888o     o888o  `Y8bood8P'  o8o        `8  8""88888P'
  const fetchGetAllPosts = async () => {
    // const res = await fetch("https://ancient-reef-92615.herokuapp.com/blog", {
    const res = await fetch("/api/blog", {
    // const res = await fetch("http://localhost:666/blog", {
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
    // console.log(data)

    setAllPosts(data.allPosts);
  };
  // const kickInvalidToken = () =>{
  //   dispatch({ type: "UPDATE_USERINFO" })

  //   userInfo && userInfo.user_info && userInfo.user_info=='failed'&&history.push('/landing')
  // }
  //  .oooooo..o ooooooooooooo       .o.       ooooooooooooo oooooooooooo
  //  d8P'    `Y8 8'   888   `8      .888.      8'   888   `8 `888'     `8
  //  Y88bo.           888          .8"888.          888       888
  //   `"Y8888o.       888         .8' `888.         888       888oooo8
  //       `"Y88b      888        .88ooo8888.        888       888    "
  //  oo     .d8P      888       .8'     `888.       888       888       o
  //  8""88888P'      o888o     o88o     o8888o     o888o     o888ooooood8
  const [allPosts, setAllPosts] = useState([]);
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
    fetchGetAllPosts();
    // kickInvalidToken();
  }, [update]);

  //   .oooooo.     .oooooo.   ooooo      ooo oooooooooo.   ooooo ooooooooooooo ooooo   .oooooo.   ooooo      ooo oooooooooooo ooooooooo.
  //  d8P'  `Y8b   d8P'  `Y8b  `888b.     `8' `888'   `Y8b  `888' 8'   888   `8 `888'  d8P'  `Y8b  `888b.     `8' `888'     `8 `888   `Y88.
  // 888          888      888  8 `88b.    8   888      888  888       888       888  888      888  8 `88b.    8   888          888   .d88'
  // 888          888      888  8   `88b.  8   888      888  888       888       888  888      888  8   `88b.  8   888oooo8     888ooo88P'
  // 888          888      888  8     `88b.8   888      888  888       888       888  888      888  8     `88b.8   888    "     888`88b.
  // `88b    ooo  `88b    d88'  8       `888   888     d88'  888       888       888  `88b    d88'  8       `888   888       o  888  `88b.
  //  `Y8bood8P'   `Y8bood8P'  o8o        `8  o888bood8P'   o888o     o888o     o888o  `Y8bood8P'  o8o        `8  o888ooooood8 o888o  o888o

  const addBtn = () => {
    if (!userInfo.user_info) {
      return <div>Loading</div>;
    }
    if (!userInfo.user_info.userInfo && userInfo.user_info!=="failed") {
      return <div>Loading</div>;
    }
    if (userInfo.user_info?.userInfo?.type === "admin") { 
      return (

        <button
          className={clsx(classes.addBtn)}
          onClick={() => {
            history.push("blog/newPost");
          }}
        >
          New Post
        </button>
      );
    } else {
      return <div className={clsx(classes.errorDiv)}>No Blog Posts</div>
    }
  };
  if (!allPosts) {
    return <div className={clsx(classes.cont)}>
      <div className={clsx(classes.root)}>

      {addBtn()}
      </div>
      </div>;
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
      <div className={clsx(classes.root)}>
        <div className={clsx(classes.pageTitle)}>Blog</div>
        {addBtn()}
        <div
      className={clsx(classes.postsCont)}
      >
      {allPosts.map(post=>(
          <PostUnit key={post.id} update={update} setUpdate={setUpdate} post={post} />
      ))}

      </div>
      </div>
    </div>
  );
}
