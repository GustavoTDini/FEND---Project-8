import React, { Component } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';
import * as MapFourSquareAPIHelper from './MapFourSquareAPIHelper'

ReactModal.setAppElement('#root');

export default class MapModal extends Component {
  static propTypes = {
    code: PropTypes.string,
    showModal: PropTypes.bool,
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
