import React, { Component } from 'react'
import * as MapHelper from './MapHelper'

export default class AppMap extends Component {

  componentDidMount() {
    MapHelper.createMapScript().then((google) => {
      MapHelper.initMap();
    })
  };

  render() {
    return (
      <div id="map"></div>
    );
  };
};
