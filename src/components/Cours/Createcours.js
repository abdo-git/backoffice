import React, { Component } from "react";
import Onglet from "./Onglets/Onglet";

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
    this.setState({ buttonClicked: true });
    console.log(this.state);
  };

  showOnglets = (nbrOnglet)=>{
    let onglets = []
    for (let i = 0; i < nbrOnglet; i++) {
      onglets.push(<Onglet id={i+1}/>)
    }
    return onglets;
  }

  render() {
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
        {
          this.state.buttonClicked ? this.showOnglets(this.state.nbrOnglet):(null)
        }
      </div>
    );
  }
}

export default Createcours;
