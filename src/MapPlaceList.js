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
        <p>{place.index} - {place.title}</p>
        <p>{place.address}</p>
        <hr/>
      </div>
    );
  }
}
