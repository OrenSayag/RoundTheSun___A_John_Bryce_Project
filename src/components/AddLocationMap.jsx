import React, { Component, useState } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
import PlanMarker from "./PlanMarker";


class AddLocationMap extends Component {
  static defaultProps = {
    center: {
      lat: 50,
      lng: 50,
    },
    zoom: 3,
  };

  state = {
    markerTog: false,
    // x: 10,
    // y: 10,
  };

  shouldComponentUpdate=()=>{
    return true
  }



  render() {
    return (
      // Important! Always set the container height explicitly

      <div style={{ height: this.props.height, width: this.props.width }}>
        {/* {console.log(this.props.zoom)} */}
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCkeKqV86ERd3GsBn-3OxUbFLTCcb2YgEo" }}
          defaultCenter={{lat:this.props.x, lng:this.props.y}}
      
          defaultZoom={  this.props.myZoom || this.props.zoom}
          onClick={({ x, y, lat, lng, event }) => {
            // console.log(x, y, lat, lng, event);
            this.props.setX(lat);
            this.props.setY(lng);
            if(!this.props.MLU){
              this.props.setUpdate(!this.props.update)
            }
            this.setState({ markerTog: true });
            // console.log(this.state.markerTog);
          }}
        >
          {(this.state.markerTog || this.props.MLU) && <Marker

            lat={this.props.x}
            lng={this.props.y}
          />}

        </GoogleMapReact>

      
      </div>
    );
  }
}

export default AddLocationMap;


