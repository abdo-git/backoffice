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
    contentChap: "",
    addOnlget: false,
    showModal: false,
    chapitre: [],
  };

  handleChange = (e) => {
    this.setState({
      ...this.state,
      idOnglet: this.props.id,
      nomOnglet: e.target.value,
    });
  };
  showModal = (e) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      showModal: true,
    });
  };
  closeModal = () => {
    console.log("closed");
    this.setState({
      ...this.state,
      showModal: false,
    });
  };

  getChapitreContent = (content) => {
    let button = (
      <button
        className=" btn btn-link"
        // onClick={}
      >
        <i className="far fa-file-pdf"></i>
      </button>
    );
    this.setState({
      ...this.state,
      contentChap: content,
      chapitre: [...this.state.chapitre, button],
      showModal: false,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.nomOnglet === "") {
      alert("champ vide !");
      return null;
    }
    this.setState({
      ...this.state,
      addOnlget: true,
    });
    this.props.CreateOnglet(this.state, this.props.nomCours);
  };
  render() {
    return (
      <div key={this.props.id} className="card border-secondary mb-3">
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
                onChange={this.handleChange}
              />
            </div>
            <div>
              {this.state.contentChap !== "" ? this.state.chapitre : null}
            </div>
            <br />
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.handleSubmit}
            >
              Ajouter Onglet
            </button>
            {this.state.addOnlget ? (
              <button
                type="submit"
                className="btn btn-primary float-right"
                onClick={this.showModal}
              >
                Ajouter Chapitre
              </button>
            ) : null}
          </form>
        </div>
        {this.state.showModal ? (
          <CreateChap
            closeModal={(content) => {
              this.closeModal();
              this.getChapitreContent(content);
            }}
            show={this.state.showModal}
            id={this.props.id}
            key={this.props.id}
            nomCours={this.props.nomCours}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    onglet: state.firestore.ordered.onglet,
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
