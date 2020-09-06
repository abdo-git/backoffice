import React from "react";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { connect } from "react-redux";

const NavBar = (props) => {
  const { auth } = props;

  const links = auth.uid ? <SignedInLinks /> : <SignedOutLinks />;
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-dark">
      <Link to="/" className="navbar-brand">
        Home
      </Link>
      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarMenu"
      >
        {links}
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};
export default connect(mapStateToProps)(NavBar);
