import { useEffect, useState } from 'react';
import './header.css';
import { Link } from "react-router-dom";

function Header() {
    const [isloggedin,setloggedin]=useState(false);
    useEffect(()=>{
     const username=localStorage.getItem("username");
     if(!username){
        setloggedin(false)
     }
     else{
        setloggedin(true)
     }
    })
    return (
        <div className="header-container">
            <h1 className="heading">Happy Tails</h1>
            <div className="nav-links">
                <Link className="links" to="/">Home</Link>
                <Link className="links" to="/Details">Pets</Link>
                <Link className="links" to="/rescue">Rescue</Link>
                <Link className="links" to="/About">About</Link>
                
                
                <Link className="links" to="/Account">Account</Link>
      
                <Link className="links sign-in" to={isloggedin ? "/signout":"/signin"}>{isloggedin ? "Signout":"Signin"}</Link>
            </div>
        </div>
    );
}

export default Header;
