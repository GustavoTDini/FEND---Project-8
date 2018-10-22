import React, { Component } from 'react'
import PropTypes from 'prop-types';
import menuImg from './icons/menu.png'

export default class MapHeader extends Component {
  static propTypes = {
    openCloseDrawer: PropTypes.func,
  };

  handleDrawer(ev){
    this.props.openCloseDrawer(ev)
  }

  render() {
    return (
      <header className="header">
        <div id="open-menu">
          <img id="menu-icon"
            src={menuImg}
            alt="Menu Icon"
            onClick={(e) => this.handleDrawer(e)}/>
        </div>
        <h1 className="app-title">Neighborhood Map</h1>
      </header>
    );
  }
}
