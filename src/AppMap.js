import React, { Component } from 'react'
import * as MapHelper from './MapHelper'
import PropTypes from 'prop-types';

export default class AppMap extends Component {
  static propTypes = {
    places: PropTypes.array
  };

  componentDidMount() {
    MapHelper.createMapScript().then((google) => {
      let map = MapHelper.initMap();
      MapHelper.populateMarkers(this.props.places, map);
    })
  };

  render() {
    return (
      <div id="map"></div>
    );
  };
};
