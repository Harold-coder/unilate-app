import React from "react"
import { Link } from "react-router-dom"

export default function NavbarHome() {
    return (
        <Link className="link" to="/doctorPage">
        <nav>
            <button className="inscription">s'inscrire</button>
        </nav>
        </Link>
    )
}