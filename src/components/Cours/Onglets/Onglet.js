import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import CreateChap from "../Chapitres/createChap";
import { CreateOnglet } from "../../../store/actions/ongletAction";
import { firestoreConnect } from "react-redux-firebase";
import ChapPDF from "../Chapitres/chapPDF";

class Onglet extends Component {
  state = {
    idOnglet: "",
    nomOnglet: "",
    contentChap: [],
    titre: "",
    addOnglet: false,
    showModal: false,
    showPDF: false,
    chapitre: [],
  };

  handleChange = (e) => {
    this.setState({
      ...this.state,
      idOnglet: this.props.id,
      nomOnglet: e.target.value,
    });
  };
  showModalPdf = (e) => {
    e.preventDefault();
    if (e.target.id) {
      this.setState({
        ...this.state,
        showPDF: true,
        titre: e.target.id,
      });
    }
  };
  showModal = (e) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      showModal: true,
    });
  };
  closeModalPdf = () => {
    this.setState({
      ...this.state,
      showPDF: false,
    });
  };
  closeModal = () => {
    this.setState({
      ...this.state,
      showModal: false,
    });
  };

  showPdf = (content, titre) => {
    let button = (
      <button
        type="button"
        className="btn btn-link"
        key={titre}
        id={titre}
        onClick={this.showModalPdf}
      >
        <i id={titre} className="far fa-file-pdf fa-1.5x"></i>
      </button>
    );
    this.setState({
      ...this.state,
      contentChap: [
        ...this.state.contentChap,
        { content: content, titre: titre },
      ],
      chapitre: [...this.state.chapitre, button],
      showModal: false,
    });

    console.log(this.state.chapitre);
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.nomOnglet === "") {
      alert("champ vide !");
      return null;
    }
    this.setState({
      ...this.state,
      addOnglet: true,
    });

    this.props.CreateOnglet(this.state, this.props.nomCours);
    let button = document.getElementById("Onglet" + this.props.id);
    button.remove();
  };

  render() {
    const id = "Onglet" + this.props.id;
    return (
      <div
        key={this.props.id}
        className="card mb-3"
        style={{ marginTop: "10px" }}
      >
        <h5 className="card-header">Onglet {this.props.id}</h5>
        <div className="card-body">
          <form>
            <div className="form-group">
              <label htmlFor="nomOnglet">Nom d'onglet</label>
              <input
                type="text"
                className="form-control"
                id="nomOnglet"
                placeholder="nom onlget"
                required
                onChange={this.handleChange}
                style={{ width: "50%" }}
              />
            </div>
            <div>{this.state.chapitre}</div>
            <br />
            <button
              id={id}
              type="submit"
              className="btn btn-outline-primary"
              onClick={this.handleSubmit}
            >
              Ajouter Onglet
            </button>
            {this.state.addOnglet ? (
              <button
                type="submit"
                className="btn btn-outline-primary float-right"
                onClick={this.showModal}
              >
                Ajouter Chapitre
              </button>
            ) : null}
          </form>
        </div>
        {this.state.showModal ? (
          <CreateChap
            closeModal={this.closeModal}
            showPdf={this.showPdf}
            show={this.state.showModal}
            id={this.props.id}
            key={this.props.id}
            nomCours={this.props.nomCours}
          />
        ) : null}
        {this.state.showPDF ? (
          <ChapPDF
            show={this.state.showPDF}
            close={this.closeModalPdf}
            contentChap={this.state.contentChap}
            titre={this.state.titre}
          />
        ) : null}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    onglet: state.firestore.ordered.onglet,
    exist: state.onglet.exist,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    CreateOnglet: (onglet, nomCours) =>
      dispatch(CreateOnglet(onglet, nomCours)),
  };
};

export default compose(
  firestoreConnect([
    {
      collection: "onglet",
    },
  ]),
  connect(mapStateToProps, mapDispatchToProps)
)(Onglet);
