import React, { Component, useState } from "react";
import GoogleMapReact from "google-map-react";
import PlanMarker from "./PlanMarker";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";



  // ooooo   ooooo   .oooooo.     .oooooo.   oooo    oooo  .oooooo..o
  // `888'   `888'  d8P'  `Y8b   d8P'  `Y8b  `888   .8P'  d8P'    `Y8
  //  888     888  888      888 888      888  888  d8'    Y88bo.
  //  888ooooo888  888      888 888      888  88888[       `"Y8888o.
  //  888     888  888      888 888      888  888`88b.         `"Y88b
  //  888     888  `88b    d88' `88b    d88'  888  `88b.  oo     .d8P
  // o888o   o888o  `Y8bood8P'   `Y8bood8P'  o888o  o888o 8""88888P
  const useStyles = theme => ({
    map: {
      borderRadius: 3,
    },
      });
    


class PlanMap extends Component {
  static defaultProps = {
    center: {
      lat: 50,
      lng: 50,
    },
    zoom: 10,
  };

  state = {
    // x: 10,
    // y: 10,
  };

  shouldComponentUpdate=()=>{
    return true
  }

 

    //   .oooooo.     .oooooo.   ooooo      ooo oooooooooo.   ooooo ooooooooooooo ooooo   .oooooo.   ooooo      ooo oooooooooooo ooooooooo.   
    //  d8P'  `Y8b   d8P'  `Y8b  `888b.     `8' `888'   `Y8b  `888' 8'   888   `8 `888'  d8P'  `Y8b  `888b.     `8' `888'     `8 `888   `Y88. 
    // 888          888      888  8 `88b.    8   888      888  888       888       888  888      888  8 `88b.    8   888          888   .d88' 
    // 888          888      888  8   `88b.  8   888      888  888       888       888  888      888  8   `88b.  8   888oooo8     888ooo88P'  
    // 888          888      888  8     `88b.8   888      888  888       888       888  888      888  8     `88b.8   888    "     888`88b.    
    // `88b    ooo  `88b    d88'  8       `888   888     d88'  888       888       888  `88b    d88'  8       `888   888       o  888  `88b.  
    //  `Y8bood8P'   `Y8bood8P'  o8o        `8  o888bood8P'   o888o     o888o     o888o  `Y8bood8P'  o8o        `8  o888ooooood8 o888o  o888o  
    
    
    render() {
      const { classes } = this.props;

        if(!this.props.locationsArr){
            return <div>Loading</div>
        }
    return (
      // Important! Always set the container height explicitly

      <div 
      style={{ height: this.props.height, width: this.props.width,  }}>
        {/* {console.log(this.props.zoom)} */}
        <GoogleMapReact
        className={clsx(classes.map)}
          bootstrapURLKeys={{ key: "AIzaSyCkeKqV86ERd3GsBn-3OxUbFLTCcb2YgEo" }}
          defaultCenter={{lat:0, lng:0}}
          // resetBoundsOnResize={true}
          defaultZoom={  0}
        >
          {this.props.locationsArr.map(location=><PlanMarker
            lat={location.x}
            lng={location.y}
            name="My Marker"
            color="red"
            setChosenLocation={this.props.setChosenLocation}
            setUpdate={this.props.setUpdate}
            update={this.props.update}
            location={location}
          />) }


        </GoogleMapReact>

      
      </div>
    );
  }
}

export default withStyles(useStyles)(PlanMap);


