import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { CreateOnglet } from "../../store/actions/ongletAction";
import ModalConfirm from "./ModalConfirm";
import styles from "./CreateCours.module.css";
import CreateChap from "./Chapitres/createChap";
import CrudChap from "./Chapitres/crudChap";

///////Component

class DetailsCours extends Component {
  state = {
    nomOnglet: "",
    chapitre: "",
    ongletActive: 0,
    removeOnglet: false,
    addChap: false,
    crudChap: false,
  };

  map = (length, chapitre) => {
    const HashMap = {};
    for (let i = 1; i <= length; i++) {
      HashMap[i] = chapitre.filter((chap) => chap.idOnglet === i);
    }
    return HashMap;
  };

  chapitreOnglet = (Array) => {
    let button = [];
    Array.forEach((chap) => {
      button.push(
        <button
          type="button"
          className={`btn btn-outline-info ${styles.chap}`}
          key={chap.id}
          id={chap.id}
          onClick={(e) =>
            this.setState({
              ...this.state,
              chapitre: chap,
              crudChap: true,
            })
          }
        >
          <i id={chap.id} className={`far fa-file-pdf ${styles.faPdf}`}></i>
          {chap.titre}
        </button>
      );
    });
    return button;
  };
  contentOnglet = (HashMap) => {
    const div = [];
    for (let key in HashMap) {
      div.push(
        <div
          key={"key" + key}
          className={`tab-pane fade ${styles.scroll}`}
          
          id={key}
          role="tabpanel"
          aria-labelledby={key + "-tab"}
        >
          {this.chapitreOnglet(HashMap[key])}
        </div>
      );
    }
    return div;
  };

  handleChange = (e) => {
    this.setState({
      ...this.state,
      nomOnglet: e.target.value,
    });
  };

  ///////render

  render() {
    const { coursDetail, onglet, chapitre, CreateOnglet } = this.props;

    const ongletFiltered =
      onglet && onglet.filter((onglet) => onglet.idCours === coursDetail.id);
    const chapFiltered =
      chapitre && chapitre.filter((chap) => chap.idCours === coursDetail.id);

    if (ongletFiltered && chapFiltered) {
      ongletFiltered.sort((a, b) => (a.idOnglet > b.idOnglet ? 1 : -1));
      const index =
        ongletFiltered.length !== 0
          ? ongletFiltered[ongletFiltered.length - 1].idOnglet + 1
          : 1; ///id of onglet added
      const HashMap = this.map(ongletFiltered.length, chapFiltered);

      return (
        <div className={`card ${styles.detailsCours}`}>
          <h5 className="card-header">Détail du cours</h5>
          <div className="card-body">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                CreateOnglet(
                  { idOnglet: index, nomOnglet: this.state.nomOnglet },
                  coursDetail.nomCours
                );
              }}
            >
              <div className="form-group">
                <input
                  type="text"
                  className={`form-control ${styles.nomOnglet}`}
                  id="nomOnglet"
                  placeholder="nom onlget"
                  required
                  onChange={this.handleChange}
                />
                <button
                  className={`btn btn-primary ${styles.btnPrimary}`}
                  type="submit"
                >
                  Ajouter
                </button>
              </div>
            </form>
            <ul className="nav nav-tabs">
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
                        onClick={() =>
                          this.setState({
                            ...this.state,
                            ongletActive: onglet.idOnglet,
                          })
                        }
                      >
                        {onglet.nomOnglet}
                      </a>
                    </li>
                  );
                })}
            </ul>
            <div className="tab-content" id="myTabContent">
              {HashMap ? this.contentOnglet(HashMap) : null}
            </div>
          </div>
          <div className="card-footer">
            <button
              className={`btn btn-primary ${styles.btnPrimary}`}
              type="button"
              onClick={() =>
                this.setState({
                  ...this.state,
                  addChap: true,
                })
              }
            >
              Ajouter Chapitre
            </button>
            <button
              className={`btn btn-danger ${styles.btnPrimary}`}
              type="button"
              onClick={() =>
                this.setState({
                  ...this.state,
                  removeOnglet: true,
                })
              }
            >
              Supprimer Onglet
            </button>
          </div>
          {this.state.removeOnglet ? (
            <ModalConfirm
              show={this.state.removeOnglet}
              closeModal={() =>
                this.setState({
                  ...this.state,
                  removeOnglet: false,
                })
              }
              type={"onglet"}
              idOnglet={this.state.ongletActive}
              idCours={coursDetail.id}
            />
          ) : null}
          {this.state.addChap ? (
            <CreateChap
              show={this.state.addChap}
              showPdf={null}
              closeModal={() =>
                this.setState({
                  ...this.state,
                  addChap: false,
                })
              }
              id={this.state.ongletActive}
              key={this.state.ongletActive}
              nomCours={coursDetail.nomCours}
            />
          ) : null}
          {this.state.crudChap ? (
            <CrudChap
              show={this.state.crudChap}
              closeModal={() =>
                this.setState({
                  ...this.state,
                  crudChap: false,
                })
              }
              chapitre={this.state.chapitre}
              idOnglet={this.state.ongletActive}
            />
          ) : null}
        </div>
      );
    } else {
      return null;
    }
  }
}

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
