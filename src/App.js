import React, { Component } from 'react';
import './App.css';
import AppMap from './AppMap'
import MapHeader from './MapHeader'

class App extends Component {
  render() {
    return (
      <div className="App">
        <MapHeader/>
        <AppMap/>
      </div>
    );
  }
}

export default App;
