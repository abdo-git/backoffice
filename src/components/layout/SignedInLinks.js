import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authAction";

const SignedInLinks = (props) => {
  return (
    <ul className="navbar-nav">
      <li className="nav-item">
        <NavLink to="/listcours" className="nav-link">
          Mes cours
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/satistiques" className="nav-link">
          Statistiques
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/tags" className="nav-link">
          Tags
        </NavLink>
      </li>
      <li className="nav-item">
        <a href="/" onClick={props.signOut} className="nav-link">
          Log Out
        </a>
      </li>
    </ul>
  );
};

const mapDispacthToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};
export default connect(null, mapDispacthToProps)(SignedInLinks);
