import React from "react";
import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { FaBookMedical } from "react-icons/fa";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-dark">
    <Link to="/" className="navbar-brand">
        <FaBookMedical />
    </Link>
     <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarMenu">
         <span className="navbar-toggler-icon"></span>
       </button>  
       <div className="collapse navbar-collapse justify-content-end" id="navbarMenu">
           <SignedInLinks />
           <SignedOutLinks />
       </div>
</nav> 
  );
};
export default NavBar;
