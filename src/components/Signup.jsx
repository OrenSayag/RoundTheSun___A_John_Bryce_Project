import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation,  } from "react-router-dom";
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
      // position: 'relative',
      // width: "1300px",
      // marginTop: '100px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '70%',
      height:'90vh',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
    cont: {
      // width: '100%',
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      background: "linear-gradient(to right, #159957, #155799)",
      height: 'calc(100vh - 70px)',
      // height: '100vh',
      // boxSizing: 'border-box'
    },
    active: {
      display: "flex",
    },
    hidden: {
      display: "none",
    },
    errorDiv:{
      backgroundColor: 'rgba(234, 108, 14, .6)',
      padding: '20px',
      borderRadius: 3,
      fontWeight: 400,
      // position: 'absolute',
      top: '20px',
    },
    card:{
        height: '50vh',
        // border: '1px solid pink',
        marginTop: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        backgroundColor: 'rgba(0, 0, 0, .3)',
        minWidth: '70%',
        borderRadius: 3,
        alignItems: 'center',
        // position: 'relative',
        padding: '15px',
    
        "&>input":{
          border: 'none',
          height: '2rem',
          width: '15rem',
          borderRadius: 3,
          padding: '0 8px',
          backgroundColor: 'rgba(255,255,255, .7)',
        boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;",
          outline: 'none',
    
        },
    
        "&>button":{
          border: 'none',
          padding: '20px',
          borderRadius: 3,
          background: 'rgba(66, 7, 110,.9)',
          color: 'white',
          transition: 'background .2s',
          letterSpacing: '.2mm',
          '&:hover':{
            background: 'rgba(66, 7, 110)',
        boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;",
    
          }
        }
    },
    inputCont:{
        "&>input":{
            border: 'none',
            height: '2rem',
            width: '15rem',
            borderRadius: 3,
            padding: '0 8px',
            backgroundColor: 'rgba(255,255,255, .7)',
          boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;",
            outline: 'none',
      
          },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          height: '70%',
          padding: '15px',
        //   width: '80%',


    },
    success:{
        backgroundColor: 'rgba(118, 234, 14, .7)            '
    }
  }));

