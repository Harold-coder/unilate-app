import React from "react";
import "./Loading.css"; // Make sure to import the CSS file

export default function Loading() {
    return (
        <div className="loading-container">
            <div className="loading-bar"></div>
            <div className="loading-text">En cours de chargement...</div>
        </div>
    );
}
