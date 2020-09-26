import React, { Component } from "react";
import { connect } from "react-redux";
import { signUp } from "../../store/actions/authAction";
import styles from "./Auth.module.css";

export class signedUp extends Component {
  state = {
    fullName: "",
    email: "",
    password: "",
    verifyPassword: false,
    signUpClicked: false,
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
      signUpClicked: true,
    });
    this.props.signUp(this.state);
    //if (this.props.signupError !== null) 
  };
  render() {
    let { signupError } = this.props;
    return (
      <div className={styles.content}>
        <form className={styles.formUp} onSubmit={this.handleSubmit}>
          <h2 className="text-center">
            <strong>Create</strong> an account
          </h2>
          <div className="form-group input-group">
            <input
              id="fullName"
              className={`form-control ${styles.formControl}`}
              placeholder="Full name"
              type="text"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group input-group">
            <input
              id="email"
              className={`form-control ${styles.formControl}`}
              placeholder="Email"
              type="email"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group input-group">
            <input
              className={`form-control ${styles.formControl}`}
              placeholder="Password"
              type="password"
              id="password"
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="form-group input-group">
            <input
              className={`form-control ${styles.formControl}`}
              placeholder="Password (repeat)"
              type="password"
              onChange={this.verifyPassword}
              required
            />
          </div>
          <div className="form-group">
            <button
              type="submit"
              className={`btn btn-primary btn-block ${styles.btnPrimary}`}
            >
              Sign Up
            </button>
            <div className={styles.error}>
              {this.state.signUpClicked && signupError ? (
                <p>{signupError}</p>
              ) : null}
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
    signupError: state.auth.signupError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (prof) => dispatch(signUp(prof)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(signedUp);
