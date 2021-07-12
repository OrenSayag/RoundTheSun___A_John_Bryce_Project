import clsx from 'clsx';
import React from 'react';
import { makeStyles } from "@material-ui/core/styles";


const Marker = (props) => {
  // .oooooo..o ooooooooooooo oooooo   oooo ooooo        oooooooooooo  .oooooo..o
  // d8P'    `Y8 8'   888   `8  `888.   .8'  `888'        `888'     `8 d8P'    `Y8
  // Y88bo.           888        `888. .8'    888          888         Y88bo.
  //  `"Y8888o.       888         `888.8'     888          888oooo8     `"Y8888o.
  //      `"Y88b      888          `888'      888          888    "         `"Y88b
  // oo     .d8P      888           888       888       o  888       o oo     .d8P
  // 8""88888P'      o888o         o888o     o888ooooood8 o888ooooood8 8""88888P'
  const useStyles = makeStyles({
    marker: {
      position: "relative",
      borderRadius: "50%",
      // border: "3px solid #003BFF",
      backgroundColor: "#460893",
      width: "10px;",
      height: "10px;",
    },
    active: {
      display: "flex",
    },
    hidden: {
      display: "none",
    },
  });
  
  
  
  const classes = useStyles();
    const { color, name } = props;
    return (
      <div className={clsx(classes.marker)}
        style={{ backgroundColor: color, cursor: 'pointer'}}
        title={name}
      />
    );
  };

  export default Marker;

