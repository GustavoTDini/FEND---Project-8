import React, { Component } from 'react';
import * as MapGoogleMapsAPIHelper from './MapGoogleMapsAPIHelper'
import * as MapFourSquareAPIHelper from './MapFourSquareAPIHelper'
import MapHeader from './MapHeader';
import MapContent from './MapContent';
import MapModal from './MapModal';
import './App.css';
import './Responsive.css';

/**
 * Componente principal do App aonde se concentra a source of truth
 */
export default class App extends Component {
  constructor(props) {
    super(props);
    this.updateQuery = this.updateQuery.bind(this);
    this.categoriesSelect = this.categoriesSelect.bind(this);
    this.updateMap = this.updateMap.bind(this);
    this.hoverHighlightInOut = this.hoverHighlightInOut.bind(this);
    this.selectOneMarker = this.selectOneMarker.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.openCloseDrawer = this.openCloseDrawer.bind(this);

    this.state = {
      places: [],
      query: "",
      categories: [],
      markers:[],
      showModal: false,
      errorCode:'',
      drawerOpen: true
    }
  }

/**
 * No componentDidMount criamos e inicializamos ao mapa com uma promisse
 */
  componentDidMount() {
    MapGoogleMapsAPIHelper.createMapScript().then((google) => {
      MapGoogleMapsAPIHelper.initMap();
    })
  };

/**
 * Função para atualizar a query
 *
 * @param query - string da busca
 */
  updateQuery = (query) => {
    this.setState({ query: query })
  }

/**
 * Função para atualizar as categories conforme selecionadas em MapPlaceSelece
 *
 * @param selectedOption - opção a ser colocada no Array
 */
  categoriesSelect = (selectedOption) => {
    let newcategories = []
    for (let i = 0; i < selectedOption.length; i++){
      newcategories.push(selectedOption[i].value)
    }
    this.setState(state => ({
      categories: newcategories
    }))
  };

/**
 * Função para abrir um modal, atualiza o codigo do erro para passar as informações corretas
 *
 * @param code - codigo do erro
 */
  handleOpenModal (code) {
    this.setState(state => ({
      showModal: true
    }));

    this.setState(state => ({
      errorCode: code
    }));
  }

/**
 * Função para fechar o modal
 *
 * @param ev - evento
 */
  handleCloseModal (ev) {
    ev.preventDefault()
    this.setState(state => ({
      showModal: false
    }));
  }

/**
 * Função para atualizar o mapa, irá utilizar os this.state query e categories, para procurar na API de search da foursquare
 * verificar se não houve erro, e atualiza os markers e os limites, caso tenha erro abre o modal,
 * atualiza a lista de lugares de this.state.places
 */
  updateMap() {
    let {query, categories} = this.state;
    let fetchMarkers;
    MapFourSquareAPIHelper.searchFourSquarePlaces(query, categories).then((response) => {
      if(response.meta.code === 200){
        let fetchPlaces = MapFourSquareAPIHelper.createPlacesArray(response.response.venues)
        MapGoogleMapsAPIHelper.createMapScript().then((google) => {
          let map = MapGoogleMapsAPIHelper.initMap();
          if (!fetchPlaces || fetchPlaces[0].title !== "Venues Not Found"){
            fetchMarkers = MapGoogleMapsAPIHelper.populateMarkers(fetchPlaces, map, this.handleCloseModal);
            MapGoogleMapsAPIHelper.mapBoundaries(map, fetchMarkers);
            this.setState(state => ({
              markers: fetchMarkers
            }))
          }
        })
        this.setState(state => ({
          places: fetchPlaces
        }))
      } else {
        this.handleOpenModal(response.meta.code.toString());
      }
    })
  }

/**
 * Função para verificar se o cursor está em cima de um lugar da lista
 *
 * @param ev - evento
 * @param index - o indice do marker selecionado
 * @param trueFalse - Varivel recebida para verificar se o marker já está selecionado
 */
  hoverHighlightInOut(ev, index, trueFalse){
    ev.preventDefault()
    let {places, markers} = this.state;
    index --;
    places[index].highlight = trueFalse
    this.setState(state => ({
      places: places
    }));
    markers = MapGoogleMapsAPIHelper.highlightMarkers(markers, index, trueFalse);
    this.setState(state => ({
      markers: markers
    }));
  }

/**
 * Função para deixar somente visivel o lugar clicado na lista
 *
 * @param ev - evento
 * @param index - o indice do marker selecionado
 */
  selectOneMarker(ev, index){
    ev.preventDefault()
    let {markers, places} = this.state;
    index --;
    if (places[index].selected === true){
      places[index].selected = false;
      for (let i=0; i < markers.length; i++){
        markers[i].setVisible(true);
        markers[i].setAnimation(window.google.maps.Animation.DROP);
      }
    } else {
      for (let i=0; i < markers.length; i++){
        markers[i].setVisible(false)
      }
      places[index].selected = true;
      markers[index].setVisible(true)
      markers[index].setAnimation(window.google.maps.Animation.BOUNCE);
    }
    this.setState(state => ({
      markers: markers
    }));
    this.setState(state => ({
      places: places
    }));
  }

  /**
   * Função para abrir ou fechar o MapNavDrawer - deixar visivel ou invisivel
   *
   * @param ev - evento
   */
  openCloseDrawer(ev){
    ev.preventDefault()
    let {drawerOpen} = this.state;
    if (drawerOpen){
      drawerOpen = false;
    } else{
      drawerOpen = true;
    }
    this.setState(state => ({
      drawerOpen: drawerOpen
    }));
  }

  render() {
    const{places, query, errorCode, showModal, drawerOpen} = this.state;
    return (
      <div id="App">
        <MapModal
          code={errorCode}
          showModal={showModal}
          closeModal={this.handleCloseModal}/>
        <MapHeader
          openCloseDrawer={this.openCloseDrawer}/>
        <MapContent
          drawerOpen={drawerOpen}
          places={places}
          query={query}
          updateQuery={this.updateQuery}
          categoriesSelect={this.categoriesSelect}
          updateMap={this.updateMap}
          hoverHighlightInOut = {this.hoverHighlightInOut}
          selectOneMarker = {this.selectOneMarker}/>
      </div>
    );
  }
};
