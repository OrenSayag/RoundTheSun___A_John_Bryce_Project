import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory, useLocation, Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import moment from "moment";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Edit from "@material-ui/icons/Edit";
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
    // marginTop: '100px',
    // width: "70%",
    padding: '20px',
    fontFamily: 'Georgia, serif	',
    [theme.breakpoints.down('sm')]: {
      padding: '5px',
      width: 'calc(100% - 40px)',
      padding: '20px',
    },
    // marginBottom: '50px',
  },
  cont: {
    // width: '100%',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: "linear-gradient(to right, #159957, #155799)",
    // height: '100vh',
    minHeight: "150vh",
    width: '100%',
    // boxSizing: 'border-box'
  },
  active: {
    display: "flex",
  },
  hidden: {
    display: "none",
  },
  blogUnit:{
    // border: '1px solid white',
    borderRadius: 3,
    backgroundColor: '#D5F4F0',
    position: 'relative',
    boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',

    
  },
  title: {
    // border: '1px solid pink',
    borderRadius: 3,
    // width: '75%',
    padding: '20px',
    fontSize: '2rem',
    // color: '#CBF4ED',
    marginBottom: '30px',
    letterSpacing: '.2mm',
    margin: '50px 0',
  },
  text:{
    padding: '20px',
    lineHeight: '1.3rem',
    letterSpacing: '.2mm',
    fontFamily: '',
    marginBottom: '20px',
  },
  date: {
    position: 'absolute',
    bottom: '5px',
    right: '10px',
    color: 'gray',


  },
  editBtn:{
    transition: 'background .2s',
    backgroundColor:'#734601',
    '&:hover':{
      backgroundColor:'#DE8C0D',
      
    },

      
      [theme.breakpoints.down('sm')]: {
        fontSize: '.8rem',
        alignItems: 'center',
      },
  },
  delBtn:{
    backgroundColor:'#360A0A',
    transition: 'background .2s',
    '&:hover':{
      
      backgroundColor:'#D31B1B',
    },

      
      [theme.breakpoints.down('sm')]: {
        fontSize: '.8rem',
        alignItems: 'center',
      },

  },
  editCont:{
    // height: '2rem',
    position: 'absolute',
    top: '-50px',
    right: '0px',
    display: 'flex',
    justifyContent: 'space-between',
  width: '5rem',
    "&>*":{
      color: 'white',
      border: 'none',
      padding: '7px',
      borderRadius: 3,
      // width: '90px',
      fontSize: '.9rem',
    },

    [theme.breakpoints.down('sm')]: {
      // width: '50px',
      // flexDirection: 'column',
      "&>*":{
        marginBottom: '5px',
        fontSize: '.5rem',
      }
    },
    
  },
  inputCont:{
    border: '1px solid white',
    borderRadius: 3,
    backgroundColor: '#D5F4F0',
    position: 'relative',
    display: 'flex',
    padding: '20px',
    flexDirection: 'column',
    "& input":{
      width: '40%',
      height: '2rem',
      padding: '2px 8px',
      border: '1px solid limegreen',
      outline: 'none',
      backgroundColor:'rgba(0,0,0,.7)',
      marginBottom: '10px',
      borderRadius: 3,
      color: 'white',
      padding: '20px',
      fontSize: '2rem',
      fontFamily: 'inherit',

      
      [theme.breakpoints.down('sm')]: {
        padding: '5px',
        width: 'calc(100% - 100px)',
      },
      
    },
    "& textarea":{
      width: 'calc(100% - 46px)',
      height: '2rem',
      padding: '2px 8px',
      border: '1px solid limegreen',
      outline: 'none',
      backgroundColor:'rgba(0,0,0,.7)',
      marginBottom: '10px',
      fontFamily: 'inherit',
      padding: '20px',
      borderRadius: 3,
      color: 'white',
      resize: 'none',

      [theme.breakpoints.down('sm')]: {
        width: 'calc(100% - 10px)',
        padding: '5px',
      },
      
    }
  },
  cancelEditBtn:{
    backgroundColor: '#734601',
    '&:hover':{
      backgroundColor:'#DE8C0D',
      
    },
    transition: 'background .2s'
  },



}));

