import React, { Component } from 'react';
import * as MapGoogleMapsAPIHelper from './MapGoogleMapsAPIHelper'
import * as MapFourSquareAPIHelper from './MapFourSquareAPIHelper'
import MapHeader from './MapHeader';
import MapContent from './MapContent';
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
  }

  state = {
    places: [],
    query: "",
    categories: [],
    markers:[]
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

  updateMap() {
    let {query, categories} = this.state;
    let fetchMarkers;
    MapFourSquareAPIHelper.searchFourSquarePlaces(query, categories).then((response) => {
      let fetchPlaces = MapFourSquareAPIHelper.createPlacesArray(response)
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
        markers[i].setVisible(true)
      }
    } else {
      places[index].selected = true;
      for (let i=0; i < markers.length; i++){
        if (i !== index){
            markers[i].setVisible(false)
        }
      }
    }
    this.setState(state => ({
      markers: markers
    }));
    this.setState(state => ({
      places: places
    }));
  }

  render() {
    const{places, query} = this.state;
    return (
      <div className="App">
        <MapHeader/>
        <MapContent
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
