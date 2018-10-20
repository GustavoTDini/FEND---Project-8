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
  }
}
