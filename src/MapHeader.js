import React, { Component } from 'react'
import * as MapHelper from './MapHelper'

export default class MapHeader extends Component {

  render() {
    return (
      <header className="header">
        <div className="openMenu">
          <img src="https://placeimg.com/30/30/arch/grayscale"/>
        </div>
        <h1>Neighborhood Map</h1>
      </header>
    );
  }
}
