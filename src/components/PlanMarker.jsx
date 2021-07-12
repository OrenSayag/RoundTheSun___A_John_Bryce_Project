import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

// .oooooo..o ooooooooooooo oooooo   oooo ooooo        oooooooooooo  .oooooo..o
// d8P'    `Y8 8'   888   `8  `888.   .8'  `888'        `888'     `8 d8P'    `Y8
// Y88bo.           888        `888. .8'    888          888         Y88bo.
//  `"Y8888o.       888         `888.8'     888          888oooo8     `"Y8888o.
//      `"Y88b      888          `888'      888          888    "         `"Y88b
// oo     .d8P      888           888       888       o  888       o oo     .d8P
// 8""88888P'      o888o         o888o     o888ooooood8 o888ooooood8 8""88888P'
const useStyles = makeStyles({
  root: {
    // background: "linear-gradient(45deg, #126929 30%, #c41bbc 90%)",
    // position: 'relative',
    width: "1300px",
    marginTop: "100px",
  },
  marker: {
    position: "relative",
    borderRadius: "50%",
    // border: "3px solid #003BFF",
    backgroundColor: "#460893",
    width: "10px;",
    height: "10px;",
  },
  infoCont: {
    height: "fit-content",
    width: "125px",
    backgroundColor: "linen",
    position: "absolute",
    top: "-185px",
    left: "-56px",
    display: "flex",
    flexDirection: "column",
    justifyContent: 'space-between',
    padding: "8px",
    boxSizing: "border-box",
    borderRadius: 5,
    opacity: 0.9,
    "&>*": {
      marginBottom: "5px",
      borderBotton: "1px solid black",
      // fontSize: '1rem',
    },
  },
  hidden: {
    display: "none",
  },
  name: {
    fontSize: "1rem",
    color: "#922B9E",
    marginBottom: '5px',
    fontSize: '1rem',
  },
  country: {
    color: "#E57008",
    marginBottom: '5px',
    fontSize: '1rem',

  },
  social: {
    backgroundColor: "#DADEE1",
    padding: "5px",
    borderRadius: 3,
    color: '#02243A',
    fontSize: '1rem',
    '&>*':{
      marginBottom: '5px',
    },
    '&>*>*':{
      marginBottom: '5px',
    }
  },
});

const PlanMarker = (props) => {
  const { color, name, setChosenLocation, location } = props;

  //  .oooooo..o ooooooooooooo       .o.       ooooooooooooo oooooooooooo
  //  d8P'    `Y8 8'   888   `8      .888.      8'   888   `8 `888'     `8
  //  Y88bo.           888          .8"888.          888       888
  //   `"Y8888o.       888         .8' `888.         888       888oooo8
  //       `"Y88b      888        .88ooo8888.        888       888    "
  //  oo     .d8P      888       .8'     `888.       888       888       o
  //  8""88888P'      o888o     o88o     o8888o     o888o     o888ooooood8
  const [infoTog, setInfoTog] = useState(false);

  // ooooo   ooooo   .oooooo.     .oooooo.   oooo    oooo  .oooooo..o
  // `888'   `888'  d8P'  `Y8b   d8P'  `Y8b  `888   .8P'  d8P'    `Y8
  //  888     888  888      888 888      888  888  d8'    Y88bo.
  //  888ooooo888  888      888 888      888  88888[       `"Y8888o.
  //  888     888  888      888 888      888  888`88b.         `"Y88b
  //  888     888  `88b    d88' `88b    d88'  888  `88b.  oo     .d8P
  // o888o   o888o  `Y8bood8P'   `Y8bood8P'  o888o  o888o 8""88888P'
  const classes = useStyles();

  //   .oooooo.     .oooooo.   ooooo      ooo oooooooooo.   ooooo ooooooooooooo ooooo   .oooooo.   ooooo      ooo oooooooooooo ooooooooo.
  //  d8P'  `Y8b   d8P'  `Y8b  `888b.     `8' `888'   `Y8b  `888' 8'   888   `8 `888'  d8P'  `Y8b  `888b.     `8' `888'     `8 `888   `Y88.
  // 888          888      888  8 `88b.    8   888      888  888       888       888  888      888  8 `88b.    8   888          888   .d88'
  // 888          888      888  8   `88b.  8   888      888  888       888       888  888      888  8   `88b.  8   888oooo8     888ooo88P'
  // 888          888      888  8     `88b.8   888      888  888       888       888  888      888  8     `88b.8   888    "     888`88b.
  // `88b    ooo  `88b    d88'  8       `888   888     d88'  888       888       888  `88b    d88'  8       `888   888       o  888  `88b.
  //  `Y8bood8P'   `Y8bood8P'  o8o        `8  o888bood8P'   o888o     o888o     o888o  `Y8bood8P'  o8o        `8  o888ooooood8 o888o  o888o

  return (
    <div
      className={clsx(classes.marker)}
      style={{ cursor: "pointer" }}
      title={name}
      onClick={() => {
        setChosenLocation(location);
      }}
      onMouseOver={() => {
        // console.log("hover");
        setInfoTog(true);
      }}
      onMouseLeave={() => {
        setInfoTog(false);
      }}
    >
      <div
        className={clsx(
          infoTog ? classes.active : classes.hidden,
          classes.infoCont
        )}
        onMouseLeave={() => {
          setInfoTog(false);
        }}
      >
        <div className={clsx(classes.top)}>
          <div className={clsx(classes.country)}>{location.country}</div>
          <div className={clsx(classes.name)}>{location.name}</div>
        </div>

        <div className={clsx(classes.social)}>
          <div className={clsx(classes.favoredBy)}>
            <div>
            Favored By:
            </div>
            <div>
             {location.locationFavoredBy.length}
            </div>
          </div>
          <div className={clsx(classes.vacations)}>
            <div>
            Vacations:
            </div>
            <div>
             {location.locationVacations.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanMarker;
