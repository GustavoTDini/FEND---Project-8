import React, { Component } from 'react';
import MapNavDrawer from './MapNavDrawer'
import PropTypes from 'prop-types';


export default class MapContent extends Component {
  static propTypes = {
    places: PropTypes.array,
    updateQuery: PropTypes.func,
    categoriesSelect: PropTypes.func,
    updateMap: PropTypes.func,
    hoverHighlightInOut: PropTypes.func,
    selectOneMarker: PropTypes.func,
    drawerOpen: PropTypes.bool
  };

  render() {
    const {places, drawerOpen} = this.props;

    return (
      <div className="content">
      <MapNavDrawer
        drawerOpen={drawerOpen}
        places={places}
        updateQuery={this.props.updateQuery}
        categoriesSelect={this.props.categoriesSelect}
        updateMap={this.props.updateMap}
        hoverHighlightInOut = {this.props.hoverHighlightInOut}
        selectOneMarker = {this.props.selectOneMarker}/>
      <div id="map"></div>
      </div>
    )
  }
}
