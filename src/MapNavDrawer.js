import React, { Component } from 'react';
import MapPlaceSelect from './MapPlaceSelect';
import MapPlaceList from './MapPlaceList';
import PropTypes from 'prop-types';


export default class MapNavDrawer extends Component {
  static propTypes = {
    places: PropTypes.array,
    query: PropTypes.string,
    updateQuery: PropTypes.func,
    categoriesSelect: PropTypes.func,
    updateMap: PropTypes.func
  };

  changeQuery(e) {
    this.props.updateQuery(e);
  }

  doSearch(e){
    this.props.updateMap();
  }

  render() {
    const {places, query} = this.props;

    return (
      <div className="drawer">
        <div className="search">
          <input
            className="input"
            type='text'
            placeholder="Search terms"
            value={query}
            onChange={(event) => this.changeQuery(event.target.value)}/>
          <MapPlaceSelect
            className="typeSelect"
            categoriesSelect={this.props.categoriesSelect}/>
          <button
            className="input"
            onClick={(e) => this.doSearch(e)}>Search</button>
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
