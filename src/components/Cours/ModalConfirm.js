import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { DeleteCours } from "../../store/actions/coursAction";
import { DeleteTag } from "../../store/actions/tagAction";

class ModalConfirm extends Component {
  handleClick = () => {
    if (this.props.type === "cours") {
      console.log("cours supp");
      this.props.deleteCours(this.props.cours);
    }
    if (this.props.type === "tag") this.props.deleteTag(this.props.tag);

    this.props.closeModal();
  };
  render() {
    console.log(this.props);
    return (
      <Modal show={this.props.show} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            <h4>Are you sure ?</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Do you really want to delete this {this.props.type} ?</p>
        </Modal.Body>

        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={this.props.closeModal}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={this.handleClick}
          >
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCours: (cours) => dispatch(DeleteCours(cours)),
    deleteTag: (tag) => dispatch(DeleteTag(tag)),
  };
};
export default connect(null, mapDispatchToProps)(ModalConfirm);
