import React, { Component } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { compose } from "redux";
import { UpdateChap } from "../../../store/actions/chapAction";
import { firestoreConnect } from "react-redux-firebase";
import styles from "./modal.module.css";

class updateChap extends Component {
  state = {
    idCours: this.props.chap.idCours,
    titre: this.props.chap.titre,
    contenu: this.props.chap.contenu,
    volumeHoraire: this.props.chap.volumeHoraire,
    niveau: this.props.chap.niveau,
    tags: this.props.chap.tags,
    idOnglet: this.props.idOnglet,
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
    console.log(check)
    let checkedTag = e.target.value;
    console.log(checkedTag)
    let id = e.target.id;
    console.log(id)
    if (check) {
      this.setState({
        ...this.state,
        tags: [...this.state.tags, { libelle: checkedTag, id: id }],
      });
    } else {
      var index = listTag.findIndex((tag) => tag.libelle === checkedTag);
      console.log(index)
      if (index > -1) {
        let tab = []
        for (let i = 0; i < listTag.length; i++) {
          if(i !== index){
            tab.push(listTag[i])
          }
        }
        this.setState({
          ...this.state,
          tags: tab,
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
    this.setState({
      ...this.state,
      idCours: this.props.chap.idCours,
    });
    this.props.UpdateChap(this.props.chap.id, this.state);
    this.props.closeModal();
    this.props.closeModalParent()
  };

  generateCheckBox = (tags, { allTags, auth }) => {
    console.log(tags);
    console.log(allTags);
    let tagsRendered = [];
    allTags &&
      allTags.forEach((tag) => {
        if (auth.uid === tag.idProf) {
          tagsRendered.push(
            <span key={tag.id} className="form-check form-check-inline">
              <input
                className="form-check-input"
                id={tag.id}
                name={tag.libelle}
                value={tag.libelle}
                type="checkbox"
                checked={tags.some((el) => el.id === tag.id) ? true : false}
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
    const { contenu, niveau, titre, tags, volumeHoraire } = this.state;
    const show = this.props.show;
    const closeModal = this.props.closeModal;
    return (
      <Modal
        dialogClassName={styles["modal-90w"]}
        show={show}
        backdrop="static"
        onHide={closeModal}
      >
        <Modal.Header closeButton>
          <Modal.Title className="text-center">
            Modifier votre chapitre ici
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
                  value={titre}
                  required
                  onChange={this.handleChange}
                />
              </div>
              <div className="input-group col-md-4">
                <div className="input-group-prepend">
                  <span className="input-group-text">Volume horaire</span>
                </div>
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  id="volumeHoraire"
                  placeholder="volume horaire"
                  value={volumeHoraire}
                  required
                  onChange={this.handleChange}
                />
              </div>
              <div className="input-group col-md-4">
                <div className="input-group-prepend">
                  <span className="input-group-text">Niveau</span>
                </div>
                <select
                  className="form-control"
                  id="niveau"
                  placeholder="niveau"
                  value={niveau}
                  onChange={this.handleChange}
                >
                  {this.option()}
                </select>
              </div>

              <div className={`form-group row ${styles.tgs}`}>
                <label className="col-sm-2 col-form-label">choisir tag :</label>
                {this.generateCheckBox(tags, this.props)}
              </div>
            </div>
            <div>
              <CKEditor
                editor={DecoupledEditor}
                data={contenu}
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
            Modifier
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allTags: state.firestore.ordered.tags,
    auth: state.firebase.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    UpdateChap: (idChap, newChap) => dispatch(UpdateChap(idChap, newChap)),
  };
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "tags" }])
)(updateChap);
