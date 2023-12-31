import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function NavbarHome() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    let doctorId;

    // Check if the user is logged in by decoding the token
    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            doctorId = decodedToken.doctor_id;
            // Check if the token has expired
            const current_time = Date.now() / 1000;
            if (decodedToken.exp < current_time) {
                // Token has expired, navigate to login
                navigate('/login');
            }
        } catch (error) {
            console.error("Error decoding token:", error);
            navigate('/login');
        }
    }

    return (
        <nav>
            {doctorId ? (
                // If doctorId is present, show profile link
                <Link className="link" to={`/doctorPage/${doctorId}`}>
                    <button className="inscription">Mon Profil</button>
                </Link>
            ) : (
                // Otherwise, show the login button
                <Link className="link" to="/login">
                    <button className="inscription">Médecin</button>
                </Link>
            )}
        </nav>
    );
}
