import React, { Component } from 'react';
import * as MapGoogleMapsAPIHelper from './MapGoogleMapsAPIHelper'
import * as MapFourSquareAPIHelper from './MapFourSquareAPIHelper'
import MapHeader from './MapHeader';
import MapContent from './MapContent';
import MapModal from './MapModal'
import './App.css';
import './Responsive.css'


class App extends Component {
  constructor(props) {
    super(props);
    this.updateQuery = this.updateQuery.bind(this);
    this.categoriesSelect = this.categoriesSelect.bind(this);
    this.updateMap = this.updateMap.bind(this);
    this.hoverHighlightInOut = this.hoverHighlightInOut.bind(this);
    this.selectOneMarker = this.selectOneMarker.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);

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

  componentDidMount() {
    MapGoogleMapsAPIHelper.createMapScript().then((google) => {
      MapGoogleMapsAPIHelper.initMap();
    })
  };

  updateQuery = (query) => {
    this.setState({ query: query })
  }

  categoriesSelect = (selectedOption) => {
    let newcategories = []
    for (let i = 0; i < selectedOption.length; i++){
      newcategories.push(selectedOption[i].value)
    }
    this.setState(state => ({
      categories: newcategories
    }))
  };

  handleOpenModal (code) {
    this.setState(state => ({
      showModal: true
    }));

    this.setState(state => ({
      errorCode: code
    }));
  }

  handleCloseModal (ev) {
    ev.preventDefault()
    this.setState(state => ({
      showModal: false
    }));
  }

  updateMap() {
    let {query, categories} = this.state;
    let fetchMarkers;
    MapFourSquareAPIHelper.searchFourSquarePlaces(query, categories).then((response) => {
      if(response.meta.code === 200){
        let fetchPlaces = MapFourSquareAPIHelper.createPlacesArray(response.response.venues)
        MapGoogleMapsAPIHelper.createMapScript().then((google) => {
          let map = MapGoogleMapsAPIHelper.initMap();
          if (!fetchPlaces || fetchPlaces[0].title !== "Venues Not Found"){
            fetchMarkers = MapGoogleMapsAPIHelper.populateMarkers(fetchPlaces, map);
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

  render() {
    const{places, query, errorCode, showModal, drawerOpen} = this.state;
    return (
      <div id="App">
        <MapModal
          code={errorCode}
          showModal={showModal}
          closeModal={this.handleCloseModal}/>
        <MapHeader/>
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

export default App;
