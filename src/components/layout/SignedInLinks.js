import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authAction";
import styles from "./NavBar.module.css";

const SignedInLinks = (props) => {
  return (
    <span className={`navbar-text ${styles.actions} ${styles.txt}`}>
      <NavLink to="/listcours" className={styles.login}>
        Mes cours
      </NavLink>
      <NavLink to="/satistiques" className={styles.login}>
        Statistiques
      </NavLink>
      <NavLink to="/tags" className={styles.login}>
        Tags
      </NavLink>
      <a
        href="/"
        onClick={props.signOut}
        className={`btn btn-light ${styles["action-button"]}`}
      >
        Log Out
      </a>
    </span>
  );
};

const mapDispacthToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};
export default connect(null, mapDispacthToProps)(SignedInLinks);
