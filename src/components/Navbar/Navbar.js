import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
    return (
        <nav className="navbar-patient-page">
            <Link className="title-patient-page" to="/home">Unilate</Link>
        </nav>
    )
}