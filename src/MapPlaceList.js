import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Componente para mostrar as informações a serem colocadas na lista do MapNavDrawer
 */
export default class MapPlaceList extends Component {
  static propTypes = {
    /** Json da localidade a ser mostrada */
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
