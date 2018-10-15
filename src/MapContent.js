import React, { Component } from 'react';
import MapNavDrawer from './MapNavDrawer'
import PropTypes from 'prop-types';


export default class MapContent extends Component {
  static propTypes = {
    places: PropTypes.array,
    query: PropTypes.string,
    updateQuery: PropTypes.func,
    categoriesSelect: PropTypes.func,
    updateMap: PropTypes.func
  };

  render() {
    const {places} = this.props;

    return (
      <div className="content">
      <MapNavDrawer
        places={places}
        updateQuery={this.props.updateQuery}
        categoriesSelect={this.props.categoriesSelect}
        updateMap={this.props.updateMap}/>
      <div id="map"></div>
      </div>
    )
  }
}
