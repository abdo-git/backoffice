import React, { Component } from "react";
import { connect } from "react-redux";
import Onglet from "./Onglets/Onglet";
import { CreateCours } from "../../store/actions/coursAction";
import { Redirect } from "react-router-dom";
class Createcours extends Component {
  state = {
    nomCours: "",
    nbrOnglet: "",
    buttonClicked: false,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.nomCours === "" || this.state.nbrOnglet === "") {
      alert("champ vide !");
      return null;
    }
    this.setState({ buttonClicked: true });
    this.props.CreateCours(this.state);
  };

  showOnglets = (nbrOnglet) => {
    let onglets = [];
    for (let i = 1; i <= nbrOnglet; i++) {
      onglets.push(<Onglet key={i} nomCours={this.state.nomCours} id={i} />);
    }
    return onglets;
  };

  render() {
    if (!this.props.auth.uid) return <Redirect to="/signin" />;

    return (
      <div className="container">
        <div className="card border-secondary mb-3">
          <h5 className="card-header">Créer un nouveau cours</h5>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="nomCours">Nom du cours</label>
                <input
                  type="text"
                  className="form-control"
                  id="nomCours"
                  placeholder="intitulé du cours"
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="nbrOnglet">Nombre d'onglet</label>
                <input
                  type="text"
                  className="form-control"
                  id="nbrOnglet"
                  placeholder="nombre d'onglet"
                  onChange={this.handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Créer
              </button>
            </form>
          </div>
        </div>
        {this.state.buttonClicked
          ? this.showOnglets(this.state.nbrOnglet)
          : null}
      </div>
    );
  }
}

const mapPropsToState = (state) => {
  return {
    auth: state.firebase.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    CreateCours: (cours) => dispatch(CreateCours(cours)),
  };
};

export default connect(mapPropsToState, mapDispatchToProps)(Createcours);
