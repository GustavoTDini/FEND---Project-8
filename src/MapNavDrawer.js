import React, { Component } from 'react';
import MapPlaceSelect from './MapPlaceSelect';
import MapPlaceList from './MapPlaceList';
import PropTypes from 'prop-types';


export default class MapNavDrawer extends Component {
  static propTypes = {
    places: PropTypes.array
  };

  render() {
    const {places} = this.props;

    return (
      <div className="drawer">
        <div className="search">
          Search
          <input className="input"/>
          <MapPlaceSelect className="typeSelect"/>
        </div>
        <div className="resultList">
        {places.map((place) =>
            <li key={place.id} className="resultPlace">
              <MapPlaceList place={place}/>
            </li>
          )}
        </div>
      </div>
    )
  }
}
