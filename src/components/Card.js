import React from "react"
import { Link } from "react-router-dom";

export default function Card(props) {
    return (
        <Link className="link" to={`/patientPage/${props.id}`} state={{props: props}}>
        <div className="card">
            <img className="profile-picture" src={require("../images/"+props.picture)} alt="pic"></img>
            <h1 className="name">{props.name}</h1>
            <p className="personal-info">{props.city}</p>
            <p className="personal-info">{props.specialty}</p>
        </div>
        </Link>
    )
}