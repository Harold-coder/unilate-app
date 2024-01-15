import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { urlServer } from "../../../App"; // Assuming this is your server's URL
import "./NavbarDoctor.css";

export default function NavbarDoctor(props) {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            // Send a POST request to the logout endpoint
            await Axios.post(`${urlServer}logout`, {}, { withCredentials: true });

            // Redirect to the login page after successful logout
            navigate('/login');
        } catch (error) {
            console.error("Error during logout:", error);
        }
    };

    return (
        <nav className="navbar-doctor-page">
            <Link className="title-doctor-page" to="/home">Unilate</Link>
            <div>
                <Link className="link" to={`/modifyProfile/${props.id}`}>
                    <img className="profile-picture-doctor-page" src={require(`../../../images/${props.picture}`)} alt="pic" />
                </Link>
                <img className="logout-button" onClick={handleLogout} src={require("../../../images/logout-512.png")} alt="pic" />
            </div>
        </nav>
    );
}
