import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn } from "../../store/actions/authAction";
import { Redirect } from "react-router-dom";
import styles from "./Auth.module.css";

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
      <div className={styles.content}>
        <form className={styles.formIn} onSubmit={this.handleSubmit}>
          <div className={styles.illustration}>
            <i className="fas fa-user-lock"></i>
          </div>
          <div className="form-group">
            <input
              type="text"
              className={`form-control ${styles.formControl}`}
              id="email"
              aria-describedby="email"
              placeholder="Email"
              required
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className={`form-control ${styles.formControl}`}
              id="password"
              placeholder="Password"
              required
              onChange={this.handleChange}
            />
          </div>

          <button
            type="submit"
            className={`btn btn-primary btn-block ${styles.btnPrimary}`}
          >
            Log In
          </button>
          <div className={styles.error}>
            {this.state.loginClicked && signinError ? (
              <p>{signinError}</p>
            ) : null}
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
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
