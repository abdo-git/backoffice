import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { AddTag } from "../../store/actions/tagAction";
import { Redirect } from "react-router-dom";
import ModalConfirm from "../Cours/ModalConfirm";

class addTag extends Component {
  state = {
    libelle: "",
    tag: "",
    remove: false,
  };

  getTags = ({ tags, auth }) => {
    let filteredTags = [];
    tags &&
      tags.forEach((tag) => {
        if (tag.idProf === auth.uid) {
          filteredTags.push(
            <li key={tag.id} id={tag.id} className="list-group-item">
              {tag.libelle}
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  this.setState({
                    ...this.state,
                    tag: tag,
                    remove: true,
                  });
                }}
              >
                Supprimer
              </button>
            </li>
          );
        }
      });
    return filteredTags;
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.AddTag(this.state);
  };

  render() {
    if (!this.props.auth.uid) return <Redirect to="/signin" />;
    return (
      <div className="container">
        <div className="card border-secondary mb-3">
          <h5 className="card-header">Listes des Tags</h5>
          <div className="card-body">
            <ul className="list-group list-group-flush">
              {this.getTags(this.props)}
            </ul>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="libelle"
                  value={this.state.libelle}
                  placeholder="nouveau tag"
                  required
                  onChange={this.handleChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
              >
                Ajouter
              </button>
            </form>
          </div>
        </div>
        {console.log(this.state.remove)}
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
  console.log(state);
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
