import { useHistory, useLocation, useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import moment from "moment";
import VacationUnit from "./VacationUnit";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import ArrowForward from "@material-ui/icons/ArrowForward";
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
  infoCard:{
    // border: '1px solid white',
    marginTop: '20px',
    minHeight: '30vh',
    height: '50vh',
    display: 'grid',
    gridTemplateRows: '20% auto',
    flexDirection: 'column',
    boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',

    // alignItems: 'center',
    // justifyContent: 'center',
    padding: '25px',
    borderRadius: 3,
    backgroundColor: 'rgba(29, 204, 198,.4)',

    [theme.breakpoints.down('sm')]: {
      height: '65vh',
    },
  },
  infoCardTitle:{
    // border: '1px solid pink',
    fontSize: '2rem',
    fontWeight: '300',
    color: 'white',
    textShadow: "2px 3px 5px rgba(0,0,0,0.5);",


  },
  infoCardDetailsCont:{
    display: 'grid',
    gridTemplateColumns:' 50% 50%',
    boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',

    // border: '1px solid pink',
    borderRadius: 3,
    backgroundColor: 'rgba(0,0,0, .2)',
    padding: '0 15px',
    height: 'fit-content',
  },
  productImg:{
    // height: '500px',
    // width: '50%',
    display: 'flex',
    // border: '1px solid pink',
    padding: '20px',
    justifyContent: 'flex-end',
    
    alignItems: 'center',
    borderRadius: 3,
    '&>*':{
      boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
      width: '100%',
      borderRadius: 3,
      
    }
  },
  infoCardDetails:{
    // border: '1px solid white',
    // height: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    color: '#D1F0EF',
    [theme.breakpoints.down('sm')]: {
      '&>*':{
        // border: '1px solid pink',
        margin: '10px 0',
      }
    },
  },
  infoDateCont: {
    display: 'flex',
    '&>:nth-child(2)':{
      margin: '0 5px',
    },
    // flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      justifyContent: 'center',
      // alignItems: 'center',
    },
  },
  lineThrough:{
    textDecoration: 'line-through'
  },
  gold:{
    color: '#3DCE1A',
    fontWeight: '600'
    // backgroundColor: '#5B574F',
  },
  paymentInputCont:{
    // border: '1px solid white',
    minHeight: '30vh',
    // height: '50vh',
    boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',

    marginTop: '20px',
    borderRadius: 3,
    padding: '25px',
    backgroundColor: 'rgba(29, 204, 198,.3)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    '&>input':{
      width: '93%',
      border: 'none',
      borderRadius: 3,
      height: '1.5rem',
      backgroundColor: 'rgba(255,255,255,.4)',
      color: '#484B4B',
      outline: 'none',
      padding: '0 10px'
    }
  },
  buyBtn:{
    border: 'none',
    boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',

    borderRadius: 3,
    padding: '20px',
    margin: '20px 0 20vh 0',
        // width: '33.333%',
        // width: '100%',
        // height: '55px',
        border: 'none',
        backgroundColor: '#FFC300',
        color: '#9D0909',
        borderRadius: 3,
        padding: '15px',
        fontSize: '1.3rem',
        marginTop: '15px',
        fontWight: 'bold',
        '&:hover':{
          background: '#E7FB10'
        }
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
  productImgPhone:{
    '&>img':{
      width: '100%',
      borderRadius: 3,
      margin: '10px 0',

    }
    
  }
}));

