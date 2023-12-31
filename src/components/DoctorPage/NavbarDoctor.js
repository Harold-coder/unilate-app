import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NavbarDoctor(props) {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear user token or session data
        localStorage.removeItem('token');
        
        // Redirect to the login page or homepage
        navigate('/login');
    }

    return (
        <nav className="navbar-doctor-page">
            <Link className="title-doctor-page" to="/">Unilate</Link>
            <div>
                <Link className="link" to={`/modifyProfile/${props.id}`}>
                    <img className="profile-picture-doctor-page" src={require("../../images/"+props.picture)} alt="pic" />
                </Link>
                <img className="logout-button" onClick={handleLogout} src={require("../../images/logout-512.png")} alt="pic" />
            </div>
        </nav>
    );
}
