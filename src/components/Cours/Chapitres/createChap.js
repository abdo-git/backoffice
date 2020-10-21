import React, { Component } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { compose } from "redux";
import { CreateChap } from "../../../store/actions/chapAction";
import { firestoreConnect } from "react-redux-firebase";
import styles from "./modal.module.css";

class createChap extends Component {
  state = {
    titre: "",
    contenu: "",
    volumeHoraire: "",
    niveau: "1",
    tags: [],
    idOnglet: this.props.id,
  };

  option() {
    let options = [];
    for (let i = 0; i < 5; i++) {
      options.push(
        <option key={i + 1} value={i + 1}>
          {i + 1}
        </option>
      );
    }
    return options;
  }

  selectTag = (e) => {
    let listTag = this.state.tags;
    let check = e.target.checked;
    let checkedTag = e.target.value;
    let id = e.target.id;
    if (check) {
      this.setState({
        ...this.state,
        tags: [...this.state.tags, { libelle: checkedTag, id: id }],
      });
    } else {
      var index = listTag.findIndex((tag) => tag.libelle === checkedTag);
      if (index > -1) {
        listTag.splice(index, 1);
        this.setState({
          ...this.state,
          tags: listTag,
        });
      }
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (
      this.state.contenu === "" ||
      this.state.titre === "" ||
      this.state.volumeHoraire === ""
    ) {
      alert("please fill out all the fields !!");
      return null;
    }
    this.props.CreateChap(this.state, this.props.nomCours);
    if(this.props.showPdf !== null)
      this.props.showPdf(this.state.contenu, this.state.titre);
    this.props.closeModal()
    };

  generateCheckBox = ({ tags, auth }) => {
    let tagsRendered = [];
    tags &&
      tags.forEach((tag) => {
        if (auth.uid === tag.idProf) {
          tagsRendered.push(
            <span key={tag.id} className="form-check form-check-inline">
              <input
                className="form-check-input"
                id={tag.id}
                name={tag.libelle}
                value={tag.libelle}
                type="checkbox"
                onChange={this.selectTag}
              />
              <label className="form-check-label" htmlFor={tag.id}>
                {tag.libelle}
              </label>
            </span>
          );
        }
      });
    return tagsRendered;
  };

  render() {
    return (
      <Modal
        dialogClassName={styles["modal-90w"]}
        show={this.props.show}
        backdrop="static"
        onHide={this.props.closeModal}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-center">
            Créer votre chapitre ici
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form>
            <div className="row">
              <div className="input-group col-md-4">
                <div className="input-group-prepend">
                  <span className="input-group-text">Titre du chapitre</span>
                </div>
                <input
                  className="form-control"
                  type="text"
                  id="titre"
                  placeholder="titre du chapitre"
                  required
                  onChange={this.handleChange}
                />
              </div>
              <div className="input-group col-md-4">
                <div class="input-group-prepend">
                  <span class="input-group-text">Volume horaire</span>
                </div>
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  id="volumeHoraire"
                  placeholder="volume horaire"
                  required
                  onChange={this.handleChange}
                />
              </div>
              <div className="input-group col-md-4">
                <div class="input-group-prepend">
                  <span class="input-group-text">Niveau</span>
                </div>
                <select
                  className="form-control"
                  value={this.state.niveau}
                  id="niveau"
                  placeholder="niveau"
                  onChange={this.handleChange}
                >
                  {this.option()}
                </select>
              </div>

              <div className={`form-group row ${styles.tgs}`}>
                <label className="col-sm-2 col-form-label">choisir tag :</label>
                {this.generateCheckBox(this.props)}
              </div>
            </div>
            <div>
              <CKEditor
                editor={DecoupledEditor}
                data=""
                onInit={(editor) => {
                  // Insert the toolbar before the editable area.
                  editor.ui
                    .getEditableElement()
                    .parentElement.insertBefore(
                      editor.ui.view.toolbar.element,
                      editor.ui.getEditableElement()
                    );
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  this.setState({
                    ...this.state,
                    contenu: data,
                  });
                }}
              />
            </div>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <button
            type="submit"
            className="btn btn-outline-primary"
            onClick={this.handleSubmit}
          >
            Créer
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tags: state.firestore.ordered.tags,
    auth: state.firebase.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    CreateChap: (chap, nomCours) => dispatch(CreateChap(chap, nomCours)),
  };
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "tags" }])
)(createChap);
