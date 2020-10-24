import React, { useState } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { generateFile } from "../../store/actions/fileAction";
import { DeleteCours } from "../../store/actions/coursAction";
import DetailsCours from "./DetailsCours";
import ModalConfirm from "./ModalConfirm";

const ListCours = ({ cours, auth, generateFile }) => {
  const [search, setSearch] = useState("");
  const [coursDetail, setCoursDetail] = useState(null);
  const [remove, setRemove] = useState(false);
  const [coursDelete, setCoursDelete] = useState(null);
  const coursFilter = cours && cours.filter((cour) => cour.idProf === auth.uid);
  let filteredCours =
    coursFilter &&
    coursFilter.filter((cours) => {
      return cours.nomCours.indexOf(search) !== -1;
    });
  return (
    <div className="container" style={{ padding: "40px" }}>
      <div className="card">
        <h5 className="card-header text-center">Liste des cours</h5>
        <div className="card-body">
          <input
            type="text"
            value={search}
            className="form-control float-right"
            placeholder="search"
            onChange={(e) => setSearch(e.target.value.substr(0, 20))}
            style={{ width: "32%",marginBottom: "8px" }}
          />
          <div className="table-responsive-sm">
            <table className="table table-hover table-bordered">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    Cours
                  </th>
                  <th scope="col" className="text-center">
                    Nombre d'onglet
                  </th>
                  <th scope="col" className="text-center">
                    Date de creation
                  </th>
                  <th scope="col" className="text-center">
                    Info
                  </th>
                  <th scope="col" className="text-center">
                    Action
                  </th>
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
                          <button
                            type="button"
                            className="btn btn-link"
                            onClick={() => setCoursDetail(cours)}
                          >
                            Details
                          </button>
                        </td>
                        <td className="d-flex justify-content-sm-around flex-wrap">
                          <button
                            className="btn btn-outline-info btn-sm"
                            onClick={() => generateFile(cours)}
                          >
                            <i
                              className="fas fa-download"
                              aria-hidden="true"
                            ></i>
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            data-toggle="modal"
                            data-target="#exampleModal"
                            onClick={() => {
                              setCoursDelete(cours);
                              setRemove(true);
                            }}
                          >
                            <i
                              className="far fa-trash-alt"
                              aria-hidden="true"
                            ></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
        {remove ? (
          <ModalConfirm
            show={remove}
            closeModal={() => {
              setRemove(false);
            }}
            type={"cours"}
            cours={coursDelete}
          />
        ) : null}
      </div>
        {coursDetail ? <DetailsCours coursDetail={coursDetail} /> : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    cours: state.firestore.ordered.cours,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    generateFile: (cours) => dispatch(generateFile(cours)),
    deleteCours: (cours) => dispatch(DeleteCours(cours)),
  };
};
export default compose(
  firestoreConnect([{ collection: "cours" }]),
  connect(mapStateToProps, mapDispatchToProps)
)(ListCours);