export default function Signup() {
    // oooooooooooo ooooo     ooo ooooo      ooo   .oooooo.   ooooooooooooo ooooo   .oooooo.   ooooo      ooo  .oooooo..o
    // `888'     `8 `888'     `8' `888b.     `8'  d8P'  `Y8b  8'   888   `8 `888'  d8P'  `Y8b  `888b.     `8' d8P'    `Y8
    //  888          888       8   8 `88b.    8  888               888       888  888      888  8 `88b.    8  Y88bo.
    //  888oooo8     888       8   8   `88b.  8  888               888       888  888      888  8   `88b.  8   `"Y8888o.
    //  888    "     888       8   8     `88b.8  888               888       888  888      888  8     `88b.8       `"Y88b
    //  888          `88.    .8'   8       `888  `88b    ooo       888       888  `88b    d88'  8       `888  oo     .d8P
    // o888o           `YbodP'    o8o        `8   `Y8bood8P'      o888o     o888o  `Y8bood8P'  o8o        `8  8""88888P'
    const fetchSignup = async () =>{
        if(password!==validatePassword){
            setErrorDiv(true)
            setErrorDivText(`Passwords don't match`)
            return 1
        }
        try {
            // const res = await fetch(`https://ancient-reef-92615.herokuapp.com/auth/signup`,{
            const res = await fetch(`http://localhost:666/auth/signup`,{
                method: 'POST',
                body:JSON.stringify({
                    userName, password, firstName, lastName, mail
                }),
                headers:{
                    'content-type':'application/json'
                }
            })
            
            if(res.status!==200){
                setErrorDiv(true)
                const data = await res.json()
                // console.log(data)
                setErrorDivText(data.fail)
            } else {
                setErrorDiv(true)
                setErrorDivText('Success! Redirecting to login...')
                setSuccess(true)
                setTimeout(() => {
                    history.push('/login')
                }, 3000);
            }
    
        } catch (error) {
            // console.log(error)
        }
    }
    //  .oooooo..o ooooooooooooo       .o.       ooooooooooooo oooooooooooo
    //  d8P'    `Y8 8'   888   `8      .888.      8'   888   `8 `888'     `8
    //  Y88bo.           888          .8"888.          888       888
    //   `"Y8888o.       888         .8' `888.         888       888oooo8
    //       `"Y88b      888        .88ooo8888.        888       888    "
    //  oo     .d8P      888       .8'     `888.       888       888       o
    //  8""88888P'      o888o     o88o     o8888o     o888o     o888ooooood8
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [validatePassword, setValidatePassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [mail, setMail] = useState('')
    const [errorDiv, setErrorDiv] = useState(false)
    const [errorDivText, setErrorDivText] = useState('')
    // const [successDiv, setSuccessDiv] = useState(false)
    const [success, setSuccess] = useState(false)
    
    // ooooo   ooooo   .oooooo.     .oooooo.   oooo    oooo  .oooooo..o
    // `888'   `888'  d8P'  `Y8b   d8P'  `Y8b  `888   .8P'  d8P'    `Y8
    //  888     888  888      888 888      888  888  d8'    Y88bo.
    //  888ooooo888  888      888 888      888  88888[       `"Y8888o.
    //  888     888  888      888 888      888  888`88b.         `"Y88b
    //  888     888  `88b    d88' `88b    d88'  888  `88b.  oo     .d8P
    // o888o   o888o  `Y8bood8P'   `Y8bood8P'  o888o  o888o 8""88888P'
    const history = useHistory();
    const userInfo = useSelector((state) => state.userInfo);
    const classes = useStyles()

    
    //   oooo  .oooooo..o ooooooo  ooooo
    //   `888 d8P'    `Y8  `8888    d8'
    //    888 Y88bo.         Y888..8P
    //    888  `"Y8888o.      `8888'
    //    888      `"Y88b    .8PY888.
    //    888 oo     .d8P   d8'  `888b
    // .o. 88P 8""88888P'  o888o  o88888o
    // `Y888P
    return (
        <div
        className={clsx(classes.cont)}
        >
            <div
            className={clsx(classes.root)}
            >
            {(userInfo && (!userInfo.user_info && userInfo.user_info !== 'fail') && history.push('/landing'))}
            
            {/* <div>Sign Up</div>
            <div>One step for you... A thousand steps for us</div> */}
            <div
            className={clsx(classes.card)}
            >   
                <div className={clsx(errorDiv ? classes.active : classes.hidden, classes.errorDiv, success && classes.success)}>{errorDivText}</div>
            <div
            className={clsx(classes.inputCont)}
            >

                <input type="text" placeholder="Enter your user name"
                onChange={(e)=>setUserName(e.target.value)}
  onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchSignup();
            }
          }}

                />
                <input type="text" placeholder="Enter your mail" 
                onChange={(e)=>setMail(e.target.value)}
  onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchSignup();
            }
          }}

                />
                <input type="text" placeholder="Enter your first name"
                onChange={(e)=>setFirstName(e.target.value)}
  onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchSignup();
            }
          }}

                />
                <input type="text" placeholder="Enter your last name"
                onChange={(e)=>setLastName(e.target.value)}
  onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchSignup();
            }
          }}

                />
                <input type="password" placeholder="Enter your password" 
                onChange={(e)=>setPassword(e.target.value)}
  onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchSignup();
            }
          }}

                />
                <input type="password" placeholder="Validate your password" 
                onChange={(e)=>setValidatePassword(e.target.value)}
  onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchSignup();
            }
          }}

                />

            </div>
            <button
            onClick={()=>{fetchSignup()}}
            >Sign Up</button>
            </div>
            {/* <div className={successDiv ? 'active':'hidden'}>{successDivText}</div> */}
        </div>
        </div>
    )
}
