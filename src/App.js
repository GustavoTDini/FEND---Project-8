import React, { Component } from 'react';
import './App.css';
import './Responsive.css'
import AppMap from './AppMap';
import MapHeader from './MapHeader';
import MapDrawer from './MapDrawer';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MapHeader/>
        <div className="content">
          <MapDrawer/>
          <AppMap/>
        </div>
      </div>
    );
  }
}

export default App;
