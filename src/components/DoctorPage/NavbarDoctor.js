import React from "react"
import { Link } from "react-router-dom"

export default function NavbarDoctor(props) {
    function handleClickProfile(){
        console.log("Profile")
    }
    return (
        <nav className="navbar-doctor-page">
            <Link className="title-doctor-page" to="/">Unilate</Link>
            <Link className="link" to="/modifyProfile">
                <img className="profile-picture-doctor-page" onClick={handleClickProfile} src={require("../../images/"+props.picture)} alt="pic"></img>
            </Link>
        </nav>
    )
}