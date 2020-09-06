import React, { useState } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

const ListCours = ({ cours, auth }) => {
  const [search, setSearch] = useState("");
  const coursFilter = cours && cours.filter((cour) => cour.idProf === auth.uid);
  let filteredCours =
    coursFilter &&
    coursFilter.filter((cours) => {
      return cours.nomCours.indexOf(search) !== -1;
    });
  return (
    <div className="container">
      <div className="card">
        <h5 className="card-header">Liste des cours</h5>
        <div className="card-body">
          <input
            type="text"
            value={search}
            className="form-control"
            placeholder="search"
            onChange={(e) => setSearch(e.target.value.substr(0, 20))}
          />
          <table className="table table-hover">
            <thead className="thead-light">
              <tr>
                <th scope="col">Cours</th>
                <th scope="col">Nombre d'onglet</th>
                <th scope="col">Date de creation</th>
                <th scope="col">Info</th>
                <th scope="col">APK</th>
              </tr>
            </thead>
            <tbody>
              {filteredCours &&
                filteredCours.map((cours) => {
                  return (
                    <tr key={cours.id} id={cours.id}>
                      <th scope="row">{cours.nomCours}</th>
                      <td>{cours.nbrOnglet}</td>
                      <td>{moment(cours.date.toDate()).calendar()}</td>
                      <td>
                      <button type="button" className="btn btn-link">Details</button>      
                      </td>
                      <td>
                        <button className="btn btn-primary btn-sm">
                          <i className="fa fa-download" aria-hidden="true"></i>
                                Download
                        </button>
                        <button type="button" className="btn btn-danger btn-sm">
                          <i className="fa fa-trash" aria-hidden="true"></i>
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state.firestore.ordered.cours);
  return {
    cours: state.firestore.ordered.cours,
    auth: state.firebase.auth,
  };
};

export default compose(
  firestoreConnect([{ collection: "cours" }]),
  connect(mapStateToProps)
)(ListCours);