export default function Pay() {
  // oooooooooooo ooooo     ooo   .oooooo.   ooooo      ooo ooooooooooooo ooooo   .oooooo.   ooooo      ooo  .oooooo..o
  // `888'     `8 `888'     `8'  d8P'  `Y8b  `888b.     `8' 8'   888   `8 `888'  d8P'  `Y8b  `888b.     `8' d8P'    `Y8
  //  888          888       8  888           8 `88b.    8       888       888  888      888  8 `88b.    8  Y88bo.
  //  888oooo8     888       8  888           8   `88b.  8       888       888  888      888  8   `88b.  8   `"Y8888o.
  //  888    "     888       8  888           8     `88b.8       888       888  888      888  8     `88b.8       `"Y88b
  //  888          `88.    .8'  `88b    ooo   8       `888       888       888  `88b    d88'  8       `888  oo     .d8P
  // o888o           `YbodP'     `Y8bood8P'  o8o        `8      o888o     o888o  `Y8bood8P'  o8o        `8  8""88888P'
  const fetchPayVacation = async () => {
    // const res = await fetch(`https://ancient-reef-92615.herokuapp.com/pay`, {
    const res = await fetch(`/api/pay`, {
    // const res = await fetch(`http://alocalhost:666/pay`, {
      method: "POST",
      body: JSON.stringify({
        cardNum: cardNumInput,
        exp: cardExpInput,
        cvv: cardCvvInput,
        fName,
        lName,
        vacationId: id
      }),
      headers: {
        "content-type": "application/json",
        authorization: localStorage.token,
      },
    });

    if(res.status===500){
        // return console.log('server error')
    }
    setResDiv(true)
    
    if (res.status !== 200) {
        const data = await res.json();
      // console.log(data.fail);

      setResText(data.fail)

      return;
    }

    setResText('Successfuly purchased vacation. Thank you for joining us! Redirecting to Explore...')
    setTimeout(() => {
        history.push('/explore')
    }, 3000)
    

  };
  const fetchPayClubProduct = async () => {
    // const res = await fetch(`https://ancient-reef-92615.herokuapp.com/club/pay`, {
    const res = await fetch(`/api/club/pay`, {
    // const res = await fetch(`http://localhost:666/club/pay`, {
      method: "POST",
      body: JSON.stringify({
        id,
     
      }),
      headers: {
        "content-type": "application/json",
        authorization: localStorage.token,
      },
    });
    if(res.status===500){
        // return console.log('server error')
    }
    setResDiv(true)
    
    if (res.status !== 200) {
        const data = await res.json();
      // console.log(data.fail);

      setResText(data.fail)

      return;
    }

    setResText('Successfuly purchased vacation. Thank you for joining us! Redirecting to Explore...')
    setTimeout(() => {
        history.push('/explore')
    }, 3000)
  };
  const fetchGetProduct = async ()=> {
      const type = location.pathname.split('/')[2]
      if(type==='vacation'){
          // const res = await fetch(`https://ancient-reef-92615.herokuapp.com/vacation`, {
          const res = await fetch(`/api/vacation`, {
          // const res = await fetch(`http://localhost:666/vacation`, {
            method: "POST",
            body: JSON.stringify({
              id,
            }),
            headers: {
              "content-type": "application/json",
              authorization: localStorage.token,
            },
          });
          const data = await res.json()
          if(res.status!==200){
              // return console.log(data.fail)
          }

          setProduct(data.vacation)
      } else {
        // const res = await fetch(`https://ancient-reef-92615.herokuapp.com/club/prod/${id}`, {
        const res = await fetch(`/api/club/prod/${id}`, {
        // const res = await fetch(`http://localhost:666/club/prod/${id}`, {
            method: "GET",
            headers: {
              "content-type": "application/json",
              authorization: localStorage.token,
            },
          });
          const data = await res.json()
          if(res.status!==200){
              // return console.log(data.fail)
          }

          setProduct(data.clubProduct)
      }
  }
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
  const history = useHistory();
  const userInfo = useSelector((state) => state.userInfo);
  const {id} = useParams()
  const location = useLocation()
  const dispatch = useDispatch()
  const classes = useStyles();
  
  //  .oooooo..o ooooooooooooo       .o.       ooooooooooooo oooooooooooo
  //  d8P'    `Y8 8'   888   `8      .888.      8'   888   `8 `888'     `8
  //  Y88bo.           888          .8"888.          888       888
  //   `"Y8888o.       888         .8' `888.         888       888oooo8
  //       `"Y88b      888        .88ooo8888.        888       888    "
  //  oo     .d8P      888       .8'     `888.       888       888       o
  //  8""88888P'      o888o     o88o     o8888o     o888o     o888ooooood8
  const [update, setUpdate] = useState(false);
  const [cardNumInput, setCardNumInput] = useState(0)
  const [cardExpInput, setCardExpInput] = useState(0)
  const [cardCvvInput, setCardCvvInput] = useState(0)
  const [fName, setFName] = useState('')
  const [lName, setLName] = useState(0)
  const [product, setProduct] = useState(0)
  const [resDiv, setResDiv] = useState(false)
  const [resText, setResText] = useState('')
  // oooooooooooo oooooooooooo oooooooooooo oooooooooooo   .oooooo.   ooooooooooooo
  // `888'     `8 `888'     `8 `888'     `8 `888'     `8  d8P'  `Y8b  8'   888   `8
  //  888          888          888          888         888               888
  //  888oooo8     888oooo8     888oooo8     888oooo8    888               888
  //  888    "     888    "     888    "     888    "    888               888
  //  888       o  888          888          888       o `88b    ooo       888
  // o888ooooood8 o888o        o888o        o888ooooood8  `Y8bood8P'      o888o
  useEffect(() => {
    fetchGetProduct()
    // fetchGetLocation();
  }, [update]);

  //   .oooooo.     .oooooo.   ooooo      ooo  .oooooo..o
  //  d8P'  `Y8b   d8P'  `Y8b  `888b.     `8' d8P'    `Y8
  // 888          888      888  8 `88b.    8  Y88bo.
  // 888          888      888  8   `88b.  8   `"Y8888o.
  // 888          888      888  8     `88b.8       `"Y88b
  // `88b    ooo  `88b    d88'  8       `888  oo     .d8P
  //  `Y8bood8P'   `Y8bood8P'  o8o        `8  8""88888P'
  if (!userInfo) {
    return <div>loading</div>;
  }
  if (!userInfo.user_info) {
    return <div>loading</div>;
  }
  if (!userInfo.user_info.userInfo) {
    return <div>loading</div>;
  }
  if (userInfo.user_info.userInfo.type==='admin') {
    return <div>{`Admins are not allowed in here. Goodbye!`}
        {setTimeout(() => {
        history.push('/explore')
    }, 3000)
    }</div>;
  }
  const paymentInputDiv = () => {
      if(location.pathname.split('/')[2]==='vacation'){
          return <div
          className={clsx(classes.paymentInputCont)}
          >
            <div className={clsx(resDiv ? classes.active: classes.hidden, classes.errorDiv)}>{resText}</div>
              <input type="text" placeholder='Enter credit card number'
              onChange={(e)=>{
                setCardNumInput(+e.target.value)
              }}
              />
              <input type="text" placeholder='Enter credit card exp'
              onChange={(e)=>{
                setCardExpInput(e.target.value)
              }}
              />
              <input type="text" placeholder='Enter credit card cvv'
              onChange={(e)=>{
                setCardCvvInput(+e.target.value)
              }}
              />
              <input type="text" placeholder='Enter credit card owner first name'
              onChange={(e)=>{
                setFName(e.target.value)
              }}
              />
              <input type="text" placeholder='Enter credit card owner last name' 
              onChange={(e)=>{
                setLName(e.target.value)
              }}
              />
          </div>
      }
  }


  //    oooo  .oooooo..o ooooooo  ooooo
  //    `888 d8P'    `Y8  `8888    d8'
  //     888 Y88bo.         Y888..8P
  //     888  `"Y8888o.      `8888'
  //     888      `"Y88b    .8PY888.
  //     888 oo     .d8P   d8'  `888b
  // .o. 88P 8""88888P'  o888o  o88888o
  // `Y888P

  return <div className={clsx(classes.cont)}>
    <div className={clsx(classes.root)}>

      {/* <div>Payment</div> */}
      <div
      className={clsx(classes.infoCard)}
      >
          <div
      className={clsx(classes.infoCardTitle)}
          
          >Product</div>
          <div
      className={clsx(classes.infoCardDetailsCont)}
          
          >
            <div
            className={clsx(classes.infoCardDetails)}
            >
              <div
              className={clsx(classes.infoName)}
              >{product.name}</div>
              <div
              className={clsx(classes.infoLocation)}
              
              >{`${product.location_name}, ${product.country}`}</div>
              <div
              className={clsx(classes.infoDateCont)}
              >
                  <div>{moment(product.start_date).format('DD/MM/YYYY')}</div>
                  <ArrowForward />
                  <div>{moment(product.end_date).format('DD/MM/YYYY')}</div>
              </div>
              <div
              className={clsx(classes.infoPrice, product.discount && classes.lineThrough)}
              
              >{location.pathname.split('/')[2]==='vacation' ? `$${product.price}` : `${product.price} Club Credits`}</div>
              {product.discount && <div>${product.discount}</div>}
              {location.pathname.split('/')[2]==='vacation' &&
              <div
              className={clsx(classes.infoCredits)}
              
              >Earn {product.credits} <span className={clsx(classes.gold)}>Club Credits!</span></div>
              }
            </div>
            {window.innerWidth > 450 && <div
            className={clsx(classes.productImg)}
            >
              <img src={product.img_src} alt="" />
            </div>}
          </div>

          {window.innerWidth <= 450 && <div
            className={clsx(classes.productImgPhone)}
            >
              <img src={product.img_src} alt="" />
            </div>}
      </div>
      {paymentInputDiv()}
      {location.pathname.split('/')[2]==='clubProduct' &&  <div className={clsx(resDiv ? classes.active: classes.hidden, classes.errorDiv)}>{resText}</div>}

      <button
      className={clsx(classes.buyBtn)}
      onClick={()=>{
        if(location.pathname.split('/')[2]==='vacation'){
            fetchPayVacation()
        } else {
            fetchPayClubProduct()
        }
      }}
      >Buy Now</button>
      </div>
</div>

}
