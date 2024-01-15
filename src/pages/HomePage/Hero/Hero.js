import React from "react";
import "./Hero.css";

export default function Hero() {
    return (
        <h1 className="hero">
            <span className="hero-letter" id="first-letter" style={{animationDelay: '0s'}}>U</span>
            <span className="hero-letter" style={{animationDelay: '0.2s'}}>n</span>
            <span className="hero-letter" style={{animationDelay: '0.4s'}}>i</span>
            <span className="hero-letter" style={{animationDelay: '0.6s'}}>l</span>
            <span className="hero-letter" style={{animationDelay: '0.8s'}}>a</span>
            <span className="hero-letter" style={{animationDelay: '1s'}}>t</span>
            <span className="hero-letter" style={{animationDelay: '1.2s'}}>e</span>
        </h1>
    )
}
