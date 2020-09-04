import React, { Component } from "react";

export class signedOut extends Component {
  render() {
    return (
      <div className="container">
        <form>
          <div className="form-group input-group">
            <input
              name=""
              className="form-control"
              placeholder="Full name"
              type="text"
            />
          </div>
          <div className="form-group input-group">
            <input
              name=""
              className="form-control"
              placeholder="Email address"
              type="email"
            />
          </div>
          <div className="form-group input-group">
            <input
              className="form-control"
              placeholder="Create password"
              type="password"
            />
          </div>
          <div className="form-group input-group">
            <input
              className="form-control"
              placeholder="Repeat password"
              type="password"
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary btn-block">
              Create Account
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default signedOut;
