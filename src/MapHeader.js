import React, { Component } from 'react'
import menuImg from './icons/menu.png'

export default class MapHeader extends Component {

  render() {
    return (
      <header className="header">
        <div id="openMenu">
          <img id="menuIcon" src={menuImg} alt="Menu Icon"/>
        </div>
        <h1 className="appTitle">Neighborhood Map</h1>
      </header>
    );
  }
}
