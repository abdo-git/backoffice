import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { AddTag } from "../../store/actions/tagAction";
import { firestoreConnect } from "react-redux-firebase";

class addTag extends Component {
  state = {
    libelle: "",
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
    console.log(this.props);
    return (
      <div className="container">
        <div className="card border-secondary mb-3">
          <h5 className="card-header">Listes des Tags</h5>
          <div className="card-body">
            <ul className="list-group list-group-flush">
              {this.props.tags &&
                this.props.tags.map((tag) => {
                  return (
                    <li key={tag.id} id={tag.id} className="list-group-item">
                      {tag.libelle}
                      <button
                        type="submit"
                        className="btn btn-primary"
                        //onClick={this.handleSubmit}
                      >
                        Supprimer
                      </button>
                    </li>
                  );
                })}
            </ul>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="libelle"
                  placeholder="nouveau tag"
                  onChange={this.handleChange}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.handleSubmit}
              >
                Ajouter
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    tags: state.firestore.ordered.tags,
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
