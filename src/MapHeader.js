import React, { Component } from 'react'
import PropTypes from 'prop-types';
import menuImg from './icons/menu.png'

/**
 * Componente com o header do app, que poderá ou não ter o botão menu,
 * dependendo do tamanho da tela
 */
export default class MapHeader extends Component {
  static propTypes = {
    /** função para abrir e fechar o MapNavDrawer */
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
