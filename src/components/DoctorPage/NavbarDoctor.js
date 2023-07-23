import React from "react"

export default function NavbarDoctor(props) {
    function handleClickTitle(){
        console.log("Unilate")
    }
    function handleClickProfile(){
        console.log("Profile")
    }
    return (
        <nav>
            <p className="title" onClick={handleClickTitle}>Unilate</p>
            <img className="profile-picture" onClick={handleClickProfile} src={require("../../images/"+props.picture)} alt="pic"></img>
        </nav>
    )
}