import React from "react"
import "../../patient-page.css"
export default function DoctorProfile(props) {
    return (
        <div className="profile-box-patient-page">
            <img className="profile-picture-patient-page" src={require("../../images/"+props.picture)} alt="pic"></img>
            <div className="infos-patient-page">
                <h1 className="name-patient-page">{props.name}</h1>
                <p className="personal-info-patient-page">{props.city}</p>
                <p className="personal-info-patient-page">{props.job}</p>
            </div>
        </div>
    )
}