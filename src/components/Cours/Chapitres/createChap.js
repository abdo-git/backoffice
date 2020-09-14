import React, { Component } from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import { compose } from "redux";
import { CreateChap } from "../../../store/actions/chapAction";
import { firestoreConnect } from "react-redux-firebase";

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
      this.state.titre === "" ||
      this.state.volumeHoraire === "" ||
      this.state.contenu === ""
    ) {
      alert("champ vide");
      return null;
    }
    this.props.CreateChap(this.state, this.props.nomCours);
    this.props.closeModal();
  };

  generateCheckBox = ({ tags }) => {
    let tagsRendered = [];
    tags &&
      tags.map((tag) =>
        tagsRendered.push(
          <div key={tag.id}>
            <input
              id={tag.id}
              name={tag.libelle}
              value={tag.libelle}
              type="checkbox"
              onChange={this.selectTag}
            />
            <label htmlFor={tag.id}>{tag.libelle}</label>
          </div>
        )
      );
    return tagsRendered;
  };

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Créer votre chapitre ici</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="titre">Titre du chapitre:</label>
              <input
                type="text"
                className="form-control"
                id="titre"
                placeholder="titre du chapitre"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="volumeHoraire">Volume horaire:</label>
              <input
                type="number"
                className="form-control"
                id="volumeHoraire"
                placeholder="volume horaire"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="niveau">Niveau</label>
              <select
                value={this.state.niveau}
                className="form-control"
                id="niveau"
                placeholder="niveau"
                onChange={this.handleChange}
              >
                {this.option()}
              </select>
            </div>
            <div className="form-group">
              {this.generateCheckBox(this.props)}
            </div>
            <div id="editor"></div>
            <CKEditor
              editor={DecoupledEditor}
              data=""
              onInit={(editor) => {
                console.log("Editor is ready to use!", editor);

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
          </form>
        </Modal.Body>

        <Modal.Footer>
          <button
            type="submit"
            className="btn btn-primary"
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
  console.log(state);
  return {
    tags: state.firestore.ordered.tags,
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
