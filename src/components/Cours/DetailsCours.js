import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class DetailsCours extends Component {
  render() {
    return (
      <div className="card">
        <h5 className="card-header">Détail du cours</h5>
        <div className="card-body">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a className="nav-link" href="#">
                Active
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link " href="#">
                Disabled
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    cours: state.firestore.ordered.cours,
    auth: state.firebase.auth,
  };
};

export default compose(
  firestoreConnect([{ collection: "onglet" }, { collection: "chapitre" }]),
  connect(mapStateToProps)
)(DetailsCours);
