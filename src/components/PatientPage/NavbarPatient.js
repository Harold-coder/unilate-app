import React from "react"
import { Link } from "react-router-dom"

export default function NavbarPatient() {
    return (
        <nav className="navbar-patient-page">
            <Link className="title-patient-page" to="/">Unilate</Link>
        </nav>
    )
}