import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import CreateChap from "../Chapitres/createChap";
import { CreateOnglet } from "../../../store/actions/ongletAction";
import { firestoreConnect } from "react-redux-firebase";

class Onglet extends Component {
  state = {
    idOnglet: "",
    nomOnglet: "",
    addOnlget: false,
    showModal: false,
  };

  handleChange = (e) => {
    this.setState({
      idOnglet: this.props.id,
      nomOnglet: e.target.value,
    });
  };
  showModal = (e) =>{
    e.preventDefault()
    this.setState({
      showModal: true
    })
  }
  handleSubmit = (e) => {
    e.preventDefault()
    if(this.state.nomOnglet===''){
      alert('champ vide !')
      return null
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
            <button
              type="submit"
              className="btn btn-primary"
              onClick={this.handleSubmit}
            >
              Ajouter Onglet
            </button>
            <button type="submit" className="btn btn-primary">
              Supprimer onglet
            </button>
            {this.state.addOnlget ? (
              <button
                type="submit"
                className="btn btn-primary pull-right"
                onClick={this.showModal}
              >
                Ajouter Chapitre
              </button>
            ) : null}
          </form>
        </div>
        {this.state.showModal ? (
          <CreateChap show={this.state.showModal} id={this.props.id} key={this.props.id} />
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
