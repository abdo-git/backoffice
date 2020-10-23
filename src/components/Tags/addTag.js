import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { AddTag } from "../../store/actions/tagAction";
import { Redirect } from "react-router-dom";
import styles from "./Tags.module.css";
import ModalConfirm from "../Cours/ModalConfirm";

class addTag extends Component {
  state = {
    libelle: "",
    tag: "",
    remove: false,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    if (this.state.libelle.length) {
      e.preventDefault();
      this.props.AddTag(this.state);
      this.setState({
        libelle: "",
      });
    }
  };
  getTags = ({ tags, auth }) => {
    let filteredTags = [];
    tags &&
      tags.forEach((tag) => {
        if (tag.idProf === auth.uid) {
          filteredTags.push(
            <li
              key={tag.id}
              id={tag.id}
              className="list-group-item  d-flex justify-content-between"
            >
              <span>{tag.libelle}</span>
              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={() => {
                  this.setState({
                    ...this.state,
                    tag: tag,
                    remove: true,
                  });
                }}
              >
                <i className="far fa-trash-alt"></i>
              </button>
            </li>
          );
        }
      });
    return filteredTags;
  };

  render() {
    if (!this.props.auth.uid) return <Redirect to="/signin" />;

    return (
      <div className={styles.content}>
        <div className={styles.listTag}>
          <h3 className="text-center">Liste des tags</h3>
          <form onSubmit={this.handleSubmit}>
            <div className={`input-group ${styles.inpGrp}`}>
              <input
                onChange={this.handleChange}
                value={this.state.libelle}
                className="form-control"
                id="libelle"
                type="text"
                placeholder="nouveau tag"
                required
              />
              <div className="input-group-append">
                <button className="btn btn-outline-info btn-sm" type="submit">
                  <strong>Ajouter</strong>
                </button>
              </div>
            </div>
          </form>
          <ul className="list-group list-group-flush">
            {this.getTags(this.props)}
          </ul>
        </div>
        {this.state.remove ? (
          <ModalConfirm
            show={this.state.remove}
            closeModal={() => {
              this.setState({
                ...this.state,
                remove: false,
              });
            }}
            type={"tag"}
            tag={this.state.tag}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tags: state.firestore.ordered.tags,
    auth: state.firebase.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    AddTag: (tag) => dispatch(AddTag(tag)),
  };
};

export default compose(
  firestoreConnect([{ collection: "tags" }]),
  connect(mapStateToProps, mapDispatchToProps)
)(addTag);
