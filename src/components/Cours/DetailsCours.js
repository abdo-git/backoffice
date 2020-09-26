import React, { useState } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { CreateOnglet } from "../../store/actions/ongletAction";
import ModalConfirm from "./ModalConfirm";
import styles from "./CreateCours.module.css";

const map = (length, chapitre) => {
  const HashMap = {};
  for (let i = 1; i <= length; i++) {
    HashMap[i] = chapitre.filter((chap) => chap.idOnglet === i);
  }
  return HashMap;
};

const chapitreOnglet = (Array) => {
  let button = [];
  Array.forEach((chap) => {
    button.push(
      <button
        type="button"
        className="btn btn-link"
        key={chap.titre}
        id={chap.titre}
        //onClick={this.showModalPdf}
      >
        <i id={chap.titre} className={`far fa-file-pdf ${styles.faPdf}`}></i>
        {chap.titre}
      </button>
    );
  });
  return button;
};
const contentOnglet = (HashMap) => {
  const div = [];
  for (let key in HashMap) {
    div.push(
      <div
        key={"key" + key}
        className="tab-pane fade scroll"
        id={key}
        role="tabpanel"
        aria-labelledby={key + "-tab"}
      >
        {chapitreOnglet(HashMap[key])}
      </div>
    );
  }
  return div;
};

///////Component

const DetailsCours = ({ coursDetail, onglet, chapitre, CreateOnglet, DeleteOnglet }) => {
  const [nomOnglet, setNomOnglet] = useState("");
  const [ongletActive, setOngletActive] = useState(0)
  const [removeOnglet, setremoveOnglet] = useState(false)

  const ongletFiltered =
    onglet && onglet.filter((onglet) => onglet.idCours === coursDetail.id);
  const chapFiltered =
    chapitre && chapitre.filter((chap) => chap.idCours === coursDetail.id);

  if (ongletFiltered && chapFiltered) {
    ongletFiltered.sort((a, b) => (a.idOnglet > b.idOnglet ? 1 : -1));
    const index = ongletFiltered[ongletFiltered.length - 1].idOnglet + 1; ///id of onglet added
    const HashMap = map(ongletFiltered.length, chapFiltered);
    return (
      <div className="card">
        <h5 className="card-header">Détail du cours</h5>
        <div className="card-body">
          <form
            onSubmit={(e)=>{
              e.preventDefault();
              CreateOnglet(
              { idOnglet: index, nomOnglet: nomOnglet },
              coursDetail.nomCours
            )}}
          >
            <div className="form-group">
              <input
                type="text"
                className={`form-control ${styles.nomOnglet}`}
                id="nomOnglet"
                placeholder="nom onlget"
                required
                onChange={(e) => setNomOnglet(e.target.value)}
              />
              <button
                className={`btn btn-primary ${styles.btnPrimary}`}
                type="submit"
              >
                Ajouter
              </button>
            </div>
          </form>
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            {ongletFiltered &&
              ongletFiltered.map((onglet) => {
                
                return (
                  <li
                    key={onglet.idOnglet}
                    className="nav-item waves-effect waves-light"
                  >
                    <a
                      className="nav-link"
                      id={onglet.idOnglet + "-tab"}
                      data-toggle="tab"
                      href={"#" + onglet.idOnglet}
                      role="tab"
                      aria-controls={onglet.idOnglet}
                      aria-selected="false"
                      onClick={()=>setOngletActive(onglet.idOnglet)}
                    >
                      {onglet.nomOnglet}
                    </a>
                  </li>
                );
              })}
          </ul>
          <div className="tab-content" id="myTabContent">
            {HashMap ? contentOnglet(HashMap) : null}
          </div>
        </div>
        <div className="card-footer">
          <button
            className={`btn btn-primary ${styles.btnPrimary}`}
            type="button"
          >
            Ajouter Chapitre
          </button>
          <button
            className={`btn btn-danger ${styles.btnPrimary}`}
            type="button"
            onClick={()=>setremoveOnglet(true)}
          >
            Supprimer Onglet
          </button>
        </div>
        {removeOnglet ? (
          <ModalConfirm
            show={removeOnglet}
            closeModal={() => {
              setremoveOnglet(false)
            }}
            type={"onglet"}
            idOnglet={ongletActive}
            idCours={coursDetail.id}
          />
        ) : null}
      </div>
    );
  } else {
    return null;
  }

};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    onglet: state.firestore.ordered.onglet,
    chapitre: state.firestore.ordered.chapitre,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    CreateOnglet: (onglet, nomCours) =>
      dispatch(CreateOnglet(onglet, nomCours)),
  };
};
export default compose(
  firestoreConnect([{ collection: "onglet" }, { collection: "chapitre" }]),
  connect(mapStateToProps, mapDispatchToProps)
)(DetailsCours);
