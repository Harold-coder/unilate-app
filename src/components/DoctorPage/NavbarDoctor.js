import React from "react"
import { Link } from "react-router-dom"

export default function NavbarDoctor(props) {
    return (
        <nav className="navbar-doctor-page">
            <Link className="title-doctor-page" to="/">Unilate</Link>
            <Link className="link" to={`/modifyProfile/${props.id}`}>
                <img className="profile-picture-doctor-page" src={require("../../images/"+props.picture)} alt="pic"></img>
            </Link>
        </nav>
    )
}