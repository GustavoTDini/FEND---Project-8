import React, { Component } from 'react';
import MapNavDrawer from './MapNavDrawer'
import PropTypes from 'prop-types';


export default class MapContent extends Component {
  static propTypes = {
    places: PropTypes.array
  };

  render() {
    const {places} = this.props;

    return (
      <div className="content">
      <MapNavDrawer places={places}/>
      <div id="map"></div>
      </div>
    )
  }
}