export default function PostUnit({post, update, setUpdate}) {
        // oooooooooooo ooooo     ooo ooooo      ooo   .oooooo.   ooooooooooooo ooooo   .oooooo.   ooooo      ooo  .oooooo..o
        // `888'     `8 `888'     `8' `888b.     `8'  d8P'  `Y8b  8'   888   `8 `888'  d8P'  `Y8b  `888b.     `8' d8P'    `Y8
        //  888          888       8   8 `88b.    8  888               888       888  888      888  8 `88b.    8  Y88bo.
        //  888oooo8     888       8   8   `88b.  8  888               888       888  888      888  8   `88b.  8   `"Y8888o.
        //  888    "     888       8   8     `88b.8  888               888       888  888      888  8     `88b.8       `"Y88b
        //  888          `88.    .8'   8       `888  `88b    ooo       888       888  `88b    d88'  8       `888  oo     .d8P
        // o888o           `YbodP'    o8o        `8   `Y8bood8P'      o888o     o888o  `Y8bood8P'  o8o        `8  8""88888P'
        const fetchEditPost = async () => {
          const res = await fetch("https://ancient-reef-92615.herokuapp.com/blog/post", {
            method: "PUT",
            body:JSON.stringify({
              id: post.id,
              text: textInput,
              title: titleInput
            }),
            headers: {
              "content-type": "application/json",
              authorization: localStorage.token,
            },
          });



          // console.log('running edit post')
        
          if (res.status === 500) {
            // return console.log("server error");
          }
        
        };
        const fetchDelPost = async () => {
          const res = await fetch("https://ancient-reef-92615.herokuapp.com/blog/post", {
            method: "DELETE",
            body:JSON.stringify({
              id: post.id,
            }),
            headers: {
              "content-type": "application/json",
              authorization: localStorage.token,
            },
          });
        
          if (res.status === 500) {
            // return console.log("server error");
          }
        
        };
        //  .oooooo..o ooooooooooooo       .o.       ooooooooooooo oooooooooooo
        //  d8P'    `Y8 8'   888   `8      .888.      8'   888   `8 `888'     `8
        //  Y88bo.           888          .8"888.          888       888
        //   `"Y8888o.       888         .8' `888.         888       888oooo8
        //       `"Y88b      888        .88ooo8888.        888       888    "
        //  oo     .d8P      888       .8'     `888.       888       888       o
        //  8""88888P'      o888o     o88o     o8888o     o888o     o888ooooood8
        const [textInput, setTextInput] = useState('')
        const [titleInput, setTitleInput] = useState('')
        const [editTog, setEditTog] = useState(false)
        
        // ooooo   ooooo   .oooooo.     .oooooo.   oooo    oooo  .oooooo..o
        // `888'   `888'  d8P'  `Y8b   d8P'  `Y8b  `888   .8P'  d8P'    `Y8
        //  888     888  888      888 888      888  888  d8'    Y88bo.
        //  888ooooo888  888      888 888      888  88888[       `"Y8888o.
        //  888     888  888      888 888      888  888`88b.         `"Y88b
        //  888     888  `88b    d88' `88b    d88'  888  `88b.  oo     .d8P
        // o888o   o888o  `Y8bood8P'   `Y8bood8P'  o888o  o888o 8""88888P'
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

        }, []);
        
        //   .oooooo.     .oooooo.   ooooo      ooo oooooooooo.   ooooo ooooooooooooo ooooo   .oooooo.   ooooo      ooo oooooooooooo ooooooooo.
        //  d8P'  `Y8b   d8P'  `Y8b  `888b.     `8' `888'   `Y8b  `888' 8'   888   `8 `888'  d8P'  `Y8b  `888b.     `8' `888'     `8 `888   `Y88.
        // 888          888      888  8 `88b.    8   888      888  888       888       888  888      888  8 `88b.    8   888          888   .d88'
        // 888          888      888  8   `88b.  8   888      888  888       888       888  888      888  8   `88b.  8   888oooo8     888ooo88P'
        // 888          888      888  8     `88b.8   888      888  888       888       888  888      888  8     `88b.8   888    "     888`88b.
        // `88b    ooo  `88b    d88'  8       `888   888     d88'  888       888       888  `88b    d88'  8       `888   888       o  888  `88b.
        //  `Y8bood8P'   `Y8bood8P'  o8o        `8  o888bood8P'   o888o     o888o     o888o  `Y8bood8P'  o8o        `8  o888ooooood8 o888o  o888o
        if (post===undefined) {
          return <div>No posts</div>;
        }
        const postDiv = (post) => {
            if(editTog){
              return <div
              className={clsx(classes.inputCont)}
              >
              <input type="text" placeholder={post.title} 
              onChange={(e)=>{
                  setTitleInput(e.target.value)
              }}
              />
              <textarea type="text" placeholder={post.text} 
              onChange={(e)=>{
                  setTextInput(e.target.value)
              }}
              />
              <div
              className={clsx(classes.editCont)}
              >

              <button
              onClick={()=>{
                  fetchEditPost()
                  setEditTog(!editTog)
                  setUpdate(!update)
              }}
              className={clsx(classes.editBtn)}


              >Save</button>
              <button
              className={clsx(classes.cancelEditBtn)}
              onClick={()=>{
                  setEditTog(!editTog)
              }}
              >Cancel</button>
                      {/* <button
                        className={clsx(classes.delBtn)}
                      onClick={()=>{
                          fetchDelPost()
                          setUpdate(!update)
                      }}


                      ><DeleteIcon /></button> */}
              </div>
          </div>
            } else {
              return <div
              className={clsx(classes.blogUnit)}
              
              >
                  <div
              className={clsx(classes.title)}
                  >{post.title}</div>
                  <div
              className={clsx(classes.text)}
                  >{post.text}</div>

                  <div
              className={clsx(classes.date)}
                  >{moment(post.date).format('yyyy/MM/DD, HH:mm')}</div>

                  {userInfo && userInfo.user_info && userInfo.user_info.userInfo && userInfo.user_info.userInfo.type==='admin' && <div
                  className={clsx(classes.editCont)}
                  >
                          <button
              className={clsx(classes.editBtn)}

                          onClick={()=>{
                              setEditTog(!editTog)
                          }}
                          ><Edit /></button>
                          <button
              className={clsx(classes.delBtn)}

                          onClick={()=>{
                              fetchDelPost()
                              setUpdate(!update)
                          }}
                          ><DeleteIcon /></button>
                      </div>}
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
    return <div
    className={clsx(classes.root)}
    >
      {postDiv(post)}
      
  </div>;
}
