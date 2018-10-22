import React, { Component } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import * as MapFourSquareAPIHelper from './MapFourSquareAPIHelper'

ReactModal.setAppElement('#root');

/**
 * Componente com o modal para informar o erro caso a API falhe por algum motivo,
 * utiliza o ReactModal
 */
export default class MapModal extends Component {
  static propTypes = {
    /** codigo do erro */
    code: PropTypes.string,
    /** bool verificando se o modal aberto */
    showModal: PropTypes.bool,
    /** função para fechar o modal do App */
    closeModal: PropTypes.func,
  };
  
  handleCloseModal (e) {
    this.props.closeModal(e)
  }

  render() {
    return (
      <div>
        <ReactModal
          isOpen={this.props.showModal}
          onRequestClose={(e) => this.handleCloseModal(e)}
          className="modal">
          <p className="modal-text">Sorry! Unable to Perform Request!</p>
          <p className="modal-text">{`Error: ${this.props.code}`}</p>
          <p className="modal-text">{MapFourSquareAPIHelper.createErrorMessage(this.props.code)}</p>
          <button className="modal-button" onClick={(e) => this.handleCloseModal(e)}>Close</button>
        </ReactModal>
      </div>
    );
  }
}
