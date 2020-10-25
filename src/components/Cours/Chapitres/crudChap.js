import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import ModalConfirm from "../ModalConfirm";
import UpdateChap from "./updateChap";
import styles from "./modal.module.css";
import MathJax from "react-mathjax-preview";

class crudChap extends Component {
  state = {
    open: false,
    edit: false,
    delete: false,
  };
  render() {
    const { idOnglet, show, closeModal, chapitre } = this.props;
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
              style={{ marginBottom: "5px" }}
              onClick={() => this.setState({ ...this.state, open: true })}
            >
              Ouvrir
            </button>
            <br />
            <button
              type="button"
              className="btn btn-outline-info"
              style={{ marginBottom: "5px" }}
              onClick={() => this.setState({ ...this.state, edit: true })}
            >
              <i className="far fa-edit"></i>
              Modifier
            </button>
            <br />
            <button
              type="button"
              className="btn btn-outline-danger"
              style={{ marginBottom: "5px" }}
              onClick={() => this.setState({ ...this.state, delete: true })}
            >
              <i className="far fa-trash-alt" aria-hidden="true"></i>
              Supprimer
            </button>
          </Modal.Body>
        </Modal>
        {this.state.open ? (
          <Modal
            dialogClassName={styles["modal-90w"]}
            show={this.state.open}
            backdrop="static"
            onHide={() => this.setState({ ...this.state, open: false })}
          >
            <Modal.Header closeButton>
              <Modal.Title className="text-center">{chapitre.titre}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <MathJax math={chapitre.contenu} />
            </Modal.Body>
          </Modal>
        ) : null}
        {this.state.delete ? (
          <ModalConfirm
            show={this.state.delete}
            closeModal={() => this.setState({ ...this.state, delete: false })}
            closeModalParent={closeModal}
            idChap={chapitre.id}
            type={"chapitre"}
          />
        ) : null}
        {this.state.edit ? (
          <UpdateChap
            chap={chapitre}
            show={this.state.edit}
            closeModal={() => this.setState({ ...this.state, edit: false })}
            closeModalParent={closeModal}
            idOnglet={idOnglet}
          />
        ) : null}
      </div>
    );
  }
}

export default crudChap;
