import React, { Component } from 'react';
import * as MapHelper from './MapHelper'
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
  }

  state = {
    places: [],
    query: "",
    categories: []
  }

  componentDidMount() {
    MapHelper.createMapScript().then((google) => {
      MapHelper.initMap();
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
    MapHelper.searchFourSquarePlaces(query, categories).then((response) => {
      let fetchplaces = MapHelper.createPlacesArray(response)
      MapHelper.createMapScript().then((google) => {
        let map = MapHelper.initMap();
        let markers = MapHelper.populateMarkers(fetchplaces, map);
        MapHelper.mapBoundaries(map, markers);
      })
      this.setState(state => ({
        places: fetchplaces,
        query: "",
        categories: []
      }))
    })
    this.updateQuery("");
    this.categoriesSelect([]);
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
          updateMap={this.updateMap}/>
      </div>
    );
  }
};

export default App;
