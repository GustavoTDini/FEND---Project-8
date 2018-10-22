import React, { Component } from 'react';
import MapNavDrawer from './MapNavDrawer'
import PropTypes from 'prop-types';

/**
 * Componente que agrega os principais componentes que irão ter informações
 * sobre os locais, o MapNavDrawer e o map em si
 */
export default class MapContent extends Component {
  static propTypes = {
    /** array com a reposta dos places */
    places: PropTypes.array,
    /** bool que define se o MapNavDrawer está visivel ou não */
    drawerOpen: PropTypes.bool,
    /** função para atualizar a lista com o query */
    updateQuery: PropTypes.func,
    /** função para selecionar as categorias */
    categoriesSelect: PropTypes.func,
    /** função para atualizar o mapa */
    updateMap: PropTypes.func,
    /** função para definir se estamos como o mouse em um item da lista */
    hoverHighlightInOut: PropTypes.func,
    /** função a ser chamada ao clicar um item */
    selectOneMarker: PropTypes.func,
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
