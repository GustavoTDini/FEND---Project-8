import React, { Component } from 'react';
import './App.css';
import './Responsive.css'

import MapHeader from './MapHeader';
import MapContent from './MapContent';

// These are the real estate listings that will be shown to the user.
// Normally we'd have these in a database instead.
var locations = [
  {id: 1, title: 'Park Ave Penthouse', location: {lat: 40.7713024, lng: -73.9632393}},
  {id: 2, title: 'Chelsea Loft', location: {lat: 40.7444883, lng: -73.9949465}},
  {id: 3, title: 'Union Square Open Floor Plan', location: {lat: 40.7347062, lng: -73.9895759}},
  {id: 4, title: 'East Village Hip Studio', location: {lat: 40.7281777, lng: -73.984377}},
  {id: 5, title: 'TriBeCa Artsy Bachelor Pad', location: {lat: 40.7195264, lng: -74.0089934}},
  {id: 6, title: 'Chinatown Homey Space', location: {lat: 40.7180628, lng: -73.9961237}}
];

class App extends Component {

  render() {
    return (
      <div className="App">
        <MapHeader/>
        <MapContent places={locations}/>
      </div>
    );
  }
}

export default App;
