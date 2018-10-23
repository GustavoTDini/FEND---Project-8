import React, { Component } from 'react';
import MapPlaceSelect from './MapPlaceSelect';
import MapPlaceList from './MapPlaceList';
import PropTypes from 'prop-types';
import poweredByFourSquare from './images/Powered-by-Foursquare-full-color-300.png';

/**
 * Componente da lateral aonde estará a busca e a lista dos resultados, poderá ser ou não visivel
 * depdenddo do clique no botão menu de MapHeader, para responsividade
 */
export default class MapNavDrawer extends Component {
  constructor(props) {
    super(props);
    this.listFocus = React.createRef();
  }

  static propTypes = {
    /** array com a reposta dos places */
    places: PropTypes.array,
    /** string de busca */
    query: PropTypes.string,
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

  changeQuery(e) {
    this.props.updateQuery(e);
  }

  doSearch(e){
    this.props.updateMap();
  }

  onHoverListInOut(ev, index, trueFalse){
    this.props.hoverHighlightInOut(ev, index, trueFalse);
  }

  onClickList(ev, index){
    this.props.selectOneMarker(ev, index);
  }

  focus() {
  // Explicitly focus the text input using the raw DOM API
  // Note: we're accessing "current" to get the DOM node
  this.textInput.current.focus();
  }

  render() {
    const {places, query, drawerOpen} = this.props;

    return (
      <div className={(drawerOpen? 'drawer' : 'drawer-hide')}>
        <div className="search">
          <img className="four-square-logo" src={poweredByFourSquare} alt="Powered by Foursquare"/>
          <input
            aria-label={query}
            className="input"
            type='text'
            placeholder="Search terms"
            value={query}
            onChange={(event) => this.changeQuery(event.target.value)}/>
          <MapPlaceSelect
            categoriesSelect={this.props.categoriesSelect}/>
          <button
            className="input"
            onClick={(e) => this.doSearch(e)}>Search</button>
        </div>
        <div className="result-list" role="list">
        {places.map((place) =>
            <li key={place.id}
                ref = {this.listFocus}
                tabindex = "0"
                aria-label={place.title}
                className={(place.highlight? 'result-place-highlight' : 'result-place')}
                onClick={(e) => this.onClickList(e, place.index)}
                onKeyPress={(e) => this.onClickList(e, place.index)}
                onMouseOver={(e) => this.onHoverListInOut(e, place.index, true)}
                onMouseOut={(e) => this.onHoverListInOut(e, place.index, false)}>
              <MapPlaceList place={place}/>
            </li>
          )}
        </div>
      </div>
    )
  }
}
