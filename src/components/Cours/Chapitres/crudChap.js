import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import ModalConfirm from "../ModalConfirm";

class crudChap extends Component {
  state = {
    open: false,
    edit: false,
    delete: false,
  };
  render() {
    const { show, closeModal, chapitre } = this.props;
    console.log(chapitre);
    return (
      <div>
        <Modal show={show} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h4>Chaptire: {chapitre.titre}</h4>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <button
              type="button"
              className="btn btn-outline-info"
              onClick={() => this.setState({ ...this.state, open: true })}
            >
              Ouvrir
            </button>
            <br />
            <button
              type="button"
              className="btn btn-outline-info"
              onClick={() => this.setState({ ...this.state, edit: true })}
            >
              <i className="far fa-edit"></i>
              Modifier
            </button>
            <br />
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={() => this.setState({ ...this.state, delete: true })}
            >
              <i className="far fa-trash-alt" aria-hidden="true"></i>
              Supprimer
            </button>
          </Modal.Body>
        </Modal>
        {this.state.delete ? (
          <ModalConfirm
            show={this.state.delete}
            closeModal={() => this.setState({ ...this.state, delete: false })}
            idChap={chapitre.id}
            type={"chapitre"}
          />
        ) : null}
      </div>
    );
  }
}

export default crudChap;
