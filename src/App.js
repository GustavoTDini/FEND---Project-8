import React, { Component } from 'react';
import * as MapHelper from './MapHelper'
import MapHeader from './MapHeader';
import MapContent from './MapContent';
import './App.css';
import './Responsive.css'

class App extends Component {
  state = {
    places: [],
    query: "",
    categories: []
  }

  componentDidMount() {
    const{query, categories} = this.state;

    MapHelper.searchFourSquarePlaces(query, categories).then((response) => {
      let fetchplaces = MapHelper.createPlacesArray(response)
      MapHelper.createMapScript().then((google) => {
        let map = MapHelper.initMap();
        let markers = MapHelper.populateMarkers(fetchplaces, map);
        MapHelper.mapBoundaries(map, markers);
      })
      this.setState(state => ({
        places: fetchplaces
      }))
    })



  };

  render() {
    const{places} = this.state;

    return (
      <div className="App">
        <MapHeader/>
        <MapContent places={places}/>
      </div>
    );
  }
};

export default App;
