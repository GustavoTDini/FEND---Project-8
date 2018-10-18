import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class InfoWindow extends Component {
  static propTypes = {
    venue: PropTypes.object,
  };

  render() {
    const {venue} = this.props;
    console.log(venue)

    return (
      <div className="infowindow">
      <div className="infowindowDiv">
        <div>
          <div className="infowindowName">{venue.name}</div>
          {venue.url !== "NoUrl" && <div className="infowindowData">{venue.url}</div>}
        </div>
        <div className="infowindowRatings" style={{color: `#${venue.ratingColor}`}}>{venue.rating}</div>
      </div>
        <img className="infowindowImg" src={venue.photo} alt="Venue"/>
        <div className="infowindowPrice">{venue.price}</div>
        {venue.description !== "NoDescription" && <div className="infowindowData">{venue.description}</div>}
        <div className="infowindowData">{venue.address}</div>
      </div>
    )
  }
}
