import React, { Component } from 'react';
import ReactModal from 'react-modal';
import PropTypes from 'prop-types';

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

  createModalMessage(code){
    let codeMessage;
    switch (code) {
      case '400':
        codeMessage = 'Bad Request';
        break;
      case '401':
        codeMessage = 'Unauthorized';
        break;
      case '403':
        codeMessage = 'Forbidden';
        break;
      case '404':
        codeMessage = 'Not Found';
        break;
      case '405':
        codeMessage = 'Method Not Allowed';
        break;
      case '409':
        codeMessage = 'Conflict';
        break;
      case '429':
        codeMessage = 'Daily call quota exceeded';
        break;
      case '500':
        codeMessage = 'Internal Server Error';
        break;
      default:
      codeMessage = 'Unknow Error';
    }
    return codeMessage;
  }

  render() {
    return (
      <div>
        <ReactModal
          isOpen={this.props.showModal}
          contentLabel="Parsing Error Modal"
          onRequestClose={(e) => this.handleCloseModal(e)}
          className="modal">
          <p className="modalText">{`Error: ${this.props.code}`}</p>
          <p className="modalText">{this.createModalMessage(this.props.code)}</p>
          <button className="modalButton" onClick={(e) => this.handleCloseModal(e)}>Close</button>
        </ReactModal>
      </div>
    );
  }
}
