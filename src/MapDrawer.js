import React, { Component } from 'react';
import MapPlaceSelect from './MapPlaceSelect';
import MapPlaceList from './MapPlaceList';

export default class MapDrawer extends Component {

  render() {
    return (
      <div className="drawer">
        <div className="search">
          Search
          <input className="input"/>
          <MapPlaceSelect className="typeSelect"/>
        </div>
        <div className="resultList">
          <MapPlaceList/>
        </div>
      </div>
    );
  }
}
