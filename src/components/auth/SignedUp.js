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
    signUpClicked: false
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  verifyPassword = (e) => {
    if (e.target.value === this.state.password) {
      this.setState({
        ...this.state,
        verifyPassword: true,
      });
    }
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.state.verifyPassword) {
      alert("confirmation du password incorrecte");
      return null;
    }
    this.setState({
      ...this.state,
      signUpClicked: true
   })
    this.props.signUp(this.state);
    if (this.props.signupError !== null) window.location = "/signin";
  };
  render() {
    let { signupError } = this.props;
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group input-group">
            <input
              id="fullName"
              className="form-control"
              placeholder="Full name"
              type="text"
              required
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group input-group">
            <input
              id="email"
              className="form-control"
              placeholder="Email address"
              type="email"
              required
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group input-group">
            <input
              className="form-control"
              placeholder="Create password"
              type="password"
              id="password"
              required
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group input-group">
            <input
              className="form-control"
              placeholder="Repeat password"
              type="password"
              required
              onChange={this.verifyPassword}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-block">
              Create Account
            </button>
            <div className="text-center text-danger">
              {this.state.signUpClicked && signupError ? <p>{signupError}</p>
                : null}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    auth: state.firebase.auth,
    signupError: state.auth.signupError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (prof) => dispatch(signUp(prof)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(signedUp);
