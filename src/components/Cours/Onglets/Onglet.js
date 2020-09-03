import React, { Component } from "react";
import {connect} from 'react-redux'
import {compose } from 'redux'
import CreateChap from "../Chapitres/createChap";
import {CreateOnglet} from '../../../store/actions/ongletAction'
import {firestoreConnect} from 'react-redux-firebase'

class Onglet extends Component {
  state = {
    idOnglet:"",
    nomOnglet:"",
    ajoutChap: false
  }

  handleChange = (e) =>{
    this.setState({
      idOnglet: this.props.id,
      nomOnglet: e.target.value,
    })
  }

  handleSubmit = (e) =>{
    this.setState({
      ...this.state,
      ajoutChap: true
    })
    this.props.CreateOnglet(this.state, this.props.nomCours)
  }
  render(){
    return (
      <div key={this.props.id} className="card border-secondary mb-3">
        <h5 className="card-header">Onglet {this.props.id}</h5>
        <div className="card-body">
          <form onSubmit={(e) => e.preventDefault()}>
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
              Ajouter Chapitre
            </button>
            <button type="submit" className="btn btn-primary">
              Supprimer onglet
            </button>
          </form>
        </div>
        {this.state.ajoutChap ? <CreateChap id={this.props.id}/> : null}
      </div>
    );
  }
};

const mapStateToProps = (state) => {
return {
    onglet: state.firestore.ordered.onglet,
  };
};
const mapDispatchToProps = (dispatch)=>{
  return {
    CreateOnglet: (onglet, nomCours) => dispatch(CreateOnglet(onglet, nomCours))
  }
}

export default compose(
  firestoreConnect([{
    collection: "onglet"
  }]),
  connect(mapStateToProps,mapDispatchToProps)
  )(Onglet);
