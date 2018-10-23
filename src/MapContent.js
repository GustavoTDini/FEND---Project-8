import React from 'react';
import MapNavDrawer from './MapNavDrawer'
import PropTypes from 'prop-types';

/**
 * Componente StateLess que agrega os principais componentes que irão ter informações
 * sobre os locais, o MapNavDrawer e o map em si
 */

const MapContent = props => {

  return (
        <div className="content">
        <MapNavDrawer
          drawerOpen={props.drawerOpen}
          places={props.places}
          updateQuery={props.updateQuery}
          categoriesSelect={props.categoriesSelect}
          updateMap={props.updateMap}
          hoverHighlightInOut = {props.hoverHighlightInOut}
          selectOneMarker = {props.selectOneMarker}/>
        <div id="map"
             role="application"></div>
        </div>
      );
};

MapContent.propTypes = {
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

export default MapContent;
