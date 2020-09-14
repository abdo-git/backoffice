import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/actions/authAction";

export class signedUp extends Component {
  state = {
    fullName: "",
    email: "",
    password: "",
    verifyPassword: false,
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  verifyPassword = (e) => {
    return e.target.value === this.state.password
      ? this.setState({
          verifyPassword: true,
        })
      : null;
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.verifyPassword) {
      alert("confirmation du password incorrecte");
      return null;
    }
    this.props.signUp(this.state);
  };
  render() {
    const { auth, authError } = this.props;
    if (auth.uid) return <Redirect to="/" />;
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group input-group">
            <input
              id="fullName"
              className="form-control"
              placeholder="Full name"
              type="text"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group input-group">
            <input
              id="email"
              className="form-control"
              placeholder="Email address"
              type="email"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group input-group">
            <input
              className="form-control"
              placeholder="Create password"
              type="password"
              id="password"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group input-group">
            <input
              className="form-control"
              placeholder="Repeat password"
              type="password"
              onChange={this.verifyPassword}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-block">
              Create Account
            </button>
            <div className="text-center text-danger">
              {authError ? <p>{authError}</p> : null}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (prof) => dispatch(signUp(prof)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(signedUp);
