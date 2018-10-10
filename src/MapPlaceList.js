import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class MapPlaceList extends Component {
  static propTypes = {
    place: PropTypes.object
  };

  render() {
    const {place} = this.props;

    return (
      <div>
        <p>{place.id} - {place.title}</p>
        <p>{String(place.locations)}</p>
        <hr/>
      </div>
    );
  }
}
