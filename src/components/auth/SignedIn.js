import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn } from "../../store/actions/authAction";
import { Redirect } from "react-router-dom";

export class SignedIn extends Component {
  state = {
    email: "",
    password: "",
    loginClicked: false,
  };

  disappearMsg(signinError) {
    let msg = signinError;
    signinError = null;
    return <p>{msg}</p>;
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({
      ...this.state,
      loginClicked: true,
    });
    this.props.signIn(this.state);
  };
  render() {
    let { signinError, auth } = this.props;
    if (auth.uid) return <Redirect to="/" />;

    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              aria-describedby="email"
              required
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              required
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <div className="text-center text-danger">
            {this.state.loginClicked && signinError
              ? <p>{signinError}</p>
              : null}
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    signinError: state.auth.signinError,
    auth: state.firebase.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SignedIn);
