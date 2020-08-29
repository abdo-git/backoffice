import React from "react";
import { NavLink } from "react-router-dom";

const SignedOutLinks = () => {
  return (
    <ul className="navbar-nav ">
      <li className="nav-item">
        <NavLink to="/" className="nav-link">
          Login
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/" className="nav-link">
          Sign in
        </NavLink>
      </li>
    </ul>
  );
};

export default SignedOutLinks;
