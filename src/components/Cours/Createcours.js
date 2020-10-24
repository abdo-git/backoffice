import React, { Component } from "react";
import { connect } from "react-redux";
import Onglet from "./Onglets/Onglet";
import { CreateCours } from "../../store/actions/coursAction";
import { Redirect } from "react-router-dom";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import styles from "./CreateCours.module.css";

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
    this.props.CreateCours(this.state, this.props.cours);
    this.setState({ buttonClicked: true });
  };

  showOnglets = (nbrOnglet) => {
    let button = document.getElementById("buttonClicked");
    button.disabled = true;
    let onglets = [];
    for (let i = 1; i <= nbrOnglet; i++) {
      onglets.push(<Onglet key={i} nomCours={this.state.nomCours} id={i} />);
    }
    return onglets;
  };

  render() {
    if (!this.props.auth.uid) return <Redirect to="/signin" />;

    const { coursExist } = this.props;
    return (
      <div className={`container ${styles.content}`}>
        <div className="card">
          <h3 className="text-center card-header">Créer un nouveau cours</h3>
          <div className="card-body">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label htmlFor="nomCours">Nom du cours</label>
                <input
                  type="text"
                  className="form-control"
                  id="nomCours"
                  placeholder="intitulé du cours"
                  required
                  onChange={this.handleChange}
                  style={{ width: "50%" }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="nbrOnglet">Nombre d'onglet</label>
                <input
                  type="number"
                  min="0"
                  className="form-control"
                  id="nbrOnglet"
                  placeholder="nombre d'onglet"
                  required
                  onChange={this.handleChange}
                  style={{ width: "50%" }}
                />
              </div>
              <button
                type="submit"
                className="btn btn-outline-primary"
                id="buttonClicked"
              >
                Créer
              </button>
            </form>
            <div className="text-center text-danger">
              {this.state.buttonClicked && coursExist !== null ? (
                <p>{coursExist}</p>
              ) : null}
            </div>
          </div>
        </div>
        {coursExist === null && this.state.buttonClicked
          ? this.showOnglets(this.state.nbrOnglet)
          : null}
      </div>
    );
  }
}

const mapPropsToState = (state) => {
  return {
    auth: state.firebase.auth,
    cours: state.firestore.ordered.cours,
    coursExist: state.cours.exist,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    CreateCours: (cours, listCours) => dispatch(CreateCours(cours, listCours)),
  };
};

export default compose(
  firestoreConnect([{ collection: "cours" }]),
  connect(mapPropsToState, mapDispatchToProps)
)(Createcours);
