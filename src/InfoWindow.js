import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
          <div className="infowindow-div">
            <div>
              <div className="infowindow-name">{venue.name}</div>
              {venue.url !== "NoUrl" && <a target="_blank" rel="noopener noreferrer" href={venue.url} className="infowindow-data">{venue.url}</a>}
            </div>
            <div className="infowindow-ratings" style={{color: `#${venue.ratingColor}`}}>{venue.rating}</div>
          </div>
            <img className="infowindow-img" src={venue.photo} alt="Venue"/>
            <div className="infowindow-price">{venue.price}</div>
            {venue.description !== "NoDescription" && <div className="infowindow-data">{venue.description}</div>}
            <div className="infowindow-data">{venue.address}</div>
          </div>
        )
    } else if(response === "error"){
      console.log(error)
      return(
        <div className="infowindow">
          <p className="modal-text">Sorry! Unable to Perform Request!</p>
          <p className="modal-text">{`Error: ${error}`}</p>
          <p className="modal-text">{MapFourSquareAPIHelper.createErrorMessage(error)}</p>
        </div>
      )
    }
  }
}
