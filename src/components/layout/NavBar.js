import React from 'react'
import {Link} from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'

const NavBar = ()=>{
    return(
        <nav className="navbar navbar-expand-sm navbar-light bg-light">
             <Link to="/" className="navbar-brand">Home</Link>
              <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarMenu">
                  <span className="navbar-toggler-icon"></span>
                </button>  
                <div className="collapse navbar-collapse" id="navbarMenu">
                    <SignedInLinks />
                    <SignedOutLinks />
                </div>
        </nav>  
    )
}
export default NavBar;