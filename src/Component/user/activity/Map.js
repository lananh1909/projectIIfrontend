import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

const containerStyle = {
    position: 'absolute',  
    width: '90%',
    height: '500px'
}

const style = {
    width: '100%',
    height: '100%'
}


 
export class CustomMap extends Component {
    render() {
        return (
          <Map 
          google={this.props.google} 
          zoom={16} 
          style={style}
          containerStyle={containerStyle}
          initialCenter={{
            lat: 21.406390,
            lng: 103.032130
          }}>
     
            <Marker position={{
                lat: 21.406390,
                lng: 103.032130
            }}/>
          </Map>
        );
      }
}
 
export default GoogleApiWrapper({
  apiKey: ('AIzaSyAF3_5Cadkh5rkgKKQe_GlyJjkgAaw0Nvo')
})(CustomMap)