import React from "react"
import "../../patient-page.css"
export default function DoctorProfile(props) {
    return (
        <div className="profile-box">
            <img className="profile-picture" src={require("../../images/"+props.picture)} alt="pic"></img>
            <div className="infos">
                <h1 className="name">{props.name}</h1>
                <p className="personal-info">{props.city}</p>
                <p className="personal-info">{props.job}</p>
            </div>
        </div>
    )
}