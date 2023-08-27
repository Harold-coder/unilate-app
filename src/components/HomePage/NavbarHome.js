import React from "react"
import { Link } from "react-router-dom"

export default function NavbarHome() {
    return (
        
        <nav>
            <Link className="link" to="/login">
                <button className="inscription">Médecin</button>
            </Link>
        </nav>
    )
}