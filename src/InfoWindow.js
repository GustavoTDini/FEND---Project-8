import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MapModal from './MapModal';
import * as MapFourSquareAPIHelper from './MapFourSquareAPIHelper'


export default class InfoWindow extends Component {
  static propTypes = {
    error: PropTypes.string,
    venue: PropTypes.object,
    response: PropTypes.string,
  };

  render() {
    const {venue, error, response} = this.props;
    console.log(response)

    if (response === "ok"){
      return (
          <div className="infowindow">
          <div className="infowindowDiv">
            <div>
              <div className="infowindowName">{venue.name}</div>
              {venue.url !== "NoUrl" && <a target="_blank" rel="noopener noreferrer" href={venue.url} className="infowindowData">{venue.url}</a>}
            </div>
            <div className="infowindowRatings" style={{color: `#${venue.ratingColor}`}}>{venue.rating}</div>
          </div>
            <img className="infowindowImg" src={venue.photo} alt="Venue"/>
            <div className="infowindowPrice">{venue.price}</div>
            {venue.description !== "NoDescription" && <div className="infowindowData">{venue.description}</div>}
            <div className="infowindowData">{venue.address}</div>
          </div>
        )
    } else if(response === "error"){
      console.log(error)
      return(
        <div className="infowindow">
          <p className="modalText">{`Error: ${error}`}</p>
          <p className="modalText">{MapFourSquareAPIHelper.createErrorMessage(error)}</p>
        </div>
      )
    }
  }
}
